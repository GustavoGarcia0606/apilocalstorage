const urlAPI = "http://localhost:3000/tarefas";

// Seleção dos elementos DOM
const formAdicionar = document.getElementById("form-adicionar");
const listaTarefas = document.querySelector(".lista-tarefas");

// Modal e elementos do formulário de edição
const modalEdicao = document.getElementById("modal-edicao");
const formEditar = document.getElementById("form-editar");
const editTitulo = document.getElementById("edit-titulo");
const editDescricao = document.getElementById("edit-descricao");
const editStatus = document.getElementById("edit-status");
const editPrioridade = document.getElementById("edit-prioridade");
const editData = document.getElementById("edit-data");
const btnCancelar = document.getElementById("btn-cancelar");

let tarefaEditandoId = null;

// Renderiza lista de tarefas na tela
async function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    try {
        const resposta = await fetch(urlAPI);
        const tarefas = await resposta.json();

        tarefas.forEach((tarefa) => {
            const itemLista = document.createElement("li");
            itemLista.className = "item-tarefa";

            // Conteúdo com propriedades minúsculas
            itemLista.innerHTML = `
                <div>
                    <strong>${tarefa.titulo}</strong><br/>
                    Descrição: ${tarefa.descricao || "-"}<br/>
                    Status: ${tarefa.status}<br/>
                    Prioridade: ${tarefa.prioridade}<br/>
                    Data de Entrega: ${tarefa.data_entrega ? new Date(tarefa.data_entrega).toLocaleDateString() : "-"}
                </div>
            `;

            // Botão remover
            const botaoRemover = document.createElement("button");
            botaoRemover.className = "botao-remover";
            botaoRemover.textContent = "Excluir";
            botaoRemover.addEventListener("click", () => removerTarefa(tarefa.id));

            // Botão editar
            const botaoEditar = document.createElement("button");
            botaoEditar.className = "botao-editar";
            botaoEditar.textContent = "Editar";
            botaoEditar.addEventListener("click", () => abrirModalEdicao(tarefa));

            itemLista.appendChild(botaoRemover);
            itemLista.appendChild(botaoEditar);

            listaTarefas.appendChild(itemLista);
        });
    } catch (erro) {
        console.error("Erro ao renderizar tarefas:", erro);
    }
}

// Adiciona uma nova tarefa
formAdicionar.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const titulo = formAdicionar.querySelector(".campo-titulo").value.trim();
    const descricao = formAdicionar.querySelector(".campo-descricao").value.trim();
    const status = formAdicionar.querySelector(".campo-status").value;
    const prioridade = formAdicionar.querySelector(".campo-prioridade").value;
    const data_entrega = formAdicionar.querySelector(".campo-data").value;

    if (!titulo || !status || !prioridade || !data_entrega) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    try {
        await fetch(urlAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo, descricao, status, prioridade, data_entrega }),
        });

        formAdicionar.reset();
        renderizarTarefas();
    } catch (erro) {
        console.error("Erro ao adicionar tarefa:", erro);
    }
});

// Remove tarefa
async function removerTarefa(id) {
    try {
        await fetch(`${urlAPI}/${id}`, { method: "DELETE" });
        renderizarTarefas();
    } catch (erro) {
        console.error("Erro ao deletar tarefa:", erro);
    }
}

// Abre modal para edição preenchendo com dados da tarefa (minúsculas)
function abrirModalEdicao(tarefa) {
    tarefaEditandoId = tarefa.id;
    editTitulo.value = tarefa.titulo;
    editDescricao.value = tarefa.descricao || "";
    editStatus.value = tarefa.status;
    editPrioridade.value = tarefa.prioridade;
    editData.value = tarefa.data_entrega ? tarefa.data_entrega.slice(0, 10) : "";

    modalEdicao.style.display = "flex";
}

// Fecha modal ao clicar no cancelar
btnCancelar.addEventListener("click", () => {
    modalEdicao.style.display = "none";
    tarefaEditandoId = null;
});

// Envia edição para backend
formEditar.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!tarefaEditandoId) return;

    const titulo = editTitulo.value.trim();
    const descricao = editDescricao.value.trim();
    const status = editStatus.value;
    const prioridade = editPrioridade.value;
    const data_entrega = editData.value;

    if (!titulo || !status || !prioridade || !data_entrega) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    try {
        await fetch(`${urlAPI}/${tarefaEditandoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo, descricao, status, prioridade, data_entrega }),
        });

        modalEdicao.style.display = "none";
        tarefaEditandoId = null;
        renderizarTarefas();
    } catch (erro) {
        console.error("Erro ao editar tarefa:", erro);
    }
});

// Fecha modal ao clicar fora do conteúdo
window.addEventListener("click", (event) => {
    if (event.target === modalEdicao) {
        modalEdicao.style.display = "none";
        tarefaEditandoId = null;
    }
});

// Inicializa lista de tarefas
renderizarTarefas();
