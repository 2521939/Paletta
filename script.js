
const abrirmodal = document.getElementById('abrirmodal');
const modalLogin = document.getElementById('modalLogin')
const fecharmodalbtn = document.getElementById('fecharmodalbtn')

/*teste de event listener, pode simplesmente fazer on click
quando é um botão e usar a função
*/

abrirmodal.addEventListener('click', funcaomodalabrir);

function funcaomodalabrir(){
    modalLogin.showModal();
};


fecharmodalbtn.addEventListener('click', funcaomodalfechar);

function funcaomodalfechar(){
    modalLogin.close();
};