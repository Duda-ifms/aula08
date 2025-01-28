import React from 'react' 
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";

const exportarPDF = (produtos) => {
  try {
    const doc = new jsPDF();
    const tabelaDados = produtos.map((produto) => [
      produto.nome,
      produto.preco,
      produto.cor,
      produto.tamanho,
      produto.quantidadeestoque,
      produto.imagem,
    ]);

    doc.text("Lista de Flores", 10, 10);
    doc.autoTable({
      head: [["Nome", "Preço", "Cor", "Tamanho", "Quantidade Estoque", "Imagem"]],
      body: tabelaDados,
    });

    doc.save("floricultura.pdf");
  } catch (error) {
    alert("Erro ao gerar o PDF!");
    console.error("Erro ao gerar o PDF:", error);
  }
};

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/floricultura");
        const dados = await resposta.json();
        setProdutos(dados);
      } catch (error) {
        alert("Erro ao buscar produtos!");
        console.error("Erro ao buscar produtos:", error);
      }
    };
    buscarProdutos();
  }, []);

  const apagarItem = async (id) => {
    try {
      await fetch("http://localhost:3000/floricultura/" + id, {
        method: "DELETE",
      });
      setProdutos(produtos.filter((produto) => produto.id !== id));
    } catch (error) {
      alert("Erro ao apagar o produto!");
      console.error("Erro ao apagar o produto:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Lista de Produtos
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Preço</strong></TableCell>
              <TableCell><strong>Cor</strong></TableCell>
              <TableCell><strong>Tamanho</strong></TableCell>
              <TableCell><strong>Quantidade Estoque</strong></TableCell>
              <TableCell><strong>Imagem</strong></TableCell>
              <TableCell><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{produto.preco}</TableCell>
                <TableCell>{produto.cor}</TableCell>
                <TableCell>{produto.tamanho}</TableCell>
                <TableCell>{produto.quantidadeestoque}</TableCell>
                <TableCell>
                  {produto.imagem && (
                    <img
                      src={produto.imagem}
                      alt={`Imagem de ${produto.nome}`}
                      style={{
                        width: "100px",
                        height: "auto",
                        borderRadius: "5px",
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => apagarItem(produto.id)}
                  >
                    Apagar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={() => exportarPDF(produtos)}
      >
        Exportar PDF
      </Button>
    </div>
  );
}
