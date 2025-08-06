const urlAPI = "http://localhost:3000/tarefas";
 
/*Selecionar os elemento DOM
na pagina HTML para manipula-la
Aloca o valor que um usuario digita no input na variavel chamada inputTarefa*/
const inputTarefa = document.querySelector(".campo-tarefa");
/* Selecionar o botao de adicionar a tarefa e alocar na variavel botaoAdicionar
que sera utilizado para adicionar uma nova tarefas */
const botaoAdicionar = document.querySelector(".botao-adicionar");
 
/*Seleciona a lista de tarefas e aloca na variavel listaTarefas,
que sera utilizada para m exibir as tarefas na tela*/
const listaTarefas = document.querySelector(".lista-tarefas");

async function renderizarTarefas(){

    try{
        const reposta = await fetch(urlAPI)
        const tarefas = await reposta.json();
        
        tarefas.forEach(tarefa => {
            const itemLista = document.createElement('li');
            itemLista.className ='item-tarefa';
            itemLista.textContent = tarefa.Titulo;

            const botaoRemover = document.createElement('button');
            botaoRemover.className = 'botao-remover';
            botaoRemover.textContent = 'excluir';

            const botaoEditar = document.createElement('button');
            botaoEditar.className ='botao-editar';
            botaoEditar.textContent = 'Editar';

            itemLista.appendChild(botaoRemover);
            itemLista.appendChild(botaoEditar);
            listaTarefas.appendChild(itemLista);


        })
    }
    catch (erro){
        console.error("Erro ao renderizar tarefas:" + erro);
    }
}

/*Função para adicionar uma nova tarefa a lista de tarefas*/
async function adicionarTarefas (titulo){
    try{
        await fetch(urlAPI,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                /* Por enquanto, apenas o titulo da tarefa */
                titulo: titulo
            })
        });

        renderizarTarefas();


    }catch(erro){
        console.error("Erro ao adicionar tarefa:", erro);
    }
}
/*Evento liostener para adicionar uma nova tarefa quando o botao de adicionar tarefa, para que seja monitorado o clique do usuario no botão*/
 botaoAdicionar.addEventListener("click", function(evento){
    /*Evita o comportamento padrão do botao*/
     evento.preventDefault();
     const novaTarefa = inputTarefa.value.trim();
     /*verifica se o  */
     if(novaTarefa !== ""){
         adicionarTarefas(novaTarefa);
         inputTarefa.value = "";
     }
 });
 renderizarTarefas();