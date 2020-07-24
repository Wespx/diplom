const toggleTel = () => {
    const arrow = document.querySelector('.header-contacts__arrow');
    const arrowImg = arrow.querySelector('.header-arrow');
    const addTelContainer = document.querySelector('.header-contacts__phone-number-accord');
    const addTel = addTelContainer.querySelector('.header-contacts__phone-number');

    arrow.addEventListener('click', () => {
        arrowImg.classList.toggle('arrow-active');

        if (arrowImg.classList.contains('arrow-active')) {
            addTelContainer.style.position = 'static';
            addTel.style.opacity = 1;
            addTel.style.transition = '0.8s';
        } else {
            addTelContainer.style.position = 'absolute';
            addTel.style.opacity = 0;
            addTel.style.transition = 'none';
        }
    });
};

export default toggleTel;
