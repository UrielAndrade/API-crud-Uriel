//? methodo 2 mais EZ mais antigo, (nao compensa, abandonado aos poucos!)
//!const express = require('express');

//? Metodo 1 de "Puxar" a biblioteca express, (Mais chato minh opn, entretanto, mais moderno), ADD no JSON "packge.json" = "type": "module", 
import express from 'express';
const app = express();
const port = 3000;

app.get("/tasks", (req, res) => {
        res.send('ok, Entrou na rota usuarios!');

    }) //1) tipo de rota / metodo HTTP 2) endereco
app.listen(3000)