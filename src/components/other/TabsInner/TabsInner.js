import { fadeIn } from '../../../utils/utils';
import './tabsInner.scss';

export default class Tabs {
    constructor(tabs) {
        this.$tab = tabs;
        this.$tabName = this.$tab.querySelectorAll('.js-tabs-inner-name');
        this.$tabItem = this.$tab.querySelectorAll('.js-tabs-inner-item');

        this.init();
    }

    init() {
        this.$tabName.forEach((name, index) => {
            name.setAttribute('data-tab-index', `${index}`);
            name.addEventListener('click', this.changeTab.bind(this));
        });
        this.openTabItem(0);
    }

    changeTab(e) {
        const targetTab = e.target.closest('.js-tabs-inner-name');
        const blockNumber = targetTab.getAttribute('data-tab-index');

        this.$tabName.forEach((name) => {
            name.classList.remove('active');
        });

        targetTab.classList.add('active');

        this.openTabItem(blockNumber);
    }

    openTabItem(blockNumber) {
        this.$tabItem.forEach((item) => {
            // item.classList.remove('active');
            item.style.display = 'none';
        });
        fadeIn(this.$tabItem[blockNumber], 500);
        // this.$tabItem[blockNumber].classList.add('active');
    }
}
