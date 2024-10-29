import { dropdownToggle } from '../../../utils/utils';
import Cell from '../Cell';
import './cellSelect.scss';

export default class CellSelect extends Cell {
    constructor($cell, options) {
        super($cell);
        this.$cellSelect = $cell.querySelector('.js-cell-select');
        this.$cellSelectHeader = this.$cellSelect.querySelector('.js-cell-select-header');
        this.$cellSelectBody = this.$cellSelect.querySelector('.js-cell-select-body');
        this.$cellSelectItems = this.$cellSelect.querySelectorAll('.js-cell-select-item');
        this.$cellSelectCurrent = this.$cellSelect.querySelector('.js-cell-select-current');
        this.$cellSelectInput = this.$cellSelect.querySelector('.js-cell-input');
        this.$startValue = this.$cell.querySelector('.js-cell-current-value');
        this.selectedItemIndex;
        this.startValue = this.$cellSelectInput.value;
        this.currentValue = this.startValue;
        this.selectionAction = options?.chosenItem;

        this.init();
    }

    init() {
        this.$cellSelectBody.addEventListener('click', this.choosingValue.bind(this));
        this.$cellSelectHeader.addEventListener('click', this.toggleBody.bind(this));
    }

    toggleBody() {
        this.$cellSelect.classList.toggle('is-active');
        dropdownToggle(this.$cellSelectBody);
    }

    choosingValue(evt) {
        const targetValue = evt.target.textContent.trim();
        console.log(111, evt.target);
        const targetItem = evt.target.classList.contains('js-cell-select-item') ? evt.target : evt.target.closest('.js-cell-select-item');
        const itemValue = targetItem.getAttribute('data-item-value');
        const itemIndex = targetItem.getAttribute('data-index');

        this.$cellSelectItems.forEach((item) => {
            item.classList.remove('is-chosen');
        });

        targetItem.classList.add('is-chosen');
        this.$cellSelectCurrent.textContent = targetValue;
        this.$cellSelectCurrent.style.opacity = 1;
        this.$cellSelectInput.value = itemValue;
        this.currentValue = itemValue;
        this.selectedItemIndex = itemIndex;
        this.toggleBody();
        this.selectionAction ? this.selectionAction() : null;
    }

    isInputError(showError = false) {
        const isError = this.isRequired ? this.$cellSelectInput.value.length === 0 : this.isRequired;

        if (showError && isError && this.isRequired) {
            this.errorStatus();
        }

        return isError;
    }

    unblockSelect() {
        this.removeDisabledStatus();
    }

    blockSelect() {
        this.disabledStatus();
    }
}
