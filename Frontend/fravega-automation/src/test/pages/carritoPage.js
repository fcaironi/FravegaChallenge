const BasePage = require('./basePage');

class CarritoPage extends BasePage {
    constructor(page) {
        super(page);
        //Repositorio de elementos para su fácil administración
        this.lblProducto = '//*[@id="__next"]/div/div[1]/main/div[1]/div[1]/div/div/div[1]/div[2]/div[1]';
        this.btnEliminarPrimerItem = '//div[contains(@class, "sc-b6a50d62-0")][1]//*[text()="Eliminar"]';
        this.btnConfirmarEliminar = '//button[text()="Eliminar"]'
        this.btnCancelar = '//button[text()="Cancelar"]'
        this.itemsCarrito = '//div[contains(@class, "sc-b6a50d62-0")]';
        this.lblMiCarrito = '//h1[text()="Mi carrito"]';
    }

    async navigateTo(url) {
        await this.page.goto(url);
    }

    async verificarItemEnCarrito() {
        //Verificamos el nombre del producto en el carrito y lo devolvemos para compararlo
        const nombreProducto = await this.page.locator(this.lblProducto).innerText()
        return nombreProducto
    }

    async contarItemsEnCarrito() {
        const itemsCarrito = this.page.locator('//div[contains(@class, "sc-b6a50d62-0")]');
        // se cuenta cuantos items hay en el carrito con un identificador que comparten todos y se devuelve la cantidad
        await this.page.locator(this.lblMiCarrito).waitFor({ state: 'visible' });
        await this.page.locator(this.btnEliminarPrimerItem).waitFor({ state: 'visible' });
        const cantidad = await itemsCarrito.count();
        return cantidad;
    }

    async eliminarPrimerItem() {
        //Elimina el primer item de la lista del carrito para una fácil reutilización
        await this.page.locator(this.btnEliminarPrimerItem).waitFor({ state: 'visible' });
        await this.page.locator(this.btnEliminarPrimerItem).click();
        await this.page.locator(this.btnConfirmarEliminar).click();
        //Se espera que el botón "cancelar" desaparezca del DOM así confirmamos que el popup ya desapareció
        await this.page.locator(this.btnCancelar).waitFor({ state: 'detached', timeout: 10000 });
    }
}

module.exports = CarritoPage;