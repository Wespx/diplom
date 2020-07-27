const sliderTransparency = () => {
    const sliderWrap = document.querySelector('.transparency-slider-wrap');
    const slides = sliderWrap.querySelectorAll('.transparency-item');
    const arrowLeft = document.getElementById('transparency-arrow_left');
    const arrowRight = document.getElementById('transparency-arrow_right');
    const slidesArr = Array.prototype.slice.call(slides);

    let currentSlide = 0;

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

    arrowLeft.addEventListener('click', () => {
        slidesArr[currentSlide].style.display = 'none';

        if (currentSlide === 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide--;
        }

        slidesArr[currentSlide].style.display = 'flex';
        fadeOut(slidesArr[currentSlide]);
    });

    arrowRight.addEventListener('click', () => {
        slidesArr[currentSlide].style.display = 'none';

        if (currentSlide === slides.length - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }

        slidesArr[currentSlide].style.display = 'flex';
        fadeOut(slidesArr[currentSlide]);
    });
};

export default sliderTransparency;
