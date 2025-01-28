import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Alterar() {

    const { id } = useParams();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [cor, setCor] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [quantidadeestoque, setQuantidadeestoque] = useState('');
    const [imagem, setImagem] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
        const busca = async()=>{
            const resposta = await fetch('http://localhost:3000/floricultura/'+ id );
            const dados = await resposta.json();
            setNome(dados.nome);
            setCor(dados.cor);
            setTamanho(dados.tamanho);
            setPreco(dados.preco);
            setQuantidadeestoque(dados.quantidadeestoque);
            setImagem(dados.imagem);
        }
        busca();
    } ,[]);

    const alterar = async(event) => {
        event.preventDefault();
        try{
            await fetch('http://localhost:3000/floricultura/'+ id, 
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'Application/json'},
                    body: JSON.stringify({
                        nome: nome,
                        preco:preco,
                        cor:cor,
                        tamanho:tamanho,
                        quantidadeestoque:quantidadeestoque,
                        imagem:imagem,

                    })
                }
            );
            navigation('/');
        }catch{
            alert('Erro ao alterar');
        }
    }
    return (
        <form onSubmit={alterar}>
            <input type="text" value={nome} onChange={(evento)=> setNome(evento.target.value)}/>
            <input type="text" value={preco}onChange={(evento)=> setPreco(evento.target.value)}/>
            <input type="text" value={cor}onChange={(evento)=> setCor(evento.target.value)}/>
            <input type="text" value={tamanho}onChange={(evento)=> setTamanho(evento.target.value)}/>
            <input type="text" value={quantidadeestoque}onChange={(evento)=> setQuantidadeestoque(evento.target.value)}/>
            <input type="text" value={imagem}onChange={(evento)=> setImagem(evento.target.value)}/>
            <button>Alterar</button>
        </form>
    );
}

<tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.preco}</td>
              <td>{produto.cor}</td>
              <td>{produto.tamanho}</td>
              <td>{produto.quantidadeestoque}</td>
              <td>{produto.imagem}</td>
              <td>
                <button onClick={() => removerFlores(produto.id)}>
                     <DeleteIcon/>
                </button>
                <Link to={'/alterar/' + produto.id}>
                  <button>Alterar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>