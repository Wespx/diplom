const accordeon = () => {
    const wrapper = document.querySelector('.accordion');

    wrapper.addEventListener('click', e => {
        const target = e.target;

        if (target.matches('.title_block')) {
            if (target.classList.contains('msg-active')) {
                target.classList.remove('msg-active');
            } else {
                const prevActive = wrapper.querySelector('.msg-active');
                if (prevActive) prevActive.classList.remove('msg-active');
                target.classList.add('msg-active');
            }
        }
    });
};

export default accordeon;
