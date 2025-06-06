// importa o framework express
const express = require('express');
// importa o modulo cors para permitir requisições de outras origens
const cors = require('cors');
// cria uma instancia da aplicação express
const app = express();
 
// define a porta em que a aplicação vai rodar
const PORT = 3000;
 
//aplica o middleware cors para permitir requisições de outras origens
app.use(cors());
//aplica o middleware express.json que permite receber e interpretar JSON no corpo das requisições(red.body)
app.use(express.json());
 
//Array em memoria para simular o banco de dados
let tarefas = [];
 
 
/* --------------------------ROTAS DA API-------------------------- */
 
// rota GeT - RETORNA A LISTA COM TODAS AS TAREFAS
app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});
// Rota POST -adiciona uma tarefa a lista
app.post('/tarefas', (req, res) => {
    const {texto} = req.body;
    const novaTarefa = {id: Date.now(), texto};
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});
// Rota DELETE -remove uma tarefa da lista
app.delete('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    res.sendStatus(204);
});
//Rota PUT - Atualiza uma tarefa existente
app.put('/tarefas/:id', (req, res) => {
  //Obtém o ID da tarefa a ser atualizada a partir dos parâmetros da URL
  const id = parseInt(req.params.id);
  //Extrai o novo texto enviado no corpo da requisição
  const { texto } = req.body;
 
  //Encontra o índice da tarefa a ser atualizada no array de tarefas
  const index = tarefas.find(tarefa => tarefa.id == id);
 
  //Validação: verifica se a tarefa existe
  if (!index) {
    //Se não existe, responde com erro 404 (Not Found)
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }
 
    //Se um novo texto foi enviado, atualiza o campo 'texto' da tarefa
    if (texto)  {
       index.texto = texto; 
    }
    //Se não foi enviado, mantém o texto atual
    else {
       index.texto = index.texto;
    }
  //Responde com a tarefa atualizada
  res.json(tarefas[index]); 
});
// inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});