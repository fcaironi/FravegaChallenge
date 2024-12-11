const { Given, When, Then } = require('@cucumber/cucumber');
const ResultsPage = require('../pages/resultsPage');

When('usuario elige la segunda opción de los resultados', async function () {
    resultsPage = new ResultsPage(page);
    this.nombreProductoSeleccionado = await resultsPage.obtenerNombreSegundoProducto();
    await resultsPage.seleccionarSegundoProducto();
});

When('usuario verifica que el producto tenga stock y lo compra', async function() {
    resultsPage = new ResultsPage(page);
    await resultsPage.checkearStockYComprar();
});

When('usuario agrega {string} productos al carrito', async (cantidad) => {
    resultsPage = new ResultsPage(page);
    await resultsPage.agregarProductosAlCarrito(cantidad)
});