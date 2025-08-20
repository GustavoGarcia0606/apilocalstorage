let tarefas = [];

const inputTarefa = document.querySelector(".campo-tarefa");
const botaoAdicionar = document.querySelector(".botao-adicionar");
const listaTarefas = document.querySelector(".lista-tarefas");

function renderizarTarefas(){
    listaTarefas.innerHTML = "";
    for (var i = 0; i < tarefas.length; i++){
        const tarefaTexto = tarefas[i];

        const itemLista = document.createElement("li");
        itemLista.className = "item-tarefa";
        itemLista.textContent = tarefaTexto;

        const botaoRemover = document.createElement("button");
        botaoRemover.className = "botao-remover";
        botaoRemover.textContent = "Remover";

        const botaoEditar = document.createElement("button");
        botaoEditar.className = "botao-editar";
        botaoEditar.textContent = "Editar";

       botaoRemover.addEventListener("click", function(i) {
            tarefas.splice(i, 1);
            renderizarTarefas();
        });

     itemLista.appendChild(botaoRemover);
     listaTarefas.appendChild(itemLista);
    }
}

botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();
    const novaTarefa = inputTarefa.value.trim();
    if (novaTarefa !== "") {
        tarefas.push(novaTarefa);
        console.log(tarefas);
        inputTarefa.value = "";
        renderizarTarefas();
    }
});
