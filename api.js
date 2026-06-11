var url = "http://localhost:8080/users";
const headers = {
    'Content-Type': 'application/json; charset=utf-8',  
    "X-User": "fulano",                                 
    'X-API-KEY': "12345",                               
};
const modalpost = document.getElementById('modalPost')
const fecharbtnpost = document.getElementById(fecharbtnpost)


function fecharpost(){
 modalpost.close();
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
        result.forEach(row => {                    // para cada objeto da lista
            let sectionscript = document.createElement("section"); // cria uma linha da tabela
            sectionscript.innerHTML = (`

                <section class="post-thumb" style="cursor: pointer onclick="abrirpost(${row.id})";">
                    <h3>${row.nome-post}</h3>
                    <p>ID do Post: ${row.id}</p>
                </section>
            `);
            tbody.appendChild(tr);                 // Criada a linha, adicionamos
        });                                        // no corpo da tabela
    } catch (error) {
        alert("Error: " + error);
    }
};

function abrirpost(){

    document.getElementById('titulo-post').innerText = post.titulo-post || "Sem Título";
    document.getElementById('descricao').innerText = post.descricao-post || "Sem Descrição";
    document.getElementById('tamanho').innerText = post.resolucao-post || "Sem Resolução";
    document.getElementById('contato').innerText = post.comuniOutros || "Sem Informação";

    modalpost.showModal();
  
};

async function gravar() {
    let id = document.getElementById('id');
    let titulo-post = document.getElementById('titulo-post');
    let descricao-post = document.getElementById('descricao-post');
    let resolucao-post = document.getElementById('resolucao-post');
    let comuniOutros = document.getElementById('comuniOutros');
    let i_id = 0;
    if (isNaN(i_id = parseInt(id.value))) {         // O id precisa ser um número inteiro
        alert("O id precisa ser um inteiro.");
        return;
    }
    var data = JSON.stringify({                     // Criamos nosso objeto JSON Para o envio
        id: i_id,
        titulo-post: titulo-post.value,
        descricao-post: descricao-post.value,
        resolucao-post: resolucao-post.value,
        comuniOutros: comuniOutros.value,
    });
    // Se o campo ID estiver desabilitado, é porque estávamos alterando,
    // então usa PUT, senão POST, pois é um novo registro.
    let method = id.disabled ? 'PUT' : 'POST';
    try {
        const response = await fetch(url, {
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

