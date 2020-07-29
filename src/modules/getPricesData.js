const getPricesData = () => {
    const repairTypes = document.querySelector('.popup.popup-repair-types');
    const dateElem = repairTypes.querySelector('.popup-repair-types-content__head-date');
    const navList = repairTypes.querySelector('.nav-list');
    const tableWrap = repairTypes.querySelector('.popup-repair-types-content-table');
    const tableTitle = document.getElementById('switch-inner');

    const createElemPrices = ({ cost, typeService, units }, index) => {
        const elem = `
            <tr class="mobile-row showHide">
                <td class="repair-types-name">${typeService}</td>
                <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
                <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
                <td class="repair-types-value">${units}</td>
                <td class="repair-types-value">${cost} руб.</td>
            </tr>`;
        const tbody = repairTypes.querySelector(`.table${index} tbody`);
        tbody.insertAdjacentHTML('beforeend', elem);
    };

    const createTable = index => {
        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        table.classList.add(`popup-repair-types-content-table__list`);
        table.classList.add(`table${index}`);
        table.insertAdjacentElement('beforeend', tbody);
        tableWrap.insertAdjacentElement('beforeend', table);

        if (index !== 1) table.style.display = 'none';
    };

    const createNavButton = title => {
        navList.insertAdjacentHTML('beforeend', `
            <button class="button_o popup-repair-types-nav__item">${title}</button>`);
    };

    const handleData = data => {
        data.forEach((item, index) => {
            if (item.date) {
                dateElem.textContent = item.date;
            }

            if (item.title) {
                createNavButton(item.title);
                createTable(index);
            }

            if (item.priceList) {
                item.priceList.forEach(type => {
                    const {
                        cost,
                        typeService,
                        units
                    } = type;

                    createElemPrices(type, index);
                });
            }
        });
    };

    const getData = () => {
        return fetch('./db/db.json');
    };

    const eventsListeners = () => {
        const firstBtn = repairTypes.querySelector('.button_o');
        firstBtn.classList.add('active-btn');

        let mobileNavX = 0;

        repairTypes.addEventListener('click', e => {
            const target = e.target;

            if (target.matches('.button_o') && !target.classList.contains('active-btn')) {
                const navBtns = navList.children;
                const navBtnsArr = Array.prototype.slice.call(navBtns);
                const current = navList.querySelector('.active-btn');
                const indexTarget = navBtnsArr.indexOf(target);
                const indexCurrent = navBtnsArr.indexOf(current);
                const tables = tableWrap.querySelectorAll('.popup-repair-types-content-table__list');

                current.classList.remove('active-btn');
                target.classList.add('active-btn');

                tables[indexCurrent].style.display = 'none';
                tables[indexTarget].style.display = '';

                tableTitle.textContent = target.textContent;
            }

            if (target.closest('#nav-arrow-popup-repair_right')) {
                if (mobileNavX > parseFloat(getComputedStyle(navList).width) / 2) return;
                mobileNavX += 150;
                navList.style.transform = `translateX(-${mobileNavX}px)`;
            }

            if (target.closest('#nav-arrow-popup-repair_left')) {
                if (mobileNavX <= 0) return;
                mobileNavX -= 150;
                navList.style.transform = `translateX(-${mobileNavX}px)`;
            }
        });
    };

    getData()
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Status: not 200');
            } else {
                return response.json();
            }
        })
        .then(data => handleData(data))
        .then(data => eventsListeners())
        .catch(error => console.error(error));
};

export default getPricesData;
