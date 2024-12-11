const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
    constructor() {
        this.nombreProductoSeleccionado = null;
    }
}

setWorldConstructor(CustomWorld);
