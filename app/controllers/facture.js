class FactureController extends BaseFormController {
    constructor() {
        super(false)
        this.svc = new FactureAPI();
        this.fetchAndDisplayProducts();
    }

    async registerFacture() {
        let titre = this.validateRequiredField('#fieldTitre', 'Titre');
        let categorie_f = this.validateRequiredField('#fieldCategorie', 'Categorie');
        let prix_f = this.validateRequiredField('#fieldPrix', 'Prix');
        let statut = JSON.parse(document.getElementById('fieldStatut').value);
        let adresse_facturation = this.validateRequiredField('#fieldAdresseFacturation', 'Adresse Facturation');
        let produit_f = this.validateRequiredField('#fieldProduitSelect', 'Produit');

        if (titre && categorie_f && prix_f  && statut !== undefined && adresse_facturation && produit_f ) {
            try {
                let res = await this.svc.registerFacture(titre, categorie_f, prix_f, statut, adresse_facturation, produit_f);
                sessionStorage.setItem("token", res.token);
                window.location.replace("");
            } catch (err) {
                console.error(err);
                if (err === 409) {
                    this.toast("Cette facture existe déjà");
                } else {
                    this.displayServiceError();
                }
            }
        }
    }

    async fetchAndDisplayProducts() {
        try {
            let products = await this.svc.getAllProduits();
            this.displayProducts(products);
        } catch (err) {
            console.error("Erreur lors de la récupération des produits :", err);
            this.displayServiceError();
        }
    }

    displayProducts(products) {
        console.log("Produits récupérés :", products);
        let productListDropdown = document.getElementById('fieldProduitSelect');
        productListDropdown.innerHTML = '';

        products.forEach(product => {
            let option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.titrep;
            productListDropdown.appendChild(option);
        });
    }
}

window.factureController = new FactureController();
