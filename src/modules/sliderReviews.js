const sliderReviews = () => {
    const slider = document.querySelector('.reviews-slider');
    const slides = slider.querySelectorAll('.reviews-slider__slide');
    const arrowLeft = document.getElementById('reviews-arrow_left');
    const arrowRight = document.getElementById('reviews-arrow_right');

    let numSlide = 0;

    const checkNumSlide = () => {
        if (numSlide === 0) {
            arrowLeft.style.display = 'none';
        } else {
            arrowLeft.style.display = 'flex';
        }

        if (numSlide === slides.length - 1) {
            arrowRight.style.display = 'none';
        } else {
            arrowRight.style.display = 'flex';
        }
    };

    checkNumSlide();

    arrowLeft.addEventListener('click', () => {
        const slideHeight = slides[numSlide].offsetHeight;
        const pos = slides[numSlide].style.transform === '' ? 0 :
            parseFloat(slides[numSlide].style.transform.replace(/[^0-9-]+/, ''));

        numSlide--;
        checkNumSlide();

        slides.forEach(slide => {
            slide.style.cssText = `transform: translateY(${slideHeight + pos}px); transition: transform, 1s;`;
        });
    });

    arrowRight.addEventListener('click', () => {
        const slideHeight = slides[numSlide].offsetHeight;
        const pos = slides[numSlide].style.transform === '' ? 0 :
            parseFloat(slides[numSlide].style.transform.replace(/[^0-9-]+/, ''));

        numSlide++;
        checkNumSlide();

        slides.forEach(slide => {
            slide.style.cssText = `transform: translateY(-${slideHeight - pos}px); transition: transform, 1s;`;
        });
    });
};

export default sliderReviews;
