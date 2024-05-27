class ProduitController extends BaseFormController {
    constructor() {
        super(false);
        this.svc = new ProduitAPI();
    }

    async registerProduit() {
        let titreP = this.validateRequiredField('#fieldTitre', 'Titre');
        let categorie_p = this.validateRequiredField('#fieldCategorie', 'Categorie');
        let prix_P = this.validateRequiredField('#fieldPrix', 'Prix');

        if (titreP && categorie_p && prix_P) {
            try {
                // Extraire le token JWT du sessionStorage
                const token = sessionStorage.getItem("token");

                // Vérifier si le token est présent
                if (!token) {
                    console.error("Le token est manquant");
                    return;
                }

                // Envoyer le token JWT avec la requête HTTP
                let res = await this.svc.registerProduit(titreP, categorie_p, prix_P, token);
                sessionStorage.setItem("token", token); // Mise à jour du token dans le sessionStorage
                window.location.replace("");
            } catch (err) {
                console.error("Erreur lors de l'enregistrement du produit :", err);
                if (err === 409) {
                    this.toast("Ce produit existe déja");
                } else {
                    this.displayServiceError();
                }
            }
        }
    }
}

window.produitController = new ProduitController();
