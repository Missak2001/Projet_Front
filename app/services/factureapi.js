class FactureAPI extends BaseAPIService {
    constructor() {
        super("facture");
    }

    registerFacture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Authorization', `Bearer ${sessionStorage.getItem("token")}`)

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/registerFacture`, {
                method: "POST",
                headers: this.headers,
                body: `titre=${titre}&categorie_f=${categorie_f}&prix_f=${prix_f}&statut=${statut}&adresse_facturation=${adresse_facturation}&produit_f=${produit_f}`
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

    getAllProduits() {
        return fetchJSON(`${this.url}/produit`, this.token);
    }
}
