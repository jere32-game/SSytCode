const puppeteer = require('puppeteer');

async function iniciarBot() {
  try {
    const browser = await puppeteer.launch({
      headless: true, // Obligatorio para servidores
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage' // Evita caídas por falta de memoria
      ]
    });
    
    const page = await browser.newPage();
    console.log("Abriendo la página web...");
    await page.goto('https://jere32-game.github.io/-botss/', { waitUntil: 'networkidle2' });
    
    // Recarga cada 5 minutos para simular actividad constante
    setInterval(async () => {
      try {
        console.log("Recargando página para mantener actividad...");
        await page.reload({ waitUntil: 'networkidle2' });
      } catch (error) {
        console.error("Error al recargar:", error.message);
      }
    }, 300000);

  } catch (error) {
    console.error("Error en el bot:", error);
  }
}

iniciarBot();
