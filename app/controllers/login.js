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

        if (login && password) {
            try {
                let res = await this.svc.authenticate(login, password);

                // Enregistre le token
                sessionStorage.setItem("token", res.token);

                // ✅ Parse le token pour extraire le rôle
                const userData = this.parseJwt(res.token);
                console.log("🎫 Token payload:", userData); // <- DEBUG: vérifie le contenu

                // Redirige selon le rôle
                if (userData && userData.role === 'admin') {
                    window.location.replace("adminDashboard.html");
                } else {
                    window.location.replace("pageAccueil.html");
                }
            } catch (err) {
                console.error(err);
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
        history.replaceState(null, '', 'login.html');
        window.location.replace("login.html");
    }

    // ✅ Fonction utilitaire pour lire le contenu du token
    parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = decodeURIComponent(atob(base64Url).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join(''));
            return JSON.parse(base64);
        } catch (e) {
            console.error("Erreur parseJwt", e);
            return null;
        }
    }
}

window.loginController = new LoginController();
