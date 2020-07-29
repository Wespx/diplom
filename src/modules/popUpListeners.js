const popUpListeners = () => {
    const repairTypes = document.querySelector('.popup.popup-repair-types');
    const privacyPolicy = document.querySelector('.popup.popup-privacy');
    const transparencyItem = document.querySelector('.popup-transparency');
    const portfolio = document.querySelector('.popup.popup-portfolio');
    const consultation = document.querySelector('.popup.popup-consultation');
    const thank = document.querySelector('.popup.popup-thank');

    const portfolioHandler = index => {
        const portfolioTexts = portfolio.querySelectorAll('.popup-portfolio-text');
        const portfolioSlider = portfolio.querySelector('.popup-portfolio-slider');
        const portfolioSlides = portfolioSlider.querySelectorAll('.popup-portfolio-slider__slide');
        const potfolioCounter = document.getElementById('popup-portfolio-counter');
        const arrowLeft = document.getElementById('popup_portfolio_left');
        const arrowRight = document.getElementById('popup_portfolio_right');
        const counterCurrent = potfolioCounter.querySelector('.slider-counter-content__current');
        const counterTotal = potfolioCounter.querySelector('.slider-counter-content__total');
        let currentIndex = index;

        counterCurrent.textContent = currentIndex + 1;
        counterTotal.textContent = portfolioSlides.length;
        portfolio.style.visibility = 'visible';
        portfolioTexts[currentIndex].style.display = 'flex';

        const slider = (numSlide, notransition) => {
            const slideHeight = portfolioSlides[numSlide].offsetHeight;

            const checkNumSlide = () => {
                if (numSlide === 0) {
                    arrowLeft.style.display = 'none';
                } else {
                    arrowLeft.style.display = 'flex';
                }

                if (numSlide === portfolioSlides.length - 1) {
                    arrowRight.style.display = 'none';
                } else {
                    arrowRight.style.display = 'flex';
                }
            };

            checkNumSlide();

            portfolioSlides.forEach(slide => {
                slide.style.transform = `translateY(-${slideHeight * numSlide}px)`;
                if (!notransition) slide.style.transition = `transform, 1s`;
            });
        };

        const toggleSlider = event => {
            const target = event.target;

            if (target.closest('#popup_portfolio_left')) {
                portfolioTexts[currentIndex].style.display = 'none';
                currentIndex--;
                portfolioTexts[currentIndex].style.display = 'flex';
                counterCurrent.textContent = currentIndex + 1;
                slider(currentIndex);
            }

            if (target.closest('#popup_portfolio_right')) {
                portfolioTexts[currentIndex].style.display = 'none';
                currentIndex++;
                portfolioTexts[currentIndex].style.display = 'flex';
                counterCurrent.textContent = currentIndex + 1;
                slider(currentIndex);
            }

            if (target.matches('.close') || target.matches('.popup-portfolio')) {
                portfolioSlides.forEach(slide => slide.style.transition = `none`);
                portfolio.style.visibility = 'hidden';
                portfolioTexts[currentIndex].style.display = 'none';
                portfolio.removeEventListener('click', toggleSlider);
            }
        };

        slider(currentIndex, true);

        portfolio.addEventListener('click', toggleSlider);
    };

    const transparencyHandler = index => {
        const counter = document.getElementById('transparency-popup-counter');
        const counterCurrent = counter.querySelector('.slider-counter-content__current');
        const counterTotal = counter.querySelector('.slider-counter-content__total');
        const slider = document.querySelector('.popup-transparency-slider');
        const slides = slider.querySelectorAll('.popup-transparency-slider__slide');
        let currentIndex = index;

        const fadeOut = item => {
            item.style.opacity = 0;
            let requestId;

            const animation = () => {
                item.style.opacity = parseFloat(item.style.opacity) + 0.02;

                if (item.style.opacity < 1) {
                    requestId = requestAnimationFrame(animation);
                } else {
                    cancelAnimationFrame(requestId);
                }
            };

            animation();
        };

        transparencyItem.style.visibility = 'visible';
        slides[currentIndex].style.display = 'block';
        counterTotal.textContent = slides.length;
        counterCurrent.textContent = currentIndex + 1;

        const toggleSlider = event => {
            const target = event.target;

            if (target.closest('#transparency_left')) {
                slides[currentIndex].style.display = 'none';

                if (currentIndex === 0) {
                    currentIndex = slides.length - 1;
                    slides[currentIndex].style.display = 'block';
                } else {
                    currentIndex--;
                    slides[currentIndex].style.display = 'block';
                }

                fadeOut(slides[currentIndex]);
                counterCurrent.textContent = currentIndex + 1;
            }

            if (target.closest('#transparency_right')) {
                slides[currentIndex].style.display = 'none';

                if (currentIndex === slides.length - 1) {
                    currentIndex = 0;
                    slides[currentIndex].style.display = 'block';
                } else {
                    currentIndex++;
                    slides[currentIndex].style.display = 'block';
                }

                fadeOut(slides[currentIndex]);
                counterCurrent.textContent = currentIndex + 1;
            }

            if (target.matches('.close') || target.matches('.popup-transparency')) {
                slides.forEach(slide => slide.style.display = `none`);
                transparencyItem.style.visibility = 'hidden';
                transparencyItem.removeEventListener('click', toggleSlider);
            }
        };

        transparencyItem.addEventListener('click', toggleSlider);
    };

    document.body.addEventListener('click', e => {
        const target = e.target;

        if (target.textContent.trim() === 'Полный список услуг и цен') {
            repairTypes.style.visibility = 'visible';
        }

        if (target.matches('.link-privacy')) {
            privacyPolicy.style.visibility = 'visible';
        }

        if (target.matches('.transparency-item__img')) {
            const transparencySlider = target.closest('.transparency-slider.row');
            const transparencyItems = transparencySlider.querySelectorAll('.transparency-item');
            const transparencyArr = Array.prototype.slice.call(transparencyItems);
            const indexTarget = transparencyArr.indexOf(target.closest('.transparency-item'));
            transparencyHandler(indexTarget);
        }

        if (target.matches('.portfolio-slider__slide-frame')) {
            const portfolioSlider = target.closest('.portfolio-slider') ?
                target.closest('.portfolio-slider') : target.closest('.portfolio-slider-mobile');
            const portfolioItems = portfolioSlider.querySelectorAll('.portfolio-slider__slide-frame');
            const portfolioArr = Array.prototype.slice.call(portfolioItems);
            const indexTarget = portfolioArr.indexOf(target);
            portfolioHandler(indexTarget);
        }

        if (target.textContent.trim() === 'Проконсультироваться') {
            consultation.style.visibility = 'visible';
        }
    });

    repairTypes.addEventListener('click', e => {
        const target = e.target;

        if (target.matches('.popup.popup-repair-types') || target.matches('.close.mobile-hide')) {
            repairTypes.style.visibility = 'hidden';
        }
    });

    privacyPolicy.addEventListener('click', e => {
        const target = e.target;

        if (target.matches('.popup.popup-privacy') || target.matches('.close.mobile-hide')) {
            privacyPolicy.style.visibility = 'hidden';
        }
    });

    consultation.addEventListener('click', e => {
        const target = e.target;

        if (target.matches('.popup.popup-consultation') || target.matches('.close')) {
            consultation.style.visibility = 'hidden';
        }
    });

    thank.addEventListener('click', e => {
        const target = e.target;

        if (target.matches('.popup.popup-thank') || target.matches('.close')) {
            thank.style.visibility = 'hidden';
        }
    });
};

export default popUpListeners;
