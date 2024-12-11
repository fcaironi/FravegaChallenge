const { BeforeAll, AfterAll, setDefaultTimeout, After, Before, AfterStep } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');

// Configuración del timeout general de la ejecución
setDefaultTimeout(30 * 1000);

// Variables globales para el navegador y la página
let browser;
let context;
let page;

Before(async () => {
    // Iniciar el navegador antes de todos los escenarios, maximizado
    browser = await chromium.launch({ 
        headless: false,
        args: ['--start-maximized']
    });
    context = await browser.newContext({ viewport: null}); // Crear un nuevo contexto de navegador
    page = await context.newPage(); // Crear una nueva página dentro del contexto
    // Hacer que la página sea accesible globalmente
    global.page = page;
});

AfterStep(async function (step) {
    //Screenshot después de cada step para que sea guardado en el reporte
    const screenshot = await page.screenshot();
    await this.attach(screenshot, 'image/png');
});

After(async function (scenario) {
    //Después de cada escenario cerramos el browser asi se limpia la sesión y caché entre escenarios
    await context.close();
    await browser.close();
});

AfterAll(async () => {
    // Cerrar el contexto y el navegador después de todos los escenarios
    await context.close();
    await browser.close();
});
