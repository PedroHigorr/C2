const port = 3006;
const path = require('path');
const express = require('express');
const multer = require('multer');
const knex = require('./database');
const fs = require('fs');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));

// Configuração do middleware de sessões
app.use(session({
    secret: '9c01e46f2234b76bc8a101cb9c7767e6', // String usado para calcular o hash, para que o acesso à sessão não seja negado
    resave: false, // força o salvamento da sessão, mas eu não entendi ainda tem que ler lá na doc, não entendi
    saveUninitialized: false, 
    cookie: { 
        secure: false, // secure: true em produção para envios em HTTPS
        sameSite: 'lax' //usado para envio de cookies em cross-site (proteção) 
    } 
}));

// Verifica se a pasta 'uploads' existe, caso contrário, cria a pasta
const uploadDir = path.join(__dirname, '../', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Rota para envio de form. register
app.post('/register', async (req, res) => {
    try {
        await knex('users').insert(req.body);
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    } catch (err) {
        res.status(500).json({ mensagem: `${err}` });
    }
});

// Rota para envio de form. login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await knex('users').where({ email, senha }).first();
        if (user) {
            req.session.userId = user.id; // Armazenar o ID do usuário na sessão
            res.status(200).json({ mensagem: 'Usuário autenticado!', redirectUrl: '/' }); // Redirecionar para a página inicial
        } else {
            res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
        }
    } catch (err) {
        res.status(500).json({ mensagem: `${err}` });
    }
});

// Middleware para verificar se o usuário está autenticado
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login'); // Redireciona para a página de login se o usuário não estiver autenticado
    }
}

// Rota para envio de form. de artes (protege a rota)
app.post('/post-art', isAuthenticated, upload.single('imagem'), async (req, res) => {
    const { nome_obra, dimensao, descricao, categoria, estilo, tema, data_criacao, preco} = req.body;
    const user_id = req.session.userId; 

    const caminho_imagem = req.file.filename; // Nome do arquivo gerado pelo multer

    try {
        await knex('arts').insert({
            user_id,
            nome_obra,
            caminho_imagem: `/uploads/${caminho_imagem}`, // Caminho relativo para o arquivo
            dimensao,
            descricao,
            categoria,
            estilo,
            tema,
            data_criacao,
            preco
        });
        res.status(201).json({ mensagem: 'Obra postada com sucesso!' });
    } catch (err) {
        res.status(500).json({ mensagem: `${err}` });
    }
});

// Rota para servir o arquivo registerWork.html (protege a rota)
app.get('/registerWork', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'registerWork.html'));
});

// Rota para servir o arquivo login.html
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'login.html'));
});

// Rota para servir a página inicial (protege a rota)
app.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'index.html'));
});

//Rota para receber dados da obra
app.get('/art/:id', async (req, res) => {
    const artId = req.params.id;

    try {
        const art = await knex('arts')
            .join('users', 'arts.user_id', 'users.id')
            .select('arts.*', 'users.nome as artist_name')
            .where('arts.id', artId)
            .first();

        if (art) {
            res.status(200).json(art);
        } else {
            res.status(404).json({ mensagem: 'Obra não encontrada.' });
        }
    } catch (err) {
        res.status(500).json({ mensagem: `${err}` });
    }
});


app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
});
