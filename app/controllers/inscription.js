class InscriptionController extends BaseFormController {
    constructor() {
        super(false)
        this.svc = new UserAccountAPI()
    }

    async register() {
        let displayName = this.validateRequiredField('#fieldDisplayName', 'Pseudo');
        let login = this.validateRequiredField('#fieldLogin', 'Login');
        let password = this.validateRequiredField('#fieldPassword', 'Password');
        let isEnterprise = document.getElementById('userType').value === "entreprise"; // Convertit la valeur en un type boolean

        if (displayName && login && password && typeof isEnterprise === "boolean") {
            try {
                let res = await this.svc.register(displayName, login, password, isEnterprise);
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
