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


  return (
        
  );
}