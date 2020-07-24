const smoothScroll = () => {
    const scrollAnimation = (elem, speed) => {
        const scroll = window.pageYOffset;
        const hash = elem.href.replace(/[^#]*(.*)/, '$1');
        if (hash === '#') return;

        const distance = document.querySelector(hash).getBoundingClientRect().top;
        let start;

        const step = time => {
            if (!start) start = time;
            const progress = time - start;

            const move = (distance < 0 ?
                Math.max(scroll - progress / speed, scroll + distance) :
                Math.min(scroll + progress / speed, scroll + distance));

            window.scrollTo(0, move);

            if (move !== scroll + distance) {
                requestAnimationFrame(step);
            } else {
                location.hash = hash;
            }
        };

        requestAnimationFrame(step);
    };

    document.body.addEventListener('click', e => {
        if (e.target.matches('.menu-link')) {
            e.preventDefault();
            scrollAnimation(e.target, 0.3);
        }

        if (e.target.closest('.button-footer')) {
            e.preventDefault();
            const link = e.target.closest('.button-footer').querySelector('[href]');
            scrollAnimation(link, 0.1);
        }
    });
};

export default smoothScroll;
