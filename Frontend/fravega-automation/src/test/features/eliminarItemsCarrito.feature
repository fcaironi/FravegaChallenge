Feature: Eliminar ítems del carrito

    Background:
        Given usuario navega al sitio de Fravega

    Scenario: Agregar y eliminar productos del carrito
        Given usuario realiza una busqueda con la palabra "Heladera"
        When usuario agrega "3" productos al carrito
        And usuario navega al sitio de Fravega
        And usuario ingresa al carrito
        Then usuario verifica que hay 3 productos en el carrito
        When usuario elimina el primer producto
        Then usuario verifica que hay 2 productos en el carrito
        When usuario elimina el primer producto
        Then usuario verifica que hay 1 productos en el carrito
