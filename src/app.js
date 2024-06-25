// NÃO ESQUECER DE ADICIONAR OS COMENTÁRIOS!@!!!@#ER0IJRPOEWUIFOSDFPOI32\
const port = 3006;
const path = require('path');
const express = require('express');
const multer = require('multer');
const knex = require('./database');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));

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
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.post('/register', async (req, res) => {
    try {
        await knex('users').insert(req.body);
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    } catch (err) {
        res.status(500).json({ mensagem: `${err}` });
    }
});

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await knex('users').where({ email, senha }).first();
        if (user) {
            res.status(200).json({ mensagem: 'Usuário autenticado!' });
        } else {
            res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
        }
    } catch (err) {
        res.status(500).json({ mensagem: `${err}` });
    }
});

app.post('/post-art', upload.single('imagem'), async (req, res) => {
    const { nome_obra, dimensao, descricao, categoria, estilo, tema, data_criacao, preco } = req.body;
    const user_id = 1; // Substituir pelo ID do usuário logado
    const caminho_imagem = req.file.path;

    try {
        await knex('arts').insert({
            user_id,
            nome_obra,
            caminho_imagem,
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

// Rota para servir o arquivo registerWork.html
app.get('/registerWork', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'registerWork.html'));
});

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
});
