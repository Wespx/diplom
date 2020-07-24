const toggleMenu = () => {
    const burger = document.querySelector('.menu__icon');
    const menu = document.querySelector('.popup-dialog-menu');
    const closeButton = document.querySelector('.close-menu');

    burger.addEventListener('click', () => {
        menu.classList.toggle('dialog-menu-active');
    });

    closeButton.addEventListener('click', () => {
        menu.classList.toggle('dialog-menu-active');
    });

    menu.addEventListener('click', e => {
        const target = e.target;

        if (target.matches('.menu-link')) {
            menu.classList.toggle('dialog-menu-active');
        }
    });
};

export default toggleMenu;
