const { Given, When, Then } = require('@cucumber/cucumber');
const CarritoPage = require('../pages/carritoPage');
const { expect } = require('@playwright/test');


Then('usuario verifica que el producto se encuentre en el carrito', async function () {
    carritoPage = new CarritoPage(page);
 
    const nombreProductoCarrito = await carritoPage.verificarItemEnCarrito();
   
    expect(nombreProductoCarrito).toBe(this.nombreProductoSeleccionado)
});

Then('usuario verifica que hay {int} productos en el carrito', async (cantidadEsperada) => {
    carritoPage = new CarritoPage(page);
    const cantidadActual = await carritoPage.contarItemsEnCarrito();
    expect(cantidadActual).toBe(cantidadEsperada);
})

Then('usuario elimina el primer producto', async () => {
    carritoPage = new CarritoPage(page);
    await carritoPage.eliminarPrimerItem();
})