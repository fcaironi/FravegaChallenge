Feature: Búsqueda y compra de productos

    Background:
        Given usuario navega al sitio de Fravega

    Scenario: Buscar una heladera y comprarla verificando previamente su stock
        Given usuario realiza una busqueda con la palabra "Heladera Samsung"
        When usuario elige la segunda opción de los resultados
        And usuario verifica que el producto tenga stock y lo compra
        And usuario navega al sitio de Fravega
        And usuario ingresa al carrito
        Then usuario verifica que el producto se encuentre en el carrito