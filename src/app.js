const port = 3006
const path = require('path')
const express = require('express')
const knex = require('./database')


const app = express()

app.use(express.json())



app.use(express.static(path.join(__dirname, '../','public')))

app.post('/register', async (req, res) => {
    console.log(req.body)
    
try{
    await knex('users').insert(
        req.body
    )
    res.status(201).json({mensagem: 'Usuário cadastrado com sucesso!'})
} catch(err) {res.status(500).json({ mensagem: `${err}`})
}})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../','public', 'register.html'))
})

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`)
})


app.post('/login', async (req, res) => {
    const{senha, email} = req.body

    try{
        await knex('users').select('*').where(email, senha).first()
        res.status(201).json({ mensagem: 'Usuário autenticado! '})
    }catch(erro){
        res.status(erro).json( { mensagem: `${erro}`})
    }
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'))
})

// rota para teste de conexão com o banco de dados

// app.get('/database', async (req, res) => {
//     try {
//       await knex.raw('SELECT 1+1 AS result');
//       res.status(200).json({ mensagem: 'Conexão bem-sucedida!' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ mensagem: 'Erro ao conectar ao banco de dados' });
//     }
//   });
  
//   app.listen(port, () => {
//     console.log(`Servidor executando na porta ${port}`);
//   });