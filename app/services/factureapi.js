class FactureAPI extends BaseAPIService {
    constructor() {
        super("facture");
    }

    registerFacture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f) {
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('Authorization', `Bearer ${sessionStorage.getItem("token")}`);

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/registerFacture`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ titre, categorie_f, prix_f, statut, adresse_facturation, produit_f })
            })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    getAllProduits() {
        return fetchJSON(`${this.url}/produit`, this.token);
    }
}
