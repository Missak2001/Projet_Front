class UserAccountAPI extends BaseAPIService {
    constructor() {
        super("useraccount")
    }
    authenticate(login, password) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/authenticate`, {
                method: "POST",
                headers: this.headers,
                body: `login=${login}&password=${password}`
            })
                .then(res => {
                    console.log("Status de la réponse : reussi");
                    return res.json();
                })
                .then(data => {
                    console.log("Données de la réponse :", data);
                    resolve(data);
                })
                .catch(err => {
                    console.error("Erreur lors de la requête :", err);
                    reject(err);
                });
        });
    }

    register(displayName, login, password, isEnterprise) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/register`, {
                method: "POST",
                headers: this.headers,
                body: `displayName=${displayName}&login=${login}&password=${password}&isEnterprise=${isEnterprise}`
            })
                .then(res => {
                    console.log("Status de la réponse : réussi");
                    return res.json();
                })
                .then(data => {
                    console.log("Données de la réponse :", data);
                    resolve(data);
                })
                .catch(err => {
                    console.error("Erreur lors de la requête :", err);
                    reject(err);
                });
        });
    }


}
