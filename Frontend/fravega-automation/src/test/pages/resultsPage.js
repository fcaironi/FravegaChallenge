const BasePage = require('./basePage');
const { expect } = require('@playwright/test');

class ResultsPage extends BasePage {
    constructor(page) {
        super(page);
        //Repositorio de elementos para su fácil administración
        this.segundoItem = '//ul[@data-test-id="results-list"]/li[2]';
        this.btnComprar = '//*[@id="__next"]/div[2]/div[2]/div[3]/div[2]/div/div[2]/div[9]/button';
        this.btnFravega = '//img[@alt="Fravega Home"]';
        this.lblTituloProducto = '//ul[@data-test-id="results-list"]/li[2]/article/a/a/div/div/span';
        this.btnAgregarAlCarrito = '//*[@id="__next"]/div[2]/div[2]/div[3]/div[2]/div/div[2]/div[9]/div/button';
        this.btnLogoFravega = '//*[@data-test-id="fravega-logo"]';
        this.toast = '//div[@class="Toastify__toast-container Toastify__toast-container--top-right"]';
        this.lblResultTitle = '//*[@data-test-id="result-title"]';
    }

    async navigateTo(url) {
        await this.page.goto(url);
    }

    async obtenerNombreSegundoProducto() {
        //Obtenemos el nombre del segundo producto dentro de la lista de resultados
        const tituloProducto = await this.page.locator(this.lblTituloProducto).innerText();
        return tituloProducto
    }

    async seleccionarSegundoProducto() {
        //Seleccionamos el segundo producto
        await this.page.locator(this.segundoItem).waitFor({ state: 'visible' });
        await this.page.locator(this.segundoItem).click();
    }

    async checkearStockYComprar() {
        //Verificamos que este presente el botón "comprar", esto nos da el indicio de que hay stock disponible
        await expect(this.page.locator(this.btnComprar)).toBeVisible();
        await this.page.locator(this.btnComprar).click();
    }

    async agregarProductosAlCarrito(cantidad) {
        //Loop para agregar tantos productos como queramos
        for (let i = 1; i <= cantidad; i++) {
            // Modificar el selector dinámicamente para recorrer la lista
            const itemSelector = `//ul[@data-test-id="results-list"]/li[${i}]`;
    
            // Esperar que el producto esté visible y hacer clic
            await this.page.locator(itemSelector).waitFor({ state: 'visible' });
            await this.page.locator(itemSelector).click();
    
            // Click en "Agregar al carrito"
            await this.page.locator(this.btnAgregarAlCarrito).waitFor({ state: 'visible' });
            await this.page.locator(this.btnAgregarAlCarrito).click();
    
            // Volver atrás
            await this.page.goBack();
        }
    }
}

module.exports = ResultsPage;