import { useEffect, useState } from "react";

export function Home() {
  const [floricultura, setFloricultura] = useState([]);

  useEffect(() => {
    const buscarFloricultura = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/floricultura");
        const dados = await resposta.json();
        setFloricultura(dados);
      } catch {}
    };
    buscarFloricultura();
  }, []);
}

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
      await fetch('http://localhost:3000/floricultura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome,
          preco: preco,
          categoria: categoria,
          cor: cor,
          tamanho: tamanho,
          quantidadeestoque: quantidadeestoque,
          imagem: imagem,
        })
      });
    } catch {
      alert("Ocorreu um erro na aplicação");
    }
  }

  return (
    <main>
      <form onSubmit={createProduto}>
        <label>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}>
          </input>
        </label>
        <button type="submit">Criar Produto</button>
      </form>
    </main>
  );
}
