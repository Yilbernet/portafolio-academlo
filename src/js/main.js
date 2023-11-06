
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
function music () {
    const icon = document.querySelector('.icon__volume ion-icon');
    const mp3 = document.querySelector('.nav__functions audio');
    if (mp3.paused) {
        mp3.play();
        localStorage.setItem('mp3', JSON.stringify('play'));
    } else {
        mp3.pause();
        mp3.currentTime = 0;
        localStorage.setItem('mp3', JSON.stringify('stop'));
    }
    if (icon.name==='volume-mute-sharp') {
        icon.name = 'volume-high-sharp';
    } else {
        icon.name = 'volume-mute-sharp';
    }
}
function sound (mp3) {
    if (mp3==='play') {
        setTimeout(music, 1000);
    }
    const audio = document.querySelector('.icon__volume');
    audio.addEventListener('click', music);
}
function mode () {
    const body = document.querySelector('body');
    body.classList.toggle('dark');
    const icon = document.querySelector('.icon__dark ion-icon');
    if (icon.name==='sunny-sharp') {
        icon.name = 'moon-sharp';
        localStorage.setItem('mode', JSON.stringify('bright'));
    } else {
        icon.name = 'sunny-sharp';
        localStorage.setItem('mode', JSON.stringify('dark'));
    }
    const iframe = document.querySelector('.header iframe');
    iframe.contentWindow.addEventListener('load', ()=>{
        const link = iframe.contentDocument.querySelector('link');
        const href = link.getAttribute('href');
        if (href==='./src/particles/dark.css') {
            link.setAttribute('href', './src/particles/bright.css');
        } else {
            link.setAttribute('href', './src/particles/dark.css');
        }
    });
}
function darkMode (dark) {
    if (dark==='bright') {
        mode();
    }
    const btn = document.querySelector('.icon__dark');
    btn.addEventListener('click', mode);
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
function english (eng) {
    const URL = location.href.split('/').at(-1);
    if (eng!=='esp' && URL!=='english.html') {
        return location.href = '/english.html';
    }
    const icon = document.querySelector('.icon__lang');
    const label = document.querySelector('.icon__lang img');
    const img = label.src.split('/').at(-1);
    icon.addEventListener('click', ()=>{
        if (img==='esp.png') {
            localStorage.setItem('eng', JSON.stringify('esp'));
            return location.href = '/';
        } else {
            localStorage.setItem('eng', JSON.stringify('eng'));
            return location.href = '/english.html';
        }
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
        mp3: JSON.parse(localStorage.getItem('mp3')) || 'stop',
        mode: JSON.parse(localStorage.getItem('mode')) || 'dark',
        eng: JSON.parse(localStorage.getItem('eng')) || 'esp',
    }
    return db;
}
function printProjects (db) {
    const description = document.querySelectorAll('.splide .splide__slide');
    const URLS = [
                'https://yilbernet-poke-api.netlify.app/',
                'https://yilbernet-rick-and-morty.netlify.app/',
                'https://yilbernet-weather-app.netlify.app/',
                ];
    description.forEach((element, index) => {
        if (db.projects[index]) {
            const { titulo, descripcion, tecnologias, image } = db.projects[index];
            const { title, description, technologies } = db.projects[index];
            let html = '';
            if (db.eng === 'esp') {
                html = `
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
            } else {
                html = `
                    <article class="project">
                        <h3>${title}</h3>
                        <p><span>Description:</span><br>${description}</p>
                        <p><span>Technologies:</span><br>${technologies}</p>
                    </article>
                    <a class="project__img" href="${URLS[index]}" target="_blank">
                        <img src="${image}" alt="img slide">
                    </a>
                `;
                element.innerHTML = html;
            }
        }
    });
}
function splideJs () {
    let splide = new Splide('.splide', {
        type: 'loop',
        autoplay: true,
        interval: 5000,
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
    const db = await database();
    skills();
    socialMedia();
    darkMode(db.mode);
    sound(db.mp3);
    english(db.eng);
    printProjects(db);
    splideJs();
}
main();