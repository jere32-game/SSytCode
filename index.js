const puppeteer = require('puppeteer');
const http = require('http');

// Servidor web obligatorio para Koyeb
const PORT = process.env.PORT || 8000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot activo y corriendo');
}).listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

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
    console.log("Abriendo página objetivo...");
    await page.goto('https://jere32-game.github.io/-botss/', { waitUntil: 'networkidle2' });
    
    // Recarga continua cada 5 minutos
    setInterval(async () => {
      try {
        console.log("Recargando para mantener sesión activa...");
        await page.reload({ waitUntil: 'networkidle2' });
      } catch (e) {
        console.error("Error al recargar:", e.message);
      }
    }, 300000);

  } catch (error) {
    console.error("Error crítico en el bot:", error);
  }
}

iniciarBot();
