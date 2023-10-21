
/********************************************/
/***** portafolio fundamentos academlo *****/
/******************************************/

function skills () {
    // Hago la lectura de los elementos del DOM
    const slider = document.querySelector('.slider__skills');
    const labels = document.querySelectorAll('.slider__skills img');
    // Extraigo las rutas de las imagenes que voy a necesitar
    const images = [];
    labels.forEach(element => {images.push(element.src)});
    // Asigno la primera imagen al slider
    let count = 0;
    slider.innerHTML = `
        <img src="${images[count]}" alt="logo habilidad dura">
    `;
    // Pongo el slider a cambiar de item automaticamente
    setInterval(() => {
        if (count<images.length-1) {
            count++;
        } else {
            count = 0;
        }
        slider.innerHTML = `
            <img src="${images[count]}" alt="logo habilidad dura">
        `;
    }, 3000);
}
function sound () {
    const audio = document.querySelector('.icon__volume');
    const icon = document.querySelector('.icon__volume ion-icon');
    const mp3 = document.querySelector('.icon__volume audio');
    audio.addEventListener('click', ()=>{
        if (mp3.muted) {
            mp3.muted = false;
        } else {
            mp3.muted = true;
        }
        if (icon.name==='volume-mute-sharp') {
            icon.name = 'volume-high-sharp';
        } else {
            icon.name = 'volume-mute-sharp';
        }
    });
}
function darkMode () {
    const body = document.querySelector('body');
    const btn = document.querySelector('.icon__dark');
    const icon = document.querySelector('.icon__dark ion-icon');
    btn.addEventListener('click', ()=>{
        body.classList.toggle('dark');
        if (icon.name==='sunny-sharp') {
            icon.name = 'moon-sharp';
        } else {
            icon.name = 'sunny-sharp';
        }
    });
}
function socialMedia () {
    const nav = document.querySelector('.header__nav');
    const footer = document.querySelector('.footer');
    footer.classList.toggle('active');
    setTimeout(() => {
        footer.classList.toggle('active');
    }, 2000);
    nav.addEventListener('click', ()=>{
        footer.classList.toggle('active');
        setTimeout(() => {
            footer.classList.toggle('active');
        }, 2000);
    });
}
function main () {
    skills();
    sound();
    darkMode();
    socialMedia();
}
main();