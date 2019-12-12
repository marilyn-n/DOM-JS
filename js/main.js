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

const topOfNav = 122;

// functions
const fixNav = () => {
    if (window.scrollY >= topOfNav) {
        nav.classList.remove('d-none');
    }
    if (window.scrollY === 0) {
        nav.classList.add('d-none');
    }
};

const reportWindowSize = () => {
    if (window.innerWidth <= 768) {
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
    if (this.checked) {
        html.classList.add('dark-mode');
    } else {
        html.classList.remove('dark-mode');
    }
}

// hook up events
window.addEventListener('scroll', fixNav);
window.addEventListener('resize', reportWindowSize);
window.onload = reportWindowSize();
window.onload = sortByDate();
window.onload = showSlides(slideIndex);
copyBtn.addEventListener('click', copyToClipboard);
switchBtn.addEventListener('change', handleDarkMode);