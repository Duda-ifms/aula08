import {useEffect, useState } from "react";
import jsPDF from 'jsPDF';
import 'jspdf-autotable';

export default function Home(){
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
      const buscarUsuario = async () => {
        try{
          const resposta = await fetch("http://localhost:3000/usuarios");
          const dados = await resposta.json();
          setUsuarios(dados);
           }catch{ 
 }}})
}
export default function Registrar() {
  const[nome,setNome] = useState('');
  const[preco,setPreco] = useState('');
 const[categoria,setCategoria] = useState('');
 const[cor,setCor] = useState('');
 const[tamanho,setTamanho] = useState('');
 const[quantidadeestoque,setQuantidadeestoque] = useState('');
 const[imagem,setImagem] = useState('');


 const createProduto = async(event) => {

  event.preventDefault();
  try{
    await fetch('http://localhost:3000/floricultura',{
      method:'POST',
      headers:{ 'Content-Type': 'application/json'},
      body: JSON.stringify({
        nome: nome,
        preco:preco,
        categoria:categoria,
        cor:cor,
        tamanho:tamanho,
        quantidadeestoque:quantidadeestoque,
        imagem:imagem,

      })
    });
  }catch{
    alert("Ocorreu um erro na aplicação")
  }
}

  return (
    <main>
      <form onSubmit = {createProduto}>
      <label>
            <input 
            type="text"
            placeholder="Nome"
            value={nome}
            onChange = {(event) => setNome(event.target.value)}>
            </input>
            </label>

        <label>
            <input 
            type="text"
            placeholder="Preço"
            value={preco}
            onChange = {(event) => setPreco(event.target.value)}>
            </input>
            </label>

         <label>
            <input 
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange = {(event) => setCategoria(event.target.value)}>
            </input>
            </label>

            <label>
            <input 
            type="text"
            placeholder="Cor"
            value={cor}
            onChange = {(event) => setCor(event.target.value)}>
            </input>
            </label>

            <label>
            <input 
            type="text"
            placeholder="Tamanho"
            value={tamanho}
            onChange = {(event) => setTamanho(event.target.value)}>
            </input>
            </label>

            <label>
            <input 
            type="text"
            placeholder="Quantidade estoque"
            value={quantidadeestoque}
            onChange = {(event) => setQuantidadeestoque(event.target.value)}>
            </input>
            </label>

            <label>
            <input 
            type="imagem"
            placeholder="Imagem"
            value= {imagem}
            onChange = {(event) => setImagem(event.target.value)}>
            </input>
            </label>
            <button type="subimt" onClick={createProduto}> Criar Produto</button>

      </form>
    </main>
        
  );
}