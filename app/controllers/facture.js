// class FactureController extends BaseFormController {
//     constructor() {
//         super(false);
//         this.svc = new FactureAPI();
//         this.fetchAndDisplayProducts();
//         this.initStatutSelect();
//         this.initProductSelectListener();
//     }
//
//     async registerFacture() {
//         let titre = this.validateRequiredField('#fieldTitre', 'Titre');
//         let categorie_f = this.validateRequiredField('#fieldCategorie', 'Categorie');
//         let statut = this.validateRequiredField('#fieldStatut', 'Statut');
//         let adresse_facturation = this.validateRequiredField('#fieldAdresseFacturation', 'Adresse Facturation');
//         let produit_f = Array.from(document.querySelectorAll('#fieldProduitSelect option:checked')).map(option => parseInt(option.value, 10));
//
//         let prix_f = document.getElementById('fieldPrix').value;
//
//         if (titre && categorie_f && statut && adresse_facturation && produit_f.length > 0 && prix_f) {
//             try {
//                 let res = await this.svc.registerFacture(titre, categorie_f, parseFloat(prix_f), statut === 'true', adresse_facturation, produit_f);
//                 sessionStorage.setItem("token", res.token);
//                 window.location.replace("");
//             } catch (err) {
//                 console.error(err);
//                 if (err === 409) {
//                     this.toast("Cette facture existe déjà");
//                 } else {
//                     this.displayServiceError();
//                 }
//             }
//         }
//     }
//     async fetchAndDisplayProducts() {
//         try {
//             let products = await this.svc.getAllProduits();
//             this.displayProducts(products);
//         } catch (err) {
//             console.error("Erreur lors de la récupération des produits :", err);
//             this.displayServiceError();
//         }
//     }
//
//     displayProducts(products) {
//         console.log("Produits récupérés :", products);
//         let productListDropdown = document.getElementById('fieldProduitSelect');
//         productListDropdown.innerHTML = '';
//
//         // Ajouter une option par défaut
//         let defaultOption = document.createElement('option');
//         defaultOption.value = '';
//         defaultOption.textContent = 'Sélectionnez un produit';
//         defaultOption.disabled = true;
//         productListDropdown.appendChild(defaultOption);
//
//         products.forEach(product => {
//             let option = document.createElement('option');
//             option.value = product.id;
//             option.dataset.price = product.prix_p; // stocker le prix dans l'attribut data-price
//             option.textContent = `${product.titrep} - ${product.prix_p} €`;
//             productListDropdown.appendChild(option);
//         });
//
//         // Initialisation de Materialize CSS pour le dropdown
//         M.FormSelect.init(productListDropdown);
//     }
//
//     initStatutSelect() {
//         let statutDropdown = document.getElementById('fieldStatut');
//         statutDropdown.innerHTML = '';
//
//         // Ajouter une option par défaut
//         let defaultOption = document.createElement('option');
//         defaultOption.value = '';
//         defaultOption.textContent = 'Sélectionnez un statut';
//         defaultOption.disabled = true;
//         defaultOption.selected = true;
//         statutDropdown.appendChild(defaultOption);
//
//         // Ajouter les options de statut
//         let statutOptions = [
//             { value: 'true', text: 'En cours' },
//             { value: 'false', text: 'Terminée' }
//         ];
//
//         statutOptions.forEach(statut => {
//             let option = document.createElement('option');
//             option.value = statut.value;
//             option.textContent = statut.text;
//             statutDropdown.appendChild(option);
//         });
//
//         // Initialisation de Materialize CSS pour le dropdown
//         M.FormSelect.init(statutDropdown);
//     }
//
//     initProductSelectListener() {
//         const productSelect = document.getElementById('fieldProduitSelect');
//         productSelect.addEventListener('change', () => this.updateTotalPrice());
//     }
//
//     updateTotalPrice() {
//         const selectedOptions = Array.from(document.querySelectorAll('#fieldProduitSelect option:checked'));
//         const totalPrice = selectedOptions.reduce((total, option) => total + parseFloat(option.dataset.price), 0);
//         document.getElementById('fieldPrix').value = totalPrice;
//     }
// }
//
// window.factureController = new FactureController();
// facture.js
class FactureController extends BaseFormController {
    constructor() {
        super(false);
        this.svc = new FactureAPI();
        this.fetchAndDisplayProducts();
        this.initStatutSelect();
        this.initProductSelectListener();
    }

    async registerFacture() {
        let titre = this.validateRequiredField('#fieldTitre', 'Titre');
        let categorie_f = this.validateRequiredField('#fieldCategorie', 'Categorie');
        let statut = this.validateRequiredField('#fieldStatut', 'Statut');
        let adresse_facturation = this.validateRequiredField('#fieldAdresseFacturation', 'Adresse Facturation');
        let produit_f = Array.from(document.querySelectorAll('#fieldProduitSelect option:checked')).map(option => parseInt(option.value, 10));

        let prix_f = document.getElementById('fieldPrix').value;
        let prix_ttc = document.getElementById('fieldPrixTTC').value;

        if (titre && categorie_f && statut && adresse_facturation && produit_f.length > 0 && prix_f && prix_ttc) {
            try {
                let token = sessionStorage.getItem("token");  // Récupérer le token du sessionStorage
                let res = await this.svc.registerFacture(titre, categorie_f, parseFloat(prix_f), statut === 'true', adresse_facturation, produit_f, parseFloat(prix_ttc), token);
                if (res.token) {
                    sessionStorage.setItem("token", res.token);  // Stocker le nouveau token s'il est présent dans la réponse
                }
                window.location.replace("");  // Redirection après succès
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

        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Sélectionnez un produit';
        defaultOption.disabled = true;
        productListDropdown.appendChild(defaultOption);

        products.forEach(product => {
            let option = document.createElement('option');
            option.value = product.id;
            option.dataset.price = product.prix_p;
            option.textContent = `${product.titrep} - ${product.prix_p} €`;
            productListDropdown.appendChild(option);
        });

        M.FormSelect.init(productListDropdown);
    }

    initStatutSelect() {
        let statutDropdown = document.getElementById('fieldStatut');
        statutDropdown.innerHTML = '';

        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Sélectionnez un statut';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        statutDropdown.appendChild(defaultOption);

        let statutOptions = [
            { value: 'true', text: 'En cours' },
            { value: 'false', text: 'Terminée' }
        ];

        statutOptions.forEach(statut => {
            let option = document.createElement('option');
            option.value = statut.value;
            option.textContent = statut.text;
            statutDropdown.appendChild(option);
        });

        M.FormSelect.init(statutDropdown);
    }

    initProductSelectListener() {
        const productSelect = document.getElementById('fieldProduitSelect');
        productSelect.addEventListener('change', () => this.updateTotalPrice());
    }

    updateTotalPrice() {
        const selectedOptions = Array.from(document.querySelectorAll('#fieldProduitSelect option:checked'));
        const totalPrice = selectedOptions.reduce((total, option) => total + parseFloat(option.dataset.price), 0);
        const prixTTC = totalPrice * 1.20; // Supposons une TVA de 20%
        document.getElementById('fieldPrix').value = totalPrice;
        document.getElementById('fieldPrixTTC').value = prixTTC;
    }
}

window.factureController = new FactureController();

