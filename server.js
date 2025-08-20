const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

let tarefas = [];

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
    const {texto} = req.body;
    const novaTarefa = {id: Date.now(), texto};
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

app.delete('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    res.sendStatus(204);
});

app.put('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { texto } = req.body;

  const index = tarefas.find(tarefa => tarefa.id == id);

  if (!index) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  if (texto)  {
     index.texto = texto; 
  } else {
     index.texto = index.texto;
  }
  res.json(tarefas[index]); 
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
