//? methodo 2 mais EZ mais antigo, (nao compensa, abandonado aos poucos!)
//!const express = require('express');
//? Metodo 1 de "Puxar" a biblioteca express, (Mais chato minh opn, entretanto, mais moderno), ADD no JSON "packge.json" = "type": "module", 

import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = express();
app.use(express.json()); //? Habilita o Express a ler JSON!

//? cadastrar task
app.post('/NewUser', async(req, res) => { //? Tudo vem dentro das 
    try {
        const newUser = await prisma.user.create({ //!Retorna uma promise 'async' (assincrona)
            data: {
                desc: req.body.desc,
                name: req.body.name,
                age: req.body.age,
            },
        });
        res.status(201).json(newUser); // Retorne o usuario criado
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' }); //? erros
    }
});

//? exibir dados 
app.get("/users", (req, res) => {
        res.status(200).json(users);
    }) //1) tipo de rota / metodo HTTP 2) endereco
app.listen(3000);
//