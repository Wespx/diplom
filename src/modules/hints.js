const hints = () => {
    const formula = document.getElementById('formula');
    const problems = document.getElementById('problems');
    const formulaMobileWrapper = document.querySelector('.formula-slider-wrap');
    const screenWidth = window.innerWidth;

    const showHideHints = (event, type) => {
        const target = event.target;

        if (target.closest(`.${type}-item__icon`)) {
            const parent = target.closest(`.${type}-item`);
            const hint = parent.querySelector(`.${type}-item-popup`);
            const icon = parent.querySelector(`.${type}-item__icon-inner`);
            const distanceToTop = target.getBoundingClientRect().top;

            hint.style.visibility = 'visible';
            hint.style.opacity = 1;
            hint.style.color = '#000';
            icon.style.opacity = 1;
            icon.style.background = 'linear-gradient(90deg, #F48922 0%, #FFB015 100%)';
            parent.style.zIndex = 10;
            target.style.color = '#fff';


            if (distanceToTop < 220 && screenWidth > 1024) {
                hint.classList.add(`${type}-item-popup-bottom`);
                hint.style.bottom = '-200px';
                const distanceBetween = hint.offsetTop - icon.offsetTop - icon.offsetHeight;

                if (distanceBetween < 75) {
                    hint.style.bottom = parseInt(hint.style.bottom) - 90 + distanceBetween + 'px';
                }
            } else {
                hint.classList.remove(`${type}-item-popup-bottom`);
                hint.style.bottom = '90px';
            }

            const hidehint = () => {
                hint.style.visibility = 'hidden';
                hint.style.opacity = 0.4;
                icon.style.color = '#000';
                icon.style.background = 'transparent';
                parent.style.zIndex = 1;
                target.style.color = '#000';
                parent.removeEventListener('mouseout', hidehint);
            };

            parent.addEventListener('mouseout', hidehint);
        }
    };

    const mobileSliderFormula = () => {
        const slider = formulaMobileWrapper.querySelector('.formula-slider');
        const slides = formulaMobileWrapper.querySelectorAll('.formula-slider__slide');
        const arrowLeft = document.getElementById('formula-arrow_left');
        const arrowRight = document.getElementById('formula-arrow_right');
        const wrapperWidth = parseFloat(getComputedStyle(formulaMobileWrapper).width);
        const itemWidth = parseFloat(getComputedStyle(slides[0]).width);

        let positionLeftItem = 0;
        let transform = 0;
        const step = (screenWidth >= 768 && screenWidth <= 1024) ? 50 : 100;
        const slidesArr = [];

        if (screenWidth < 768) {
            slides.forEach((item, index) => {
                slidesArr.push({ item, position: index, transform: 0 });
                item.style.minWidth = `${wrapperWidth}px`;
            });
        }

        if (screenWidth >= 768 && screenWidth <= 1024) {
            slides.forEach((item, index) => {
                slidesArr.push({ item, position: index, transform: 0 });
                item.style.minWidth = `${wrapperWidth / 2}px`;
            });
        }

        const position = {
            getItemMin: () => {
                let indexItem = 0;
                slidesArr.forEach((item, index) => {
                    if (item.position < slidesArr[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getItemMax: () => {
                let indexItem = 0;
                slidesArr.forEach((item, index) => {
                    if (item.position > slidesArr[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getMin: () => {
                return slidesArr[position.getItemMin()].position;
            },
            getMax: () => {
                return slidesArr[position.getItemMax()].position;
            }
        };

        const transformItem = direction => {
            let nextItem;
            let nextItem2;
            if (direction === 'right') {
                positionLeftItem++;

                if ((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
                    nextItem = position.getItemMin();
                    slidesArr[nextItem].position = position.getMax() + 1;
                    slidesArr[nextItem].transform += slidesArr.length * 100;
                    slidesArr[nextItem].item.style.transform = 'translateX(' + slidesArr[nextItem].transform + '%)';

                    if (screenWidth >= 768 && screenWidth <= 1024) {
                        nextItem2 = position.getItemMin();
                        slidesArr[nextItem2].position = position.getMax() + 1;
                        slidesArr[nextItem2].transform += slidesArr.length * 100;
                        slidesArr[nextItem2].item.style.transform = 'translateX(' + slidesArr[nextItem2].transform + '%)';
                    }
                }

                transform -= step;
            }

            if (direction === 'left') {
                positionLeftItem--;

                if (positionLeftItem < position.getMin()) {
                    nextItem = position.getItemMax();
                    slidesArr[nextItem].position = position.getMin() - 1;
                    slidesArr[nextItem].transform -= slidesArr.length * 100;
                    slidesArr[nextItem].item.style.transform = 'translateX(' + slidesArr[nextItem].transform + '%)';

                    if (screenWidth >= 768 && screenWidth <= 1024) {
                        nextItem2 = position.getItemMax();
                        slidesArr[nextItem2].position = position.getMin() - 1;
                        slidesArr[nextItem2].transform -= slidesArr.length * 100;
                        slidesArr[nextItem2].item.style.transform = 'translateX(' + slidesArr[nextItem2].transform + '%)';
                    }
                }

                transform += step;
            }

            slider.style.transform = 'translateX(' + transform + '%)';
            slider.style.transition = 'transform, 0.6s';
        };

        arrowLeft.addEventListener('click', () => {
            transformItem('left');
        });

        arrowRight.addEventListener('click', () => {
            transformItem('right');
        });
    };

    const mobileSliderProblems = () => {
        const arrowLeft = document.getElementById('problems-arrow_left');
        const arrowRight = document.getElementById('problems-arrow_right');
        const problemsSlider = problems.querySelector('.problems-slider');
        const slides = problemsSlider.querySelectorAll('.problems-slider__slide');
        const activeSlide = 'active-item';
        let currentSlide = 0;

        const checkActive = () => {
            slides.forEach(slide => {
                if (slide.classList.contains(activeSlide)) {
                    slide.style.display = 'flex';
                } else {
                    slide.style.display = 'none';
                }
            });
        };

        checkActive();

        arrowLeft.addEventListener('click', () => {
            slides[currentSlide].classList.remove(activeSlide);

            if (currentSlide === 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide--;
            }

            slides[currentSlide].classList.add(activeSlide);
            checkActive();
        });

        arrowRight.addEventListener('click', () => {
            slides[currentSlide].classList.remove(activeSlide);

            if (currentSlide === slides.length - 1) {
                currentSlide = 0;
            } else {
                currentSlide++;
            }

            slides[currentSlide].classList.add(activeSlide);
            checkActive();
        });
    };

    formula.addEventListener('mouseover', e => {
        showHideHints(e, 'formula');
    });

    problems.addEventListener('mouseover', e => {
        showHideHints(e, 'problems');
    });

    mobileSliderFormula();
    mobileSliderProblems();
};

export default hints;
