const sliderPortfolio = () => {
    const sliderMobile = () => {
        const sliderMobileElem = document.querySelector('.portfolio-slider-mobile');
        const portfolioCounter = document.getElementById('portfolio-counter');
        const counterTotal = portfolioCounter.querySelector('.slider-counter-content__total');
        const counterCurrent = portfolioCounter.querySelector('.slider-counter-content__current');
        const slidesMobile = sliderMobileElem.querySelectorAll('.portfolio-slider__slide-frame');
        const arrowLeft = document.getElementById('portfolio-arrow-mobile_left');
        const arrowRight = document.getElementById('portfolio-arrow-mobile_right');
        let numSlide = 1;

        counterTotal.textContent = slidesMobile.length;
        arrowLeft.style.display = 'none';

        const checkNumSlide = () => {
            if (numSlide === 1) {
                arrowLeft.style.display = 'none';
            } else {
                arrowLeft.style.display = 'flex';
            }

            if (numSlide === +counterTotal.textContent) {
                arrowRight.style.display = 'none';
            } else {
                arrowRight.style.display = 'flex';
            }
        };

        const slideRight = () => {
            if (numSlide === parseInt(counterTotal.textContent)) return;

            const slideHeight = slidesMobile[numSlide - 1].offsetHeight;
            const pos = slidesMobile[numSlide - 1].style.transform === '' ? 0 :
                parseFloat(slidesMobile[numSlide - 1].style.transform.replace(/[^0-9-]+/, ''));

            numSlide++;
            checkNumSlide();
            counterCurrent.textContent = numSlide;

            slidesMobile.forEach(slide => {
                slide.style.cssText = `
                transform: translateY(-${slideHeight - pos}px);
                transition: transform, 1s;
                `;
            });
        };

        const slideLeft = () => {
            if (numSlide === 1) return;

            const slideHeight = slidesMobile[numSlide - 1].offsetHeight;
            const pos = slidesMobile[numSlide - 1].style.transform === '' ? 0 :
                parseFloat(slidesMobile[numSlide - 1].style.transform.replace(/[^0-9-]+/, ''));

            numSlide--;
            checkNumSlide();
            counterCurrent.textContent = numSlide;

            slidesMobile.forEach(slide => {
                slide.style.cssText = `
                transform: translateY(${slideHeight + pos}px);
                transition: transform, 1s;
                `;
            });
        };

        arrowLeft.addEventListener('click', slideLeft);
        arrowRight.addEventListener('click', slideRight);
    };

    const sliderDesktop = () => {
        const sliderDesktopElem = document.querySelector('.portfolio-slider');
        const arrowRight = document.getElementById('portfolio-arrow_right');
        const arrowLeft = document.getElementById('portfolio-arrow_left');
        const slides = sliderDesktopElem.querySelectorAll('.portfolio-slider__slide.fade-tab');

        const init = () => {
            const slidesToShow = window.innerWidth >= 1025 ? 3 :
                window.innerWidth < 1025 && window.innerWidth >= 901 ? 2 : 1;
            const slidesToScroll = 1;
            const slidesCount = slides.length;
            const slideWidth = sliderDesktopElem.clientWidth / slidesToShow;
            const movePosition = slidesToScroll * slideWidth;

            let position = 0;

            const setPosition = () => {
                slides.forEach(slide => {
                    slide.style.transform = `translateX(${position}px)`;
                    slide.style.transition = `transform, 1s`;
                });
            };

            const checkButtons = () => {
                if (position === 0) {
                    arrowLeft.style.display = 'none';
                } else {
                    arrowLeft.style.display = 'flex';
                }

                if (position <= -(slidesCount - slidesToShow) * slideWidth) {
                    arrowRight.style.display = 'none';
                } else {
                    arrowRight.style.display = 'flex';
                }
            };

            slides.forEach(slide => {
                slide.style.minWidth = `${slideWidth}px`;
            });

            arrowRight.addEventListener('click', () => {
                const slidesLeft = slidesCount - (Math.abs(position) + slidesToShow * slideWidth) / slideWidth;

                position -= slidesLeft >= slidesToScroll ? movePosition : slidesLeft * slideWidth;

                setPosition();
                checkButtons();
            });

            arrowLeft.addEventListener('click', () => {
                const slidesLeft = Math.abs(position) / slideWidth;

                position += slidesLeft >= slidesToScroll ? movePosition : slidesLeft * slideWidth;

                setPosition();
                checkButtons();
            });
        };

        init();

        window.addEventListener('resize', init);
    };

    sliderMobile();
    sliderDesktop();
};

export default sliderPortfolio;
