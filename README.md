# Challenge QA Automation

## FrontEnd

## Descripción
Este proyecto contiene la automatización de pruebas de frontend como parte del challenge de QA Automation. Se utilizó un framework con Playwright+Cucumber y el modelo de Page Object

## Requisitos
- Node.js (v16 o superior)
- Dependencias: Playwright y Cucumber

## Instalación
1. Clonar el repositorio:
    ```bash
   git clone github.com/fcaironi/FravegaChallenge

3. Instalar dependencias:
    ```bash
   npm install

## Ejecución de pruebas
    npm test

## Reportes
Los reportes generados estarán en la carpeta raíz bajo el nombre "cucumber-report.html"
El mismo tendrá listado los steps ejecutados con un screenshot asociado por cada step.

## Casos de Uso Automatizados
    1. Scenario: Buscar una heladera y comprarla verificando previamente su stock
        Given usuario realiza una busqueda con la palabra "Heladera Samsung"
        When usuario elige la segunda opción de los resultados
        And usuario verifica que el producto tenga stock y lo compra
        And usuario navega al sitio de Fravega
        And usuario ingresa al carrito
        Then usuario verifica que el producto se encuentre en el carrito
    
    2. Scenario: Agregar y eliminar productos del carrito
        Given usuario realiza una busqueda con la palabra "Heladera"
        When usuario agrega "3" productos al carrito
        And usuario navega al sitio de Fravega
        And usuario ingresa al carrito
        Then usuario verifica que hay 3 productos en el carrito
        When usuario elimina el primer producto
        Then usuario verifica que hay 2 productos en el carrito
        When usuario elimina el primer producto
        Then usuario verifica que hay 1 productos en el carrito

## BackEnd

## Descripción
Este proyecto contiene la automatización de pruebas para la API pública de GoRest como parte del challenge de QA Automation. Se utilizó el framework RestAssured para pruebas de API REST, implementado en Java con JUnit 5 como framework de pruebas.

## Requisitos
- Java 17 o superior: Asegurate de tener Java instalado en tu máquina y configurado en el PATH.
- Maven: Instalado y configurado para gestionar las dependencias del proyecto.

## Instalación
1. Clonar el repositorio:
    ```bash
    git clone github.com/fcaironi/FravegaChallenge

2.Navegar a la carpeta Backend:
    ```bash
    cd Backend

3. Compilar e instalar las dependencias con Maven:
    ```bash
    mvn clean install

## Ejecución de pruebas
Para ejecutar las pruebas, utiliza el siguiente comando:
    ```bash
    mvn test

## Casos de Uso Automatizados
Se implementaron los siguientes casos de uso en las pruebas:

1. Crear un Usuario
- Envía una solicitud POST para crear un usuario con datos como nombre, género, email y estado.
- Valida que el código de respuesta sea 201 Created y que los datos del usuario en la respuesta sean correctos.

2. Listar Usuarios
- Envía una solicitud GET para obtener una lista de usuarios existentes.
- Valida que el código de respuesta sea 200 OK y que los datos retornados contengan al menos un usuario.

3. Buscar Usuario Específico
- Envía una solicitud POST para crear un usuario y recupera su ID.
- Envía una solicitud GET utilizando el ID del usuario creado para obtener sus detalles.
- Valida que el código de respuesta sea 200 OK y que los datos retornados coincidan con el usuario creado.
