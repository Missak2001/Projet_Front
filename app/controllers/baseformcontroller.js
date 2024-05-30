class BaseFormController extends BaseController {
    constructor(secured) {
        super(secured);
    }

    validateRequiredField(selector, name) {
        const value = document.querySelector(selector).value;
        if ((value == null) || (value === "")) {
            this.toast(`Le champ '${name}' est obligatoire`);
            document.querySelector(selector).style.backgroundColor = 'antiquewhite';
            return null;
        }
        return value;
    }
}