const popUpListeners = () => {
    const repairTypes = document.querySelector('.popup.popup-repair-types');
    const privacyPolicy = document.querySelector('.popup.popup-privacy');
    const transparencyItem = document.querySelector('.popup-transparency');

    document.body.addEventListener('click', e => {
        const target = e.target;

        if (target.matches('.menu-link') || target.matches('.repair-types-nav__item')) {
            repairTypes.style.visibility = 'visible';
        }

        if (target.matches('.link-privacy')) {
            privacyPolicy.style.visibility = 'visible';
        }

        if (target.matches('.transparency-item__img')) {
            transparencyItem.style.visibility = 'visible';
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
};

export default popUpListeners;
