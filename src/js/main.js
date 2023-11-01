
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
    }, 2000);
}
function sound () {
    const audio = document.querySelector('.icon__volume');
    const icon = document.querySelector('.icon__volume ion-icon');
    const mp3 = document.querySelector('.nav__functions audio');
    audio.addEventListener('click', ()=>{
        if (mp3.paused) {
            mp3.play();
        } else {
            mp3.pause();
            mp3.currentTime = 0;
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
    const iframe = document.querySelector('.header iframe');
    btn.addEventListener('click', ()=>{
        body.classList.toggle('dark');
        const src = iframe.getAttribute('src');
        if (icon.name==='sunny-sharp') {
            icon.name = 'moon-sharp';
        } else {
            icon.name = 'sunny-sharp';
        }
        if (src==='./particles-dark.html') {
            iframe.setAttribute('src','./particles-bright.html');
        } else {
            iframe.setAttribute('src','./particles-dark.html');
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
async function getApi() {
    const URL='https://fundametos-api-porfolios-dev-exsn.2.ie-1.fl0.io/api/v1/projects';
    try {
        const Data = await fetch(URL);
        const res = await Data.json();
        localStorage.setItem('projects', JSON.stringify(res));
        return res;
    } catch (error) {
        console.log(error);
    }
}
async function database () {
    const db = {
        projects: JSON.parse(localStorage.getItem('projects')) || await getApi(),
    }
    return db;
}
function printProjects (projects) {
    const description = document.querySelectorAll('.splide .splide__slide');
    const URLS = [
                'https://yilbernet-poke-api.netlify.app/',
                'https://yilbernet-rick-and-morty.netlify.app/',
                'https://yilbernet-weather-app.netlify.app/',
                ];
    description.forEach((element, index) => {
        if (projects[index]) {
            const { titulo, descripcion, tecnologias, image} = projects[index];
            let html = `
                <article class="project">
                    <h3>${titulo}</h3>
                    <p><span>Descripción:</span><br>${descripcion}</p>
                    <p><span>Tecnologías:</span><br>${tecnologias}</p>
                </article>
                <a class="project__img" href="${URLS[index]}" target="_blank">
                    <img src="${image}" alt="img slide">
                </a>
            `;
            element.innerHTML = html;
        }
    });
}
function splideJs () {
    let splide = new Splide('.splide', {
        type: 'loop',
        // autoplay: true,
        interval: 3000,
        perPage: 1,
        speed: 1000,
        perMove: 1,
        gap: 10,
        breakpoints: {
            849: {
                direction: 'ttb',
                height: '65vh',  
            },
        },
    });
    splide.mount();
}
async function main () {
    skills();
    sound();
    darkMode();
    socialMedia();
    const db = await database();
    printProjects(db.projects);
    splideJs();
}
main();