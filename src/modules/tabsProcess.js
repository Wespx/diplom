const tabsProcess = () => {
    const section = document.getElementById('scheme');
    const navList = document.getElementById('scheme-list');
    const slides = section.querySelectorAll('.scheme-slider__slide');
    const slideTexts = section.querySelectorAll('.scheme-description-block');
    let index = 0;
    let mobileNavX = 0;

    const showHideSlides = () => {
        slides.forEach(elem => {
            if (elem !== slides[index]) {
                elem.style.display = 'none';
            } else {
                elem.style.display = 'block';
            }
        });

        slideTexts.forEach(elem => {
            if (elem !== slideTexts[index]) {
                elem.classList.remove('visible-content-block');
            } else {
                elem.classList.add('visible-content-block');
            }
        });
    };

    section.addEventListener('click', e => {
        const target = e.target;
        if (target.closest('#nav-arrow-scheme_right')) {
            if (mobileNavX > 780) return;
            mobileNavX += 150;
            navList.style.transform = `translateX(-${mobileNavX}px)`;
        }

        if (target.closest('#nav-arrow-scheme_left')) {
            if (mobileNavX <= 0) return;
            mobileNavX -= 150;
            navList.style.transform = `translateX(-${mobileNavX}px)`;
        }

        if (target.matches('#scheme-list .button_o') && !e.target.classList.contains('active')) {
            const navList = target.parentNode;
            const navBtns = navList.children;
            const navBtnsArr = Array.prototype.slice.call(navBtns);

            navList.querySelector('.active').classList.remove('active');
            target.classList.add('active');

            index = navBtnsArr.indexOf(target);

            showHideSlides();
        }
    });
};

export default tabsProcess;
