const express = require("express");
const app = express();
const port = 3000;
const { WebR } = require('webr');
const { initSpidyr, mountLocalPackage } = require("spidyr");

async function initializeServer() {
  try {
    globalThis.webR = new WebR();
    await globalThis.webR.init();
    console.log("webR is ready");
    
    await initSpidyr();
    console.log("Spidyr initialized");

    const rfuns = await mountLocalPackage("./rfuns");
    console.log("Local package mounted");

    // Available routes
    app.use("/", require("./routes/server_alive_or_not")(rfuns));
    app.use("/weather_info", require("./routes/weather_info"));

    app.listen(port, () => {
      console.log("✅ Everything is ready!");
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
}

initializeServer();