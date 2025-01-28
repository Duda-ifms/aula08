import React, { useEffect, useState } from 'react';

// Componente Home para buscar e exibir os produtos
export function Home() {
  const [floricultura, setFloricultura] = useState([]);

  useEffect(() => {
    const buscarFloricultura = async () => {
      try {
        const resposta = await fetch('http://localhost:3000/floricultura');
        const dados = await resposta.json();
        setFloricultura(dados);
      } catch (error) {
        alert('Erro ao carregar os produtos');
        console.error('Erro ao buscar produtos:', error);
      }
    };
    buscarFloricultura();
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {floricultura.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - {produto.preco} - {produto.cor} - {produto.tamanho}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Componente Registrar para criar novos produtos
export default function Registrar() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cor, setCor] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [quantidadeestoque, setQuantidadeestoque] = useState('');
  const [imagem, setImagem] = useState('');

  const createProduto = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/floricultura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          preco,
          categoria,
          cor,
          tamanho,
          quantidadeestoque,
          imagem,
        }),
      });
      if (response.ok) {
        alert('Produto criado com sucesso!');
      } else {
        alert('Falha ao criar produto');
      }
    } catch (error) {
      alert('Ocorreu um erro na aplicação');
      console.error('Erro ao criar produto:', error);
    }
  };

  return (
    <main>
      <h2>Criar Produto</h2>
      <form onSubmit={createProduto}>
        <label>
          Nome:
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </label>
        <label>
          Preço:
          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(event) => setPreco(event.target.value)}
            required
          />
        </label>
        <label>
          Categoria:
          <input
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
            required
          />
        </label>
        <label>
          Cor:
          <input
            type="text"
            placeholder="Cor"
            value={cor}
            onChange={(event) => setCor(event.target.value)}
            required
          />
        </label>
        <label>
          Tamanho:
          <input
            type="text"
            placeholder="Tamanho"
            value={tamanho}
            onChange={(event) => setTamanho(event.target.value)}
            required
          />
        </label>
        <label>
          Quantidade em estoque:
          <input
            type="number"
            placeholder="Quantidade Estoque"
            value={quantidadeestoque}
            onChange={(event) => setQuantidadeestoque(event.target.value)}
            required
          />
        </label>
        <label>
          Imagem:
          <input
            type="url"
            placeholder="URL da Imagem"
            value={imagem}
            onChange={(event) => setImagem(event.target.value)}
          />
        </label>
        <button type="submit">Criar Produto</button>
      </form>
    </main>
  );
}
