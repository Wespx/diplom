const carousel = () => {
    const section = document.getElementById('partners');
    const slider = document.querySelector('.partners-slider');
    const slides = slider.querySelectorAll('.partners-slider__slide');
    const arrowLeft = document.getElementById('partners-arrow_left');
    const arrowRight = document.getElementById('partners-arrow_right');

    let sliderWidth = parseFloat(getComputedStyle(slider).width);
    const screenWidth = () => window.innerWidth;
    let slidesToShow = screenWidth() > 1200 ? 3 :
        screenWidth() <= 1200 && screenWidth() >= 768 ? 2 : 1;

    slides.forEach(elem => {
        elem.style.minWidth = sliderWidth / slidesToShow + 'px';
    });

    let itemWidth = parseFloat(getComputedStyle(slides[0]).width);
    let transform = 0;
    let direction = 'right';

    const checkEnd = () => {
        if (transform <= -((slides.length - slidesToShow) * itemWidth) && slidesToShow !== 2) {
            arrowRight.style.display = 'none';
        } else if (transform <= -((slides.length - slidesToShow - 0.5) * itemWidth) && slidesToShow === 2) {
            arrowRight.style.display = 'none';
        } else {
            arrowRight.style.display = 'flex';
        }

        if (transform >= 0) {
            arrowLeft.style.display = 'none';
        } else {
            arrowLeft.style.display = 'flex';
        }
    };

    checkEnd();

    const goRight = () => {
        slider.style.transform = `translateX(-${itemWidth + Math.abs(transform)}px)`;
        transform = parseFloat(slider.style.transform.replace(/[^0-9-]+/, ''));
        checkEnd();
    };

    const goLeft = () => {
        slider.style.transform = `translateX(-${Math.abs(transform) - itemWidth}px)`;
        transform = parseFloat(slider.style.transform.replace(/[^0-9-]+/, ''));
        checkEnd();
    };

    const autoPlay = () => {
        if (direction === 'right' && arrowRight.style.display !== 'none') {
            goRight();
        } else {
            direction = 'left';
        }

        if (direction === 'left' && arrowLeft.style.display !== 'none') {
            goLeft();
        } else {
            direction = 'right';
        }
    };

    let interval;

    const startCarousel = () => {
        interval = setInterval(autoPlay, 2000);
    };

    const stopCarousel = () => {
        clearInterval(interval);
    };

    const reset = () => {
        sliderWidth = parseFloat(getComputedStyle(slider).width);
        slidesToShow = screenWidth() > 1200 ? 3 :
            screenWidth() <= 1200 && screenWidth() >= 768 ? 2 : 1;
        itemWidth = parseFloat(getComputedStyle(slides[0]).width);
        transform = 0;

        slides.forEach(elem => {
            elem.style.minWidth = sliderWidth / slidesToShow + 'px';
        });

        arrowLeft.style.display = 'none';
        arrowRight.style.display = 'flex';

        stopCarousel();

        slider.style.transform = 'translateX(0)';
    };

    arrowRight.addEventListener('click', goRight);

    arrowLeft.addEventListener('click', goLeft);

    section.addEventListener('mouseover', e => {
        if (e.target === arrowRight || e.target === arrowLeft) {
            stopCarousel();
        }
    });

    section.addEventListener('mouseout', e => {
        if (e.target === arrowRight || e.target === arrowLeft) {
            startCarousel();
        }
    });

    window.addEventListener('resize', reset);

    setTimeout(startCarousel, 2000);
};

export default carousel;
