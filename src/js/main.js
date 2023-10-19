
/********************************************/
/***** portafolio fundamentos academlo *****/
/******************************************/

function handles () {
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
function main () {
    handles();
}
main();