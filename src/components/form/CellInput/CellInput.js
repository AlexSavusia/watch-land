import { isEmailError, isPasswordError, isTextError } from '../../../utils/validation';
import Cell from '../Cell';
import './cellInput.scss';

export default class CellInput extends Cell {
    constructor($cell, options) {
        super($cell);
        this.$input = this.$cell.querySelector('.js-cell-input');
        this.inputType = this.$input.getAttribute('data-input-type');
        this.currentValue = this.$input.value;
        this.onChange = options?.onChange;

        this.init();
    }

    init() {
        !this.isRequired ? this.$cell.classList.add('js-no-required') : this.$cell.classList.remove('js-no-required');
        this.$input.addEventListener('input', this.changesInput.bind(this));
        this.$input.addEventListener('focus', this.focusInput.bind(this));
        this.$input.addEventListener('blur', this.blurInput.bind(this));
    }

    changesInput() {
        this.removeErrorStatus();
        this.onChange ? this.onChange() : null;
        this.currentValue = this.$input.value;
    }

    focusInput() {
        console.log(111, 'focus input');
    }

    blurInput() {
        console.log(222, 'blur input');
    }

    isInputError(showError = false) {
        const getStatus = () => {
            switch (this.inputType) {
                case 'email':
                    return isEmailError(this.$input);
                case 'password':
                    return isPasswordError(this.$input);
                default:
                    return isTextError(this.$input);
            }
        };
        const isError = this.isRequired ? getStatus() : this.isRequired;

        if (showError && isError && this.isRequired) {
            this.errorStatus();
        }

        return isError;
    }
}
