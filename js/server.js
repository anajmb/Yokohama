const express = require('express');
const app = express();
const mysql = require('mysql2');
const PORT = 5000;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Yokohama'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err)
    } else {
        console.log('Conectado ao banco de dados MySQL')
    }
});

app.use(express.json());

app.get('/clientes/listar', (req, res) => {

 const selectFromCli = 'SELECT * FROM clientes';
        db.query(selectFromCli, (err, result) => {
            if (err) {
                return res.status(500).json({ msg: 'Erro ao listar todos os clientes:', error: err});
            } 
                res.status(201).json({ msg: 'Clientes listados com sucesso.', yokohama: result});
            })
});
app.get('/restaurantes/listar', (req, res) => {

    const selectFromRest = 'SELECT * FROM restaurantes';
           db.query(selectFromRest, (err, result) => {
               if (err) {
                   return res.status(500).json({ msg: 'Erro ao listar todos os pedidos dos restaurantes:', error: err});
               } 
                   res.status(201).json({ msg: 'Pedidos dos restaurantes listados com sucesso.', yokohama: result});
               })
   });


app.post('/clientes/salvar', (req, res) => {
    const { nome, email, senha} = req.body;
    if (!nome || !email || !senha ) {
        return res.status(400).json({ msg: 'Preencha todos os campos'});
    }  
        const insertUserQuery = 'INSERT INTO clientes (nome, email, senha) VALUES (?,?,?)';
        db.query(insertUserQuery, [ nome, email, senha], (err, result) => {
            if (err) {
                return res.status(500).json({ msg: 'Erro ao cadastrar cliente:', error: err});
            } 
                res.status(201).json({ msg: 'Cliente cadastrada com sucesso.', restauranteID: result.insertId});
            });
});

app.post('/restaurantes/salvar', (req, res) => {
    const { nome, cidade , mesa, quantidade, dia, tipo_pagamento} = req.body;
    if (!nome || !cidade || !mesa || !quantidade || !dia || !tipo_pagamento) {
        return res.status(400).json({ msg: 'Preencha todos os campos'});
    }  
        const insertUserQuery = 'INSERT INTO restaurantes (nome, cidade , mesa, quantidade, dia) VALUES (?,?,?,?,?)';
        db.query(insertUserQuery, [ nome, cidade , mesa, quantidade, dia], (err, result) => {
            if (err) {
                return res.status(500).json({ msg: 'Erro ao cadastrar reserva:', error: err});
            } 
                res.status(201).json({ msg: 'Reserva cadastrada com sucesso.', restauranteID: result.insertId});
            });             
});

app.listen(PORT, () => {
    console.log('Servidor rodando na porta ${PORT}');
});
