// class UserAccountAPI extends BaseAPIService {
//     constructor() {
//         super("useraccount")
//     }
//     authenticate(login, password) {
//         this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
//         return new Promise((resolve, reject) => {
//             fetch(`${this.url}/authenticate`, {
//                 method: "POST",
//                 headers: this.headers,
//                 body: `login=${login}&password=${password}`
//             })
//                 .then(res => {
//                     console.log("Status de la réponse : reussi");
//                     return res.json();
//                 })
//                 .then(data => {
//                     console.log("Données de la réponse :", data);
//                     resolve(data);
//                 })
//                 .catch(err => {
//                     console.error("Erreur lors de la requête :", err);
//                     reject(err);
//                 });
//         });
//     }
//
//     async register(displayName, login, password, isEnterprise, role = "user") {
//         this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
//
//         return new Promise((resolve, reject) => {
//             fetch(`${this.url}/register`, {
//                 method: "POST",
//                 headers: this.headers,
//                 body: `displayName=${encodeURIComponent(displayName)}&login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}&isEnterprise=${isEnterprise}&role=${role}`
//             })
//                 .then(res => {
//                     console.log("Status de la réponse : réussi");
//                     return res.json();
//                 })
//                 .then(data => {
//                     console.log("Données de la réponse :", data);
//                     resolve(data);
//                 })
//                 .catch(err => {
//                     console.error("Erreur lors de la requête :", err);
//                     reject(err);
//                 });
//         });
//     }
//
//
// }
class UserAccountAPI extends BaseAPIService {
    constructor() {
        const API_BASE = window.location.hostname.includes("localhost")
            ? "http://localhost:3333"
            : "https://projetback-production.up.railway.app";
        super(`${API_BASE}/useraccount`);
    }

    async authenticate(login, password) {
        const res = await fetch(`${this.url}/authenticate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, password })
        });

        if (!res.ok) throw new Error("Authentification échouée");

        return await res.json();
    }

    async register(displayName, login, password, isEnterprise, role = "user") {
        const res = await fetch(`${this.url}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ displayName, login, password, isEnterprise, role })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err?.error || "Erreur d'inscription");
        }

        return await res.json();
    }
}
