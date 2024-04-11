class ProduitAPI extends BaseAPIService {
    constructor() {
        super("produit")
    }
    registerProduit(titreP, categorie_p, prix_P) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/registerProduit`, {
                method: "POST",
                headers: this.headers,
                body: `titreP=${titreP}&categorie_p=${categorie_p}&prix_P=${prix_P}`
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