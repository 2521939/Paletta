var url = "http://localhost:3000/posts";
let todosOsPosts = [];
let idPostAberto = null;
const headers = {
    'Content-Type': 'application/json; charset=utf-8'                            
};
const modalpost = document.getElementById('modalPost')
const fecharbtnpost = document.getElementById(fecharbtnpost)


function fecharpost(){
 modalpost.close();
};

window.onload = function() {
    let dadosDoPost = localStorage.getItem('postParaEditar');

    if (dadosDoPost) {
        const post = JSON.parse(dadosDoPost);


        document.getElementById('idPos').value = post.idpos;
        document.getElementById('idPos').disabled = true;
        
        document.getElementById('titulo').value = post.titulo || "";
        document.getElementById('descricao').value = post.descricao || "";
        document.getElementById('resolucao').value = post.resolucao || "";
        document.getElementById('comuniOutros').value = post.comunioutros || "";

        localStorage.removeItem('postParaEditar');
    }
};

async function carregarDados() {
    let localdepost = document.getElementById('localdepost');  // instanciamos o corpo da tabela
    localdepost.innerHTML= "";
    try {
        const response = await fetch(url, {        // Fazemos a chamada ao serviço
            method: 'GET',                         // usando a operação GET
            headers: headers,                      // e passamos os cabeçalhos
        });
        const result = await response.json();      // retorna uma lista de objetos JSON
        todosOsPosts = result;
        result.forEach(row => {                    // para cada objeto da lista
            let section = document.createElement("section"); // cria uma linha da tabela
            section.innerHTML = (`

                <section class="post-thumb" style="cursor: pointer" onclick="abrirpost(${row.idpos});">
                    <h3>${row.titulo}</h3>
                </section>
            `);
            localdepost.appendChild(section);                 // Criada a linha, adicionamos
        });                                        // no corpo da tabela
    } catch (error) {
        alert("Error: " + error);
    }
};

function abrirpost(id){
    const post = todosOsPosts.find(p => p.idpos === id)

    if (!post) {
        console.error("Post não encontrado!");
        return;
    }
    idPostAberto = id;
    
    document.getElementById('titulo').innerText = post.titulo || "Sem Título";
    document.getElementById('descricao').innerText = post.descricao || "Sem Descrição";
    document.getElementById('tamanho').innerText = post.resolucao || "Sem Resolução";
    document.getElementById('comuniOutros').innerText = post.comunioutros || "Sem Informação";

    modalpost.showModal();
  
};

async function gravar() {
    let idPos = document.getElementById('idPos');
    let titulo = document.getElementById('titulo');
    let descricao = document.getElementById('descricao');
    let resolucao = document.getElementById('resolucao');
    let comuniOutros = document.getElementById('comuniOutros');
    let i_id = 0;
    if (isNaN(i_id = parseInt(idPos.value))) {         // O id precisa ser um número inteiro
        alert("O id precisa ser um inteiro.");
        return;
    }
    var data = JSON.stringify({                     // Criamos nosso objeto JSON Para o envio
        idPos: i_id,
        titulo: titulo.value,
        descricao: descricao.value,
        resolucao: resolucao.value,
        comuniOutros: comuniOutros.value,
    });
    // Se o campo ID estiver desabilitado, é porque estávamos alterando,
    // então usa PUT, senão POST, pois é um novo registro.
    let targetUrl = method === 'PUT' ? `${url}/${i_id}` : url;
    try {
        const response = await fetch(targetUrl, {
            method: method,
            headers: headers,
            body: data,
        }).then(result => {                         // Se deu tudo ok
            limpar();                               // limpa os campos e habilita o id
            carregarDados();                        // e recarrega os dados da tabela
        });
    } catch (error) {
        alert("Error: " + error);
    }
}


async function excluir() {
let id = idPostAberto
if (!id) {
        alert("Nenhum post selecionado para excluir.");
        return;
    }

    try {
        // Usamos o serviço chamando pelo ID
        const response = await fetch(`${url}/${id}`, {  // Excluimos pelo ID
            method: "DELETE",                           // chamamos a operação DELETE
            headers: headers,
        });
        const result = await response.json();
        fecharpost();
        carregarDados();
    } catch (error) {
        alert("Error: " + error);
    }
}

function editar() {
    let id = idPostAberto; 
    
    if (!id) {
        alert("Nenhum post selecionado para editar.");
        return;
    }

    const postCompleto = todosOsPosts.find(p => p.idpos === id);

    if (!postCompleto) {
        alert("Erro ao encontrar os dados do post.");
        return;
    }

    localStorage.setItem('postParaEditar', JSON.stringify(postCompleto));
    window.location.href = 'criacaopost.html'; 
}
