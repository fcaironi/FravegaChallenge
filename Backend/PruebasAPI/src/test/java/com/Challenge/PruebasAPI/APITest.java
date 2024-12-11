package com.Challenge.PruebasAPI;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

import java.util.List;
import java.util.Map;
import java.util.Random;

public class APITest {

	//Variables globales que se repiten en todos o la mayoria de los tests
    private static final String BASE_URL = "https://gorest.co.in/public/v2";
    private static final String TOKEN = "56fb0854aeee67fcbf4c1569c954c2d5779b2e6f3e0d3955ebcb445662000029";
    private static final String NOMBRE_USUARIO = "Sergio Ramos";

    //Función para crear mails aleatorios asi se puede re-testear sin generar errores de duplicidad
    private String generarEmailAleatorio(String baseName) {
        Random random = new Random();
        int numeroAleatorio = random.nextInt(100000);
        String numeroFormateado = String.format("%08d", numeroAleatorio);
        return baseName + numeroFormateado + "@gmail.com";
    }

    //Funcion para crear usuario ya que 2 funciones van a necesitar consumirlo
    private int crearUsuario(String nombre, String email) {
        String requestBody = String.format("""
                {
                    "name": "%s",
                    "gender": "male",
                    "email": "%s",
                    "status": "active"
                }
                """, nombre, email);

        return given()
                .baseUri(BASE_URL)
                .header("Authorization", "Bearer " + TOKEN)
                .contentType(ContentType.JSON)
                .body(requestBody)
                .when()
                .post("/users")
                .then()
                .statusCode(201)
                .extract()
                .path("id");
    }

    @Test
    public void crearUsuario() {
    	//Utilizamos la funcion de generar mail aleatorio
        String email = generarEmailAleatorio("SergioRamos");
        //Utilizamos la función de crear usuario pasando como parámetro el usuario (global) y el email generado
        int userId = crearUsuario(NOMBRE_USUARIO, email);
        //Imprimimos el ID generado
        System.out.println("Usuario creado con ID: " + userId);
    }

    @Test
    public void listarUsuarios() {
    	//Listamos usuarios haciendo un for each para recorrer el JSON dividiendo con "---" para que se lea mejor
        RestAssured.baseURI = BASE_URL;

        Response response = given()
                .baseUri(BASE_URL)
                .header("Authorization", "Bearer " + TOKEN)
                .contentType(ContentType.JSON)
                .when()
                .get("/users")
                .then()
                .statusCode(200)
                .extract()
                .response();

        List<Map<String, Object>> usuarios = response.jsonPath().getList("");
        usuarios.forEach(usuario -> {
            usuario.forEach((clave, valor) -> System.out.println(clave + ": " + valor));
            System.out.println("-------------------");
        });
    }

    @Test
    public void crearYBuscarUsuario() {
    	
    	//Consumimos la función de crear usuario asi luego probamos la función de buscar mediante ID y luego imprimimos
        String email = generarEmailAleatorio("SergioRamos");
        int userId = crearUsuario(NOMBRE_USUARIO, email);

        Response response = given()
                .baseUri(BASE_URL)
                .header("Authorization", "Bearer " + TOKEN)
                .contentType(ContentType.JSON)
                .pathParam("id", userId)
                .when()
                .get("/users/{id}")
                .then()
                .statusCode(200)
                .extract()
                .response();

        System.out.println("Detalles del usuario:");
        System.out.println("ID: " + response.jsonPath().getInt("id"));
        System.out.println("Nombre: " + response.jsonPath().getString("name"));
        System.out.println("Email: " + response.jsonPath().getString("email"));
    }
}
