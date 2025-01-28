const express = require('express');
const cors = require('cors');
require('dotenv').config();

const arvoreArquivosRouter = require('./routes/arvoreArquivos');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use(arvoreArquivosRouter);

module.exports = app;
