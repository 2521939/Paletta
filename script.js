
let abrirmodal = document.getElementById('abrirmodal')
let modalLogin = document.getElementById('modalLogin')
let fecharmodalbtn = document.getElementById('fecharmodalbtn')
let PalettaLogo = document.getElementById('IndexRedir')

let janslides = document.getElementById('janelas-slide')
let slides = document.querySelectorAll('.slide')

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

// Referente aos Slides



function moverdireita() {
    let pos_slide1 = slides[0].offsetLeft
    let pos_slide2 = slides[1].offsetLeft

    let distanciafinal = pos_slide2 - pos_slide1
        janslides.scrollBy({
            left: distanciafinal,
            behavior: 'smooth'
        })
    }

function moveresquerda() {
    let pos_slide1 = slides[0].offsetLeft
    let pos_slide2 = slides[1].offsetLeft

    let distanciafinal = pos_slide2 - pos_slide1
        janslides.scrollBy({
            left: -distanciafinal,
            behavior: 'smooth'
        })
    }



