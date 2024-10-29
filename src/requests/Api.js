export default class Api {
    //Get запрос
    getRequest = async (url, method = 'GET') => {
        const res = await fetch(url, { method: method });
        return res.json();
    };

    //Post запрос
    sendFormData = async (url, body) => {
        const res = await fetch(url, {
            method: 'POST',
            body: body,
        });
        return res.json();
    };

    sendProcessFinancialValidate = async (changesData) => {
        return await this.sendFormData(`/Process/Financial/Validate`, changesData);
    };

    resendCode = async () => {
        return await this.getRequest(`/Identity/ResendCode`);
    };

    getProcessFinancialSendCode = async () => {
        return await this.getRequest(`/Process/Financial/SendCode`, 'POST');
    };
}
