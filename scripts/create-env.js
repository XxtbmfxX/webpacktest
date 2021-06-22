const fs = require('fs'); //file sistem para guardar o enviar datos

fs.writeSync('./.env', `API=${process.env.API}\n`)