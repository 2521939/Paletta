var url = "http://localhost:3000/posts";
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

                <section class="post-thumb" style="cursor: pointer onclick="abrirpost(${row.idPos})";">
                    <h3>${row.nome}</h3>
                    <p>ID do Post: ${row.idPos}</p>
                </section>
            `);
            tbody.appendChild(tr);                 // Criada a linha, adicionamos
        });                                        // no corpo da tabela
    } catch (error) {
        alert("Error: " + error);
    }
};

function abrirpost(){

    document.getElementById('titulo').innerText = post.titulo || "Sem Título";
    document.getElementById('descricao').innerText = post.descricao || "Sem Descrição";
    document.getElementById('tamanho').innerText = post.resolucao || "Sem Resolução";
    document.getElementById('contato').innerText = post.comuniOutros || "Sem Informação";

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
    let method = idPos.disabled ? 'PUT' : 'POST';
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

