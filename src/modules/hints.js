const hints = () => {
    const wrapper = document.querySelector('.wrapper_small');
    const mobileWrapper = document.querySelector('.formula-slider-wrap');

    const showHideHints = event => {
        const target = event.target;

        if (target.matches('.formula-item__icon-inner-text')) {
            const parent = target.closest('.formula-item');
            const hint = parent.querySelector('.formula-item-popup');
            const icon = parent.querySelector('.formula-item__icon-inner');
            const distanceToTop = target.getBoundingClientRect().top;

            hint.style.visibility = 'visible';
            hint.style.opacity = 1;
            icon.style.opacity = 1;
            parent.style.zIndex = 10;
            target.style.color = '#fff';

            if (distanceToTop < 210) {
                hint.classList.add('formula-item-popup-bottom');
                hint.style.bottom = '-200px';
                const distanceBetween = hint.offsetTop - icon.offsetTop - icon.offsetHeight;

                if (distanceBetween < 75) {
                    hint.style.bottom = parseInt(hint.style.bottom) - 90 + distanceBetween + 'px';
                }
            } else {
                hint.classList.remove('formula-item-popup-bottom');
                hint.style.bottom = '90px';
            }

            const hidehint = () => {
                hint.style.visibility = 'hidden';
                hint.style.opacity = 0.4;
                icon.style.opacity = 0;
                parent.style.zIndex = 1;
                target.style.color = '#000';
                parent.removeEventListener('mouseout', hidehint);
            };

            parent.addEventListener('mouseout', hidehint);
        }

        if (target.matches('.formula-item.formula-slider__slide')) {
            const icon = target.querySelector('.formula-item__icon-inner');
            const hint = target.querySelector('.formula-item-popup');
            const bottom = icon.getBoundingClientRect().bottom;
            const screenHeight = document.documentElement.clientHeight;
            const distanceToBottom = screenHeight - bottom;

            hint.style.visibility = 'visible';
            hint.style.opacity = 1;
            icon.style.background = 'linear-gradient(90deg, #F48922 0%, #FFB015 100%)';
            icon.style.color = '#fff';
            target.style.zIndex = 10;

            if (distanceToBottom < 150) {
                hint.classList.add('formula-item-popup-top');
                hint.style.top = '-102px';
                const distanceBetween = icon.offsetTop - hint.offsetTop - hint.offsetHeight;
                console.log(distanceBetween);

                if (distanceBetween < 10) {
                    hint.style.top = parseInt(hint.style.top) - 10 + distanceBetween + 'px';
                }
            } else {
                hint.classList.remove('formula-item-popup-top');
                hint.style.top = '90px';
            }

            const hidehint = () => {
                hint.style.visibility = 'hidden';
                hint.style.opacity = 0.4;
                icon.style.background = 'none';
                target.style.zIndex = 1;
                icon.style.color = '#000';
                target.removeEventListener('mouseout', hidehint);
            };

            target.addEventListener('mouseout', hidehint);
        }
    };

    wrapper.addEventListener('mouseover', e => {
        showHideHints(e);
    });

    mobileWrapper.addEventListener('mouseover', e => {
        showHideHints(e);
    });
};

export default hints;
