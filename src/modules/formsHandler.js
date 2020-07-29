const formsHandler = () => {
    const maskPhone = (selector, masked = '+7 (___) ___-__-__') => {
        const elems = document.querySelectorAll(selector);

        const mask = event => {
            const keyCode = event.keyCode;
            const template = masked;
            const target = event.target;

            const def = template.replace(/\D/g, '');
            const val = target.value.replace(/\D/g, '');
            let i = 0;
            let newValue = template.replace(/[_\d]/g, a => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
            i = newValue.indexOf('_');

            if (i !== -1) {
                newValue = newValue.slice(0, i);
            }

            let reg = template.substr(0, target.value.length)
                .replace(/_+/g, a => '\\d{1,' + a.length + '}').replace(/[+()]/g, '\\$&');
            reg = new RegExp('^' + reg + '$');

            if (!reg.test(target.value) || target.value.length < 5 || keyCode > 47 && keyCode < 58) {
                target.value = newValue;
            }

            if (event.type === 'blur' && target.value.length < 5) {
                target.value = '';
            }
        };

        for (const elem of elems) {
            elem.addEventListener("input", mask);
            elem.addEventListener("focus", mask);
            elem.addEventListener("blur", mask);

            elem.setAttribute('autocomplete', 'off');
        }
    };

    const validText = selector => {
        const elems = document.querySelectorAll(selector);

        elems.forEach(elem => {
            elem.addEventListener('input', e => {
                const target = e.target;
                const regExp = /[^а-яА-ЯёЁ\s]+$/g;
                target.value = target.value.replace(regExp, '');

                if (regExp.test(e.data) && !!e.data) {
                    target.style.border = 'solid red';
                } else if (target.value.length > 20) {
                    target.value = target.value.substring(0, 20);
                    target.style.border = 'solid red';
                } else {
                    target.style.border = '';
                }
            });

            elem.setAttribute('autocomplete', 'off');
        });
    };

    const sendData = body => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(body)
        });
    };

    maskPhone('[name="phone"]');
    validText('[name="name"');

    document.body.addEventListener('submit', e => {
        e.preventDefault();

        const target = e.target;
        const agreement = target.querySelector('.checkbox__input');
        const agreementText = target.querySelector('.checkbox__descr');
        const agreementLabel = target.querySelector('.checkbox__label');
        const phone = target.querySelector('[name="phone"]');
        const name = target.querySelector('[name="name"');
        const button = target.querySelector('button');
        const buttonText = button.textContent;
        const popUp = document.querySelector('.popup-thank');

        if (phone.value.length !== 18) {
            phone.style.border = '2px solid red';
            setTimeout(() => {
                phone.style.border = '';
            }, 600);
            return;
        }

        if (name && name.value.length < 2) {
            name.style.border = '2px solid red';
            setTimeout(() => {
                name.style.border = '';
            }, 600);
            return;
        }

        if (!agreement.checked) {
            agreementText.style.color = 'red';
            agreementLabel.style.borderColor = 'red';
            setTimeout(() => {
                agreementText.style.color = '';
                agreementLabel.style.borderColor = '';
            }, 600);
            return;
        }

        button.textContent = 'Отправляем данные...';
        const formData = new FormData(target);
        const body = {};

        for (const val of formData.entries()) {
            body[val[0]] = val[1];
        }

        sendData(body)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Status: not 200');
                } else {
                    return response;
                }
            })
            .then(response => {
                button.textContent = buttonText;
                popUp.style.visibility = 'visible';
                target.reset();
            })
            .catch(error => {
                console.error(error);
                button.textContent = 'Произошла ошибка';
                setTimeout(() =>  button.textContent = buttonText, 1500);
            });
    });
};

export default formsHandler;
