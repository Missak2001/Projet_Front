class ProduitController extends BaseFormController {
    constructor() {
        super(false)
        this.svc = new ProduitAPI();
        //this.loadProducts();// Appel à une méthode pour charger les produits existants
    }

    async registerProduit() {
        let titreP = this.validateRequiredField('#fieldTitre', 'Titre');
        let categorie_p = this.validateRequiredField('#fieldCategorie', 'Categorie');
        let prix_P = this.validateRequiredField('#fieldPrix', 'Prix');

        if (titreP && categorie_p && prix_P) {
            try {
                let res = await this.svc.registerProduit(titreP, categorie_p, prix_P);
                sessionStorage.setItem("token", res.token);
                window.location.replace("");
            } catch (err) {
                console.error(err);
                if (err === 409) {
                    this.toast("Cette adresse e-mail est déjà utilisée. Veuillez en choisir une autre.");
                } else {
                    this.displayServiceError();
                }
            }
        }
    }
    // async loadProducts() {
    //     try {
    //         const produits = await this.svc.getAllProduits();
    //         this.displayProducts(produits);
    //     } catch (err) {
    //         console.error(err);
    //         this.displayServiceError();
    //     }
    // }
    //
    // displayProducts(produits) {
    //     const produitsList = document.getElementById('produitsList');
    //
    //     produitsList.innerHTML = '';
    //
    //     produits.forEach(produit => {
    //         const produitElement = document.createElement('div');
    //         produitElement.textContent = produit.titrep + ' - ' + produit.categorie_p + ' - ' + produit.prix_p;
    //         produitsList.appendChild(produitElement);
    //     });
    // }
}

window.produitController = new ProduitController();
