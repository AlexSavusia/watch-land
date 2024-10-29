import { fadeIn } from '../../../utils/utils';
import './tabs.scss';

export default class Tabs {
    constructor(tabs) {
        this.$tab = tabs;
        this.$tabName = this.$tab.querySelectorAll('.js-tabs-name');
        this.$tabItem = this.$tab.querySelectorAll('.js-tabs-item');

        this.init();
    }

    init() {
        this.$tabName.forEach((name, index) => {
            name.setAttribute('data-tab-index', `${index}`);
            name.addEventListener('click', this.changeTab.bind(this));
        });

        if (this.$index) {
            this.$tabName.forEach((name) => {
                const attr = name.getAttribute(['data-tab-index']);
                if (attr === '2') {
                    name.classList.add('active');
                } else {
                    name.classList.remove('active');
                }
            });

            this.openTabItem(this.$index);
        }

        // let linkTab = document.querySelector('.js-open-tab')
		// linkTab.addEventListener('click', () => this.openTabItem(1, 1))
		// console.log(this.$tabName)
    }

    changeTab(e) {
        const targetTab = e.target.closest('.js-tabs-name');
        const blockNumber = targetTab.getAttribute('data-tab-index');

        this.$tabName.forEach((name) => {
            name.classList.remove('active');
        });

        targetTab.classList.add('active');

        this.openTabItem(blockNumber);
    }

    openTabItem(blockNumber, index = false) {
        if (index) {
            this.$tabName.forEach((name) => {
                const attr = name.getAttribute(['data-tab-index']);
                if (Number(attr) === index) {
                    name.classList.add('active');
                } else {
                    name.classList.remove('active');
                }
            });
        }

        this.$tabItem.forEach((item) => {
            // item.classList.remove('active');
            item.style.display = 'none';
        });
        fadeIn(this.$tabItem[blockNumber], 500);
        // this.$tabItem[blockNumber].classList.add('active');
    }
}
