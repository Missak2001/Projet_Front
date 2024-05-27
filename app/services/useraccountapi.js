class UserAccountAPI extends BaseAPIService {
    constructor() {
        super("useraccount")
    }
    async register(displayName, login, password, isEnterprise) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');

        try {
            let res = await fetch(`${this.url}/register`, {
                method: "POST",
                headers: this.headers,
                body: `displayName=${displayName}&login=${login}&password=${password}&isEnterprise=${isEnterprise}`
            });
            console.log("Status de la réponse : réussi");
            return res.json();
        } catch (err) {
            console.error("Erreur lors de la requête :", err);
            throw err;
        }
    }

    async authenticate(login, password) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');

        try {
            let res = await fetch(`${this.url}/authenticate`, {
                method: "POST",
                headers: this.headers,
                body: `login=${login}&password=${password}`
            });
            console.log("Status de la réponse : réussi");
            return res.json();
        } catch (err) {
            console.error("Erreur lors de la requête :", err);
            throw err;
        }
    }
}
