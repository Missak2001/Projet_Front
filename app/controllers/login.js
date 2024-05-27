// class LoginController extends BaseFormController {
//     constructor() {
//         super(false);
//         this.svc = new UserAccountAPI();
//     }
//     async authenticate() {
//         let login = this.validateRequiredField('#fieldLogin', 'Adresse e-mail');
//         let password = this.validateRequiredField('#fieldPassword', 'Mot de passe');
//         if ((login != null) && (password != null)) {
//             try {
//                 let res = await this.svc.authenticate(login, password); // Utiliser la méthode authenticate pour l'authentification
//                 sessionStorage.setItem("token", res.token);
//                 // Vider l'historique de navigation après la connexion
//                 history.replaceState(null, '', 'pageAccueil.html');
//                 window.location.replace("pageAccueil.html");
//             } catch (err) {
//                 console.log(err);
//                 if (err === 401) {
//                     this.toast("Adresse e-mail ou mot de passe incorrect");
//                 } else {
//                     this.displayServiceError();
//                 }
//             }
//         }
//     }
//
//     logout() {
//         sessionStorage.removeItem("token");
//         // Vider l'historique de navigation
//         history.replaceState(null, '', 'login.html');
//         window.location.replace("login.html");
//     }
// }
//
// window.loginController = new LoginController();
class LoginController extends BaseFormController {
    constructor() {
        super(false);
        this.svc = new UserAccountAPI();
    }
    async authenticate() {
        let login = this.validateRequiredField('#fieldLogin', 'Adresse e-mail');
        let password = this.validateRequiredField('#fieldPassword', 'Mot de passe');
        if ((login != null) && (password != null)) {
            try {
                let res = await this.svc.authenticate(login, password); // Utiliser la méthode authenticate pour l'authentification
                sessionStorage.setItem("token", res.token);
                // Vider l'historique de navigation après la connexion
                history.replaceState(null, '', 'pageAccueil.html');
                window.location.replace("pageAccueil.html");
            } catch (err) {
                console.log(err);
                if (err === 401) {
                    this.toast("Adresse e-mail ou mot de passe incorrect");
                } else {
                    this.displayServiceError();
                }
            }
        }
    }

    logout() {
        sessionStorage.removeItem("token");
        // Vider l'historique de navigation
        history.replaceState(null, '', 'login.html');
        window.location.replace("login.html");
    }
}

window.loginController = new LoginController();
