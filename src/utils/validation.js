export const isEmailError = (el) => {
    const regRus = /^[а-яё.]+@[а-яё-]+\.[a-яё]{2,10}$/i;

    if (regRus.test(el.value)) {
        // errorBlock.html('email должен быть на английском');
        return true;
    }

    // errorBlock.html('указан не верный email');

    const reg = /^[a-z-._0-9]+@[a-z-._0-9]+\.[a-z0-9]{2,10}$/i;
    return !reg.test(el.value);
};

export const isPasswordError = (el) => {
    // console.log(555, el.value >= 3);
    return el.value <= 3;
};

export const isTextError = (el) => {
    return el.value <= 3;
};
