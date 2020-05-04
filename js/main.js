// selectors
const nav = document.querySelector('.menu');
const contactMenu = document.querySelector('.get-in-contact');
const projectList = document.querySelector('.projects__list');
const slideShow = document.querySelector('.projects__carrousel');
const slides = document.getElementsByClassName('mySlides');
const dots = document.getElementsByClassName('dot');
const jobList = document.querySelector('.experience__jobs-list');
const jobDates = document.querySelectorAll('[data-date]');
const copyBtn = document.querySelector('.about-me__copy-to-clipboard__gmail--copy');
const switchBtn = document.querySelector('.switch-btn input[type="checkbox"]');
const html = document.querySelector('html');
const alert = document.querySelector('.tip-wrapper__tip');
const cardHeaders = document.querySelectorAll('.a-card--wrapper');

const topOfNav = 122;

// functions
const fixNav = () => window.scrollY >= topOfNav ? nav.classList.remove('d-none') : nav.classList.add('d-none');

const reportWindowSize = () => {
    if (window.innerWidth <= 500) {
        projectList.classList.add('d-none');
        slideShow.classList.remove('d-none');
    } else {
        projectList.classList.remove('d-none');
        slideShow.classList.add('d-none');
    }

};

const sortByDate = () => {
    [...jobDates]
        .sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date))
        .forEach(job => {
            jobList.append(job);
        });
};

let slideIndex = 1;
const showSlides = (n) => {
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    [...slides].map(slide => slide.style.display = 'none');
    [...dots].map(dot => dot.className = dot.className.replace(' active', ''));

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].className += ' active';
};

const currentSlide = (n) => showSlides(slideIndex = n);

const copyToClipboard = () => {
    const input = document.querySelector('input.email-to-clipboard');
    input.select();
    document.execCommand("copy");
}

function handleDarkMode() {
    this.checked ? html.classList.add('dark-mode') : html.classList.remove('dark-mode');
}

const showAlert = () => {
    alert.style.opacity = 1;
    alert.style.transition = 'opacity .25s ease-in-out';
    setTimeout(() => { 
        alert.style.opacity = 0;
    }, 2500);
}

function modal() {
    const cardElement = this.parentElement;
    const cardTitle = cardElement.querySelector('.a-card__body--title span.title');
    const cardTechnologies = cardElement.querySelector('.technologies-used').textContent;
    const cardDetails = cardElement.querySelector('.a-card__body--paragraph').textContent;
    const cardMedia = cardElement.querySelector('.a-card__header--graphic').dataset.media.split(',');
    const cardDemoBtn = cardElement.querySelector('.a-card__actions .demo');
    const cardSourceCodeBtn = cardElement.querySelector('.a-card__actions .source-code');
    
    const modalTitle = document.querySelector('#modalTitle').textContent = `${cardTitle.dataset.title}`;
    const modalDetails = document.querySelector('#modal__details').textContent = `${cardDetails}`;
    
    const mediaItems = cardMedia.map((media, index) => {
        if(index === 0) {
            return`
        <div class="carousel-item active">
            <img src="${media}" id="modal--thumbnail" class="d-block w-100" alt="...">
        </div>
        `;
        } else {
            return`
        <div class="carousel-item">
            <img src="${media}" id="modal--thumbnail" class="d-block w-100" alt="...">
        </div>
        `;
        }
        
    }).join(' ')

    // mediaItems[0].classList.add('active')
    console.log(mediaItems[0]);
    

    

    const modalMedia = document.querySelector('.carousel-inner').innerHTML = `${mediaItems}`;
    const modalDemoBtn = document.querySelector('#demo-btn').setAttribute('href', `${cardDemoBtn.dataset.demoUrl}`);
    const modalSourceBtn = document.querySelector('#source-code-btn').setAttribute('href', `${cardSourceCodeBtn.dataset.sourceCode}`);
    
    const modalTools = cardTechnologies.split(',').map((item) => {
        return `
        <div class="badge badge--clear-sky badge--bordered">
            <span>${item}</span>
        </div>
        `
    }).join(' ')

    document.querySelector('.modal__body--requirements').innerHTML = `${modalTools}`;
}

// hook up events
window.addEventListener('scroll', fixNav);
window.addEventListener('resize', reportWindowSize);
window.onload = reportWindowSize();
window.onload = sortByDate();
window.onload = showSlides(slideIndex);
copyBtn.addEventListener('click', copyToClipboard);
copyBtn.addEventListener('click', showAlert);
switchBtn.addEventListener('change', handleDarkMode);
[...cardHeaders].map(item => item.addEventListener('click', modal));