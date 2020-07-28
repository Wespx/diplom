const tabsDesign = () => {
    const designSection = document.getElementById('designs');
    const navList = document.getElementById('designs-list');
    const designSlider = designSection.querySelector('.designs-slider');
    const slides = designSlider.children;
    const pagination = designSection.querySelectorAll('.preview-block');
    const slidesArr = Array.prototype.slice.call(slides);
    const counter = document.getElementById('designs-counter');
    const counterCurrent = counter.querySelector('.slider-counter-content__current');
    const counterTotal = counter.querySelector('.slider-counter-content__total');

    const designPopUp = document.querySelector('.popup-design');
    const navListPopUp = document.getElementById('nav-list-popup-designs');
    const designPopUpTexts = designPopUp.querySelectorAll('.popup-design-text');
    const designPopUpSlider = designPopUp.querySelector('.popup-design-slider');
    const designPopUpSlides = designPopUpSlider.children;
    const designPopUpSlidesArr = Array.prototype.slice.call(designPopUpSlides);
    const popUpcounter = document.getElementById('popup-designs-counter');
    const popUpcounterCurrent = popUpcounter.querySelector('.slider-counter-content__current');
    const popUpcounterTotal = popUpcounter.querySelector('.slider-counter-content__total');

    let mobileNavX = 0;
    let index = 0;
    let indexInner = 0;
    let indexPopUp = 0;
    let indexInnerPopUp = 0;

    const setCounter = () => {
        counterTotal.textContent = slides[index].children.length;
        counterCurrent.textContent = indexInner + 1;

        popUpcounterTotal.textContent = designPopUpSlides[indexPopUp].children.length;
        popUpcounterCurrent.textContent = indexInnerPopUp + 1;
    };

    setCounter();

    const showHideSlides = type => {
        const arr = (type === 'designs') ? slidesArr : designPopUpSlidesArr;
        const i = (type === 'designs') ? index : indexPopUp;

        arr.forEach(elem => {
            if (elem !== arr[i]) {
                elem.style.display = 'none';
            } else {
                elem.style.display = 'block';
            }
        });

        if (type === 'designs') {
            pagination.forEach(elem => {
                if (elem.classList.contains('visible')) elem.classList.remove('visible');
                if (elem === pagination[i]) elem.classList.add('visible');
            });
        }

        if (type === 'popup') {
            designPopUpTexts.forEach(elem => {
                if (elem.classList.contains('visible-content-block')) elem.classList.remove('visible-content-block');
                if (elem === designPopUpTexts[i]) elem.classList.add('visible-content-block');
            });
        }
    };

    const showInnerSlide = type => {
        const i = (type === 'designs') ? indexInner : indexInnerPopUp;
        const innerSlider = (type === 'designs') ? slides[index] : designPopUpSlides[indexPopUp];
        const innerSlides = innerSlider.children;
        const innerArr = Array.prototype.slice.call(innerSlides);

        innerArr.forEach(item => {
            if (item !== innerArr[i]) {
                item.style.display = 'none';
            } else {
                item.style.display = 'flex';
            }
        });
    };

    document.body.addEventListener('click', e => {
        const target = e.target;

        if (target.closest('#designs .preview-block__item') && !target.classList.contains('preview_active')) {
            const parent = target.closest('.preview-block');
            const items = parent.querySelectorAll('.preview-block__item');

            items.forEach((item, i) => {
                const preview = item.querySelector('.preview-block__item-inner');

                if (preview.classList.contains('preview_active')) {
                    preview.classList.remove('preview_active');
                }

                if (item === target.closest('.preview-block__item')) {
                    preview.classList.add('preview_active');
                    indexInner = i;
                    setCounter();
                }
            });


            showInnerSlide('designs');
        }

        if (target.closest('#nav-arrow-designs_right') ||
            target.closest('#nav-arrow-popup-designs_right')) {
            if (mobileNavX > 700) return;
            mobileNavX += 150;
            navList.style.transform = `translateX(-${mobileNavX}px)`;
            navListPopUp.style.transform = `translateX(-${mobileNavX}px)`;
        }

        if (target.closest('#nav-arrow-designs_left') ||
            target.closest('#nav-arrow-popup-designs_left')) {
            if (mobileNavX <= 0) return;
            mobileNavX -= 150;
            navList.style.transform = `translateX(-${mobileNavX}px)`;
            navListPopUp.style.transform = `translateX(-${mobileNavX}px)`;
        }

        if ((target.matches('#designs-list .button_o') ||
            target.matches('#nav-list-popup-designs .button_o')) && !e.target.classList.contains('active')) {
            const navList = target.parentNode;
            const navBtns = navList.children;
            const navBtnsArr = Array.prototype.slice.call(navBtns);

            navList.querySelector('.active').classList.remove('active');
            target.classList.add('active');

            if (navList === document.getElementById('designs-list')) {
                index = navBtnsArr.indexOf(target);
                indexInner = 0;

                showHideSlides('designs');
                showInnerSlide();
            }

            if (navList === document.getElementById('nav-list-popup-designs')) {
                indexPopUp = navBtnsArr.indexOf(target);
                indexInnerPopUp = 0;

                showHideSlides('popup');
            }

            setCounter();
        }

        if (target.matches('.link-list-designs a')) {
            designPopUp.style.visibility = 'visible';

            const handleDesignPopUp = event => {
                const target = event.target;

                if (target.matches('.close') || target.matches('.popup-design')) {
                    designPopUp.style.visibility = 'hidden';
                    designPopUp.removeEventListener('click', handleDesignPopUp);
                }
            };

            designPopUp.addEventListener('click', handleDesignPopUp);
        }

        if (target.closest('#design_left')) {
            if (indexInner === 0) {
                indexInner = slides[index].children.length - 1;
            } else {
                indexInner--;
            }

            setCounter();
            showInnerSlide('designs');
        }

        if (target.closest('#design_right')) {
            if (indexInner === slides[index].children.length - 1) {
                indexInner = 0;
            } else {
                indexInner++;
            }

            setCounter();
            showInnerSlide('designs');
        }

        if (target.closest('#popup_design_left')) {
            if (indexInnerPopUp === 0) {
                indexInnerPopUp = designPopUpSlides[indexPopUp].children.length - 1;
            } else {
                indexInnerPopUp--;
            }

            setCounter();
            showInnerSlide('popup');
        }

        if (target.closest('#popup_design_right')) {
            if (indexInnerPopUp === designPopUpSlides[indexPopUp].children.length - 1) {
                indexInnerPopUp = 0;
            } else {
                indexInnerPopUp++;
            }

            setCounter();
            showInnerSlide('popup');
        }
    });
};

export default tabsDesign;

