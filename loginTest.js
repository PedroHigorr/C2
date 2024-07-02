const { Builder, By, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async function registerTest() {
    //instância de um novo objeto de opções do Chrome
    let options = new Options();
    //Adicionando a flag para desativar notificações
    options.addArguments('--disable-notifications');
    //criando uma instância do webdriver para Chrome
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    // http://localhost:3006/register
    try {
        await driver.get('http://localhost:3006/register'); // Ajuste a URL se necessário

        // Espera explícita até que o elemento com ID 'nome' esteja presente
        await driver.wait(until.elementLocated(By.id('nome')), 5000);

        // Localizando os elementos do formulário e preenchendo-os
        await driver.findElement(By.id('nome')).sendKeys('jose');
        await driver.findElement(By.id('email')).sendKeys('teste@gmail.com');
        await driver.findElement(By.id('senha')).sendKeys('111111');

        // Pausa para você ver os valores inseridos
        await sleep(2000);

        // Submetendo o formulário
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Espera explícita para o alerta e aceitação
        await driver.wait(until.alertIsPresent(), 5000);
        let alert = await driver.switchTo().alert();
        console.log('Alert text:', await alert.getText()); // Imprime o texto do alerta
        await alert.accept();

        // Pausa para ver o alerta sendo aceito
        await sleep(2000);

        console.log('Register test passed!');
    } catch (error) {
        console.log('Register test failed:', error);
    } finally {
        await driver.quit();
    }
})();
