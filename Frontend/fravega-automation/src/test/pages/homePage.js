const BasePage = require('./basePage');

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        //Repositorio de elementos para su fácil administración
        this.btnCerrarModal = '//*[@data-test-id="close-modal-button"]';
        this.txtBusqueda = '//input[@name="keyword" and @placeholder= "Buscar productos"]';
        this.btnBuscar = '//form[@action="#"]//button[@type="submit"]';
        this.btnCarrito = '//button[@data-test-id="button-cart"]';
        this.btnIrAlCarrito = '//*[@data-test-id="link-go-to-cart"]';
    }

    async navigateTo(url) {
        await this.page.goto(url);
    }

    async buscarProducto(producto) {
        //LLenamos la barra de búsqueda con el valor del step y le hacemos click a la lupa
        await this.page.locator(this.txtBusqueda).fill(producto);
        await this.page.locator(this.btnBuscar).click();
    }

    async verificarModal() {
        // Verificar si el modal de CP está visible y lo cerramos
        await this.page.locator(this.btnCarrito).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.btnCerrarModal).click();
    }

    async navegarAlCarrito() {
        //Navegar al carrito de la barra superior
        await this.page.locator(this.btnCarrito).waitFor({ state: 'visible' });
        await this.page.locator(this.btnCarrito).click();
        await this.page.locator(this.btnIrAlCarrito).waitFor({ state: 'visible' });
        await this.page.locator(this.btnIrAlCarrito).click();
    }
}

module.exports = HomePage;