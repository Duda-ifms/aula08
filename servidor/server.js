const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let floricultura = [];

// Endpoint para adicionar uma nova flor
app.post('/floricultura', (req, res) => {
    const { nome, preco, categoria, cor, tamanho, quantidadeestoque, imagem } = req.body;

    if (!nome || !preco || !categoria || !cor || !tamanho || !quantidadeestoque || !imagem) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const novaFlor = {
        id: floricultura.length + 1,
        nome,
        preco,
        categoria,
        cor,
        tamanho,
        quantidadeestoque,
        imagem
    };

    floricultura.push(novaFlor);
    res.status(201).json(novaFlor);
});

// Endpoint para listar todas as flores
app.get('/floricultura', (req, res) => {
    res.status(200).json(floricultura);
});

// Endpoint para buscar uma flor pelo ID
app.get('/floricultura/:id', (req, res) => {
    const { id } = req.params;
    const flor = floricultura.find(f => f.id === parseInt(id));

    if (!flor) {
        return res.status(404).json({ erro: 'Flor não encontrada' });
    }

    res.status(200).json(flor);
});

// Endpoint para atualizar informações de uma flor
app.put('/floricultura/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco, categoria, cor, tamanho, quantidadeestoque, imagem } = req.body;

    const flor = floricultura.find(f => f.id === parseInt(id));

    if (!flor) {
        return res.status(404).json({ erro: 'Flor não encontrada' });
    }

    // Atualiza apenas os campos fornecidos
    if (nome) flor.nome = nome;
    if (preco) flor.preco = preco;
    if (categoria) flor.categoria = categoria;
    if (cor) flor.cor = cor;
    if (tamanho) flor.tamanho = tamanho;
    if (quantidadeestoque) flor.quantidadeestoque = quantidadeestoque;
    if (imagem) flor.imagem = imagem;

    res.status(200).json(flor);
});

// Endpoint para deletar uma flor
app.delete('/floricultura/:id', (req, res) => {
    const { id } = req.params;
    const index = floricultura.findIndex(f => f.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ erro: 'Flor não encontrada' });
    }

    floricultura.splice(index, 1);
    res.status(204).send();
});

// Inicializa o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
