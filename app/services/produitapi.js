class ProduitAPI extends BaseAPIService {
    constructor() {
        super("produit");
        this.headers.set('Content-Type', 'application/json');
    }

    registerProduit(titrep, categorie_p, prix_p, token) {
        this.headers.set('Authorization', `Bearer ${token}`);

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/registerProduit`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ titrep, categorie_p, prix_p })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
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

    getProduitsWithUser() {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}WithUser`, {
                method: "GET",
                headers: this.headers,
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    console.error("Erreur lors de la requête :", err);
                    reject(err);
                });
        });
    }
}
