const sliderRepair = () => {
    const slider = document.querySelector('.repair-types-slider');
    const counterCurrent = document.querySelector('.slider-counter-content__current');
    const counterTotal = document.querySelector('.slider-counter-content__total');
    const arrowLeft = document.getElementById('repair-types-arrow_left');
    const arrowRight = document.getElementById('repair-types-arrow_right');
    const arrowLeftMobile = document.getElementById('nav-arrow-repair-left_base');
    const arrowRightMobile = document.getElementById('nav-arrow-repair-right_base');
    const navList = document.querySelector('.nav-list-repair');
    const types = slider.children;
    let numType = 0;
    let slides = types[numType].children;
    let numSlide = 1;
    let mobileNavX = 0;

    counterTotal.textContent = slides.length;

    arrowRight.addEventListener('click', () => {
        if (numSlide === parseInt(counterTotal.textContent)) return;

        const slideHeight = types[numType].offsetHeight / slides.length;
        const pos = types[numType].style.transform === '' ? 0 :
            parseFloat(types[numType].style.transform.replace(/[^0-9-]+/, ''));

        numSlide++;
        counterCurrent.textContent = numSlide;

        types[numType].style.cssText = `transform: translateY(-${slideHeight - pos}px); transition: transform, 1s;`;
    });

    arrowLeft.addEventListener('click', () => {
        if (numSlide === 1) return;

        const slideHeight = types[numType].offsetHeight / slides.length;
        const pos = types[numType].style.transform === '' ? 0 :
            parseFloat(types[numType].style.transform.replace(/[^0-9-]+/, ''));

        numSlide--;
        counterCurrent.textContent = numSlide;

        types[numType].style.cssText = `transform: translateY(${slideHeight + pos}px); transition: transform, 1s;`;
    });

    arrowRightMobile.addEventListener('click', () => {
        if (mobileNavX > 700) return;
        mobileNavX += 150;
        navList.style.transform = `translateX(-${mobileNavX}px)`;
    });

    arrowLeftMobile.addEventListener('click', () => {
        if (mobileNavX <= 0) return;
        mobileNavX -= 150;
        navList.style.transform = `translateX(-${mobileNavX}px)`;
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            navList.style.transform = `translateX(0)`;
        }
    });

    navList.addEventListener('click', e => {
        if (e.target.matches('.button_o') && !e.target.classList.contains('active')) {
            navList.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');
            numType = parseInt(e.target.classList.value.replace(/\D+/, '')) - 1;

            for (let i = 0; i < types.length; i++) {
                if (parseInt(types[i].classList.value.replace(/\D+/, '')) - 1 !== numType) {
                    types[i].style.display = 'none';
                }
            }
            slides = types[numType].children;
            types[numType].style.display = '';
            types[numType].style.cssText = `transform: translateY(0); transition: transform, 1s;`;
            numSlide = 1;
            counterTotal.textContent = slides.length;
            counterCurrent.textContent = 1;
        }
    });
};

export default sliderRepair;
