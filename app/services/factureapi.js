// // class FactureAPI extends BaseAPIService {
// //     constructor() {
// //         super("facture");
// //     }
// //
// //     registerFacture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f,token) {
// //         console.log("Token reçu dans la requête :", token);
// //         this.headers.set('Content-Type', 'application/json');
// //         this.headers.set('Authorization', `Bearer ${sessionStorage.getItem("token")}`);
// //
// //         return new Promise((resolve, reject) => {
// //             fetch(`${this.url}/registerFacture`, {
// //                 method: "POST",
// //                 headers: this.headers,
// //                 body: JSON.stringify({ titre, categorie_f, prix_f, statut, adresse_facturation, produit_f })
// //             })
// //                 .then(res => res.json())
// //                 .then(data => resolve(data))
// //                 .catch(err => reject(err));
// //         });
// //     }
// //
// //     getAllProduits() {
// //         return fetchJSON(`${this.url}/produit`, this.token);
// //     }
// // }
// class FactureAPI extends BaseAPIService {
//     constructor() {
//         super("facture");
//     }
//
//     registerFacture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f, prix_ttc, token) {
//         console.log("Token reçu dans la requête :", token);
//         this.headers.set('Content-Type', 'application/json');
//         this.headers.set('Authorization', `Bearer ${token}`);
//
//         return new Promise((resolve, reject) => {
//             fetch(`${this.url}/registerFacture`, {
//                 method: "POST",
//                 headers: this.headers,
//                 body: JSON.stringify({ titre, categorie_f, prix_f, statut, adresse_facturation, produit_f, prix_ttc })
//             })
//                 .then(res => res.json())
//                 .then(data => resolve(data))
//                 .catch(err => reject(err));
//         });
//     }
//
//     getAllProduits() {
//         return fetchJSON(`${this.url}/produit`, this.token);
//     }
//
//     getFacturesByUser(token) {
//         return fetchJSON(`${this.url}/user`, token);
//     }
//
//     deleteFacture(factureId, token) {
//         this.headers.set('Authorization', `Bearer ${token}`);
//
//         return new Promise((resolve, reject) => {
//             fetch(`${this.url}/${factureId}`, {
//                 method: "DELETE",
//                 headers: this.headers
//             })
//                 .then(res => {
//                     if (res.ok) {
//                         resolve();
//                     } else {
//                         reject(res.status);
//                     }
//                 })
//                 .catch(err => reject(err));
//         });
//     }
// }
class FactureAPI extends BaseAPIService {
    constructor() {
        super("facture");
    }

    registerFacture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f, prix_ttc, token) {
        console.log("Token reçu dans la requête :", token);
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('Authorization', `Bearer ${token}`);

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/registerFacture`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ titre, categorie_f, prix_f, statut, adresse_facturation, produit_f, prix_ttc })
            })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    getAllProduits() {
        return fetchJSON(`${this.url}/produit`, this.token);
    }

    getFacturesByUser(token) {
        return fetchJSON(`${this.url}/user`, token);
    }

    deleteFacture(factureId, token) {
        this.headers.set('Authorization', `Bearer ${token}`);

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/${factureId}`, {
                method: "DELETE",
                headers: this.headers
            })
                .then(res => {
                    if (res.ok) {
                        resolve();
                    } else {
                        reject(res.status);
                    }
                })
                .catch(err => reject(err));
        });
    }

    getFacturePDF(factureId, token) {
        this.headers.set('Authorization', `Bearer ${token}`);
        return fetch(`${this.url}/pdf/${factureId}`, {
            method: 'GET',
            headers: this.headers,
        }).then(res => res.blob());
    }

    getFactureById(factureId, token) {
        this.headers.set('Authorization', `Bearer ${token}`);
        return fetch(`${this.url}/${factureId}`, {
            method: 'GET',
            headers: this.headers,
        }).then(res => {
            if (!res.ok) {
                return res.text().then(text => {
                    throw new Error(`Erreur du serveur: ${text}`);
                });
            }
            return res.json();
        });
    }
}
