class InscriptionController extends BaseFormController {
    constructor() {
        super(false)
        this.svc = new UserAccountAPI()
    }

    async register() {
        let displayName = this.validateRequiredField('#fieldDisplayName', 'Pseudo');
        let login = this.validateRequiredField('#fieldLogin', 'Login');
        let password = this.validateRequiredField('#fieldPassword', 'Password');
        let userTypeElement = document.getElementById('userType');
        let isEnterprise = userTypeElement ? userTypeElement.value === "entreprise" : null;
        let role = document.getElementById('roleField')?.value || "user";

        if (displayName && login && password && (isEnterprise === true || isEnterprise === false)) {
            try {
                let res = await this.svc.register(displayName, login, password, isEnterprise, role);
                sessionStorage.setItem("token", res.token);
                window.location.replace("login.html");
            } catch (err) {
                console.error(err);
                if (err === 409) {
                    this.toast("Cette adresse e-mail est déjà utilisée. Veuillez en choisir une autre.");
                } else {
                    this.displayServiceError();
                }
            }
        }
    }
}

window.inscriptionController = new InscriptionController();