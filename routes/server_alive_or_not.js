const express = require('express');
const router = express.Router();

module.exports = function (rfuns) {
  router.get("/", async (req, res) => {
    try {
      const hw = await rfuns.hello_world();
      let message = "Server says";
      message =  message +" " + hw.values;
      res.json({
        message: message,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};