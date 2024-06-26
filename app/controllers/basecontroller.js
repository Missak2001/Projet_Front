class BaseController {
    constructor(secured) {
        if (secured) {
            this.checkAuthentication();
        }
        document.addEventListener('DOMContentLoaded', () => {
            M.AutoInit();
        });
        this.setBackButtonView('index');
    }

    checkAuthentication() {
        if (sessionStorage.getItem("token") === null) {
            window.location.replace("login.html");
        }
    }

    toast(msg) {
        M.toast({html: msg, classes: 'rounded'});
    }

    displayServiceError() {
        this.toast('Login ou mot de passe incorrect');
    }

    setBackButtonView(view) {
        window.onpopstate = function() {
            navigate(view);
        };
        history.pushState({}, '');
    }
}
