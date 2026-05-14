const puppeteer = require('puppeteer');
const http = require('http');

// 1. Servidor web básico obligatorio para que Render mantenga el servicio vivo
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot ejecutándose correctamente');
}).listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});

// 2. Lógica de tu bot de Puppeteer
async function iniciarBot() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
    
    const page = await browser.newPage();
    console.log("Abriendo la página web...");
    await page.goto('https://jere32-game.github.io/-botss/', { waitUntil: 'networkidle2' });
    
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
