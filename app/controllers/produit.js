class ProduitController extends BaseFormController {
    constructor() {
        super(false);
        this.svc = new ProduitAPI();
    }

    async registerProduit() {
        let titrep = this.validateRequiredField('#fieldTitre', 'Titre');
        let categorie_p = this.validateRequiredField('#fieldCategorie', 'Categorie');
        let prix_p = this.validateRequiredField('#fieldPrix', 'Prix');

        if (titrep && categorie_p && prix_p) {
            try {
                const token = sessionStorage.getItem("token");
                if (!token) {
                    console.error("Le token est manquant");
                    return;
                }

                let res = await this.svc.registerProduit(titrep, categorie_p, prix_p, token);
                window.location.replace("");
            } catch (err) {
                console.error("Erreur lors de l'enregistrement du produit :", err);
                if (err === 409) {
                    this.toast("Ce produit existe déjà");
                } else {
                    this.displayServiceError();
                }
            }
        }
    }

    async loadProduits() {
        try {
            const produits = await this.svc.getProduitsWithUser();
            let produitsList = document.getElementById('produitsList');
            produitsList.innerHTML = produits.map(produit => `
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">${produit.titrep}</span>
                        <p>Catégorie: ${produit.categorie_p}</p>
                        <p>Prix: ${produit.prix_p}</p>
                        <p>Utilisateur: ${produit.displayName}</p>
                    </div>
                </div>
            `).join('');
        } catch (err) {
            console.error("Erreur lors du chargement des produits :", err);
        }
    }
}

window.produitController = new ProduitController();
