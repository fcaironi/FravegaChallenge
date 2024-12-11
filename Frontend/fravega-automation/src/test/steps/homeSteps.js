const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require('../pages/homePage');
const { expect } = require('@playwright/test');


Given('usuario navega al sitio de Fravega', async () => {
    homePage = new HomePage(page);

    await homePage.navigateTo('https://www.fravega.com/');
    await homePage.verificarModal();
});

Given('usuario realiza una busqueda con la palabra {string}', async (producto) => {
    homePage = new HomePage(page);
    await homePage.buscarProducto(producto);

});

Then('usuario ingresa al carrito', async () => {
    homePage = new HomePage(page); 
    await homePage.navegarAlCarrito();
});