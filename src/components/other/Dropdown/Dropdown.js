import './dropdown.scss';
import { dropdownToggle, dropdownDown } from '../../../utils/utils';

export default class Dropdown {
    constructor($dropdown, index) {
        this.$dropdown = $dropdown;
        this.$dropdownList = this.$dropdown.querySelector('.js-dropdown-list');
        this.$index = index;

        this.init();
    }

    init() {
        const $titles = this.$dropdownList.querySelectorAll('.js-dropdown__title');
        // console.log(this.$index, 'index');

        $titles.forEach(($title) => {
            if ($title.parentElement.classList.contains('active')) {
                this.changeVisibility($title, false);
            }
            $title.addEventListener('click', this.changeVisibility.bind(this, $title));
        });
    }

    openByIndex(index) {
        const $titles = this.$dropdownList.querySelectorAll('.js-dropdown__title');
        $titles.forEach(($title) => {
            const questionIndex = $title.getAttribute(['data-question-index']);

            // if ($title.parentElement.classList.contains('active')) {
            //     $title.click();
            // }

            if (questionIndex === index) {
                if ($title.parentElement.classList.contains('active')) return;
                this.dropdownToggler($title, true);
            }
        });
    }

    changeVisibility($title, changeActive = true) {
        const $dropdownItem = $title.parentElement;
        const $dropdownContent = $dropdownItem.querySelector('.js-dropdown__content');
        const $dropdownLine = $dropdownItem.querySelector('.js-second-line');

        changeActive && $dropdownItem.classList.toggle('active');
        changeActive && $dropdownLine.classList.toggle('active');
        dropdownToggle($dropdownContent);
    }

    dropdownToggler($title, changeActive = true) {
        const $dropdownItem = $title.parentElement;
        const $dropdownContent = $dropdownItem.querySelector('.js-dropdown__content');
        const $dropdownLine = $dropdownItem.querySelector('.js-second-line');

        if (changeActive) {
            changeActive && $dropdownItem.classList.add('active');
            changeActive && $dropdownLine.classList.add('active');
        } else {
            $dropdownItem.classList.remove('active');
            $dropdownLine.classList.remove('active');
        }

        dropdownDown($dropdownContent);
    }
}
