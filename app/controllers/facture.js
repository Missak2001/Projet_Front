// class FactureController extends BaseFormController {
//     constructor() {
//         super(false);
//         this.svc = new FactureAPI();
//         this.initFacturePage();
//     }
//
//     async initFacturePage() {
//         if (document.getElementById('factureForm')) {
//             await this.fetchAndDisplayProducts();
//             this.initStatutSelect();
//             this.initProductSelectListener();
//         }
//
//         if (document.getElementById('factureList')) {
//             await this.loadFactures();
//         }
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
//         let prix_ttc = document.getElementById('fieldPrixTTC').value;
//
//         if (titre && categorie_f && statut && adresse_facturation && produit_f.length > 0 && prix_f && prix_ttc) {
//             try {
//                 let token = sessionStorage.getItem("token");
//                 let res = await this.svc.registerFacture(titre, categorie_f, parseFloat(prix_f), statut === 'true', adresse_facturation, produit_f, parseFloat(prix_ttc), token);
//                 if (res.token) {
//                     sessionStorage.setItem("token", res.token);
//                 }
//                 window.location.replace("mesFactures.html");
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
//
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
//         let defaultOption = document.createElement('option');
//         defaultOption.value = '';
//         defaultOption.textContent = 'Sélectionnez un produit';
//         defaultOption.disabled = true;
//         productListDropdown.appendChild(defaultOption);
//
//         products.forEach(product => {
//             let option = document.createElement('option');
//             option.value = product.id;
//             option.dataset.price = product.prix_p;
//             option.textContent = `${product.titrep} - ${product.prix_p} €`;
//             productListDropdown.appendChild(option);
//         });
//
//         M.FormSelect.init(productListDropdown);
//     }
//
//     async loadFactures() {
//         try {
//             let token = sessionStorage.getItem("token");
//             let factures = await this.svc.getFacturesByUser(token);
//             this.displayFactures(factures);
//         } catch (err) {
//             console.error("Erreur lors de la récupération des factures :", err);
//             this.displayServiceError();
//         }
//     }
//
//     displayFactures(factures) {
//         let factureList = document.getElementById('factureList');
//         factureList.innerHTML = '';
//
//         factures.forEach(facture => {
//             let card = document.createElement('div');
//             card.classList.add('col', 's12', 'm6', 'l4'); // Colonne pour chaque facture
//             card.innerHTML = `
//             <div class="card">
//                 <div class="card-content">
//                     <span class="card-title">Facture #${facture.id}</span>
//                     <p>Titre: ${facture.titre}</p>
//                     <p>Catégorie: ${facture.categorie_f}</p>
//                     <p>Statut: ${facture.statut ? 'En cours' : 'Terminée'}</p>
//                     <p>Adresse: ${facture.adresse_facturation}</p>
//                     <p>Produits: ${facture.produit_f.join(', ')}</p>
//                     <p>Prix TTC: ${facture.prix_ttc} €</p>
//                     <p>Client: ${facture.created_by}</p>
//                 </div>
//                 <div class="card-action">
//                     <a href="#" onclick="factureController.editFacture(${facture.id})">Modifier</a>
//                     <a href="#" onclick="factureController.deleteFacture(${facture.id})">Supprimer</a>
//                 </div>
//             </div>
//         `;
//             factureList.appendChild(card);
//         });
//     }
//
//     initStatutSelect() {
//         let statutDropdown = document.getElementById('fieldStatut');
//         statutDropdown.innerHTML = '';
//
//         let defaultOption = document.createElement('option');
//         defaultOption.value = '';
//         defaultOption.textContent = 'Sélectionnez un statut';
//         defaultOption.disabled = true;
//         defaultOption.selected = true;
//         statutDropdown.appendChild(defaultOption);
//
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
//         const prixTTC = totalPrice * 1.20; // Supposons une TVA de 20%
//         document.getElementById('fieldPrix').value = totalPrice;
//         document.getElementById('fieldPrixTTC').value = prixTTC;
//     }
//
//     async deleteFacture(factureId) {
//         try {
//             let token = sessionStorage.getItem("token");
//             await this.svc.deleteFacture(factureId, token);
//             this.toast("La facture a été supprimée avec succès");
//             await this.loadFactures(); // Recharger la liste des factures après la suppression
//         } catch (err) {
//             console.error("Erreur lors de la suppression de la facture :", err);
//             this.displayServiceError();
//         }
//     }
//
//     async editFacture(factureId) {
//         // Implémentez la logique de modification ici
//         // Par exemple, redirigez l'utilisateur vers une page de modification avec l'ID de la facture en paramètre
//         window.location.href = `editFacture.html?factureId=${factureId}`;
//     }
//
// }
//
// // Initialisation du controller
// document.addEventListener('DOMContentLoaded', function() {
//     let factureController = new FactureController();
//
//     // Initialiser les sélecteurs Materialize
//     let elems = document.querySelectorAll('select');
//     M.FormSelect.init(elems);
// });
// window.factureController = new FactureController();
// class FactureController extends BaseFormController {
//     constructor() {
//         super(false);
//         this.svc = new FactureAPI();
//         this.initFacturePage();
//     }
//
//     async initFacturePage() {
//         if (document.getElementById('factureForm')) {
//             await this.fetchAndDisplayProducts();
//             this.initStatutSelect();
//             this.initProductSelectListener();
//         }
//
//         if (document.getElementById('factureList')) {
//             await this.loadFactures();
//         }
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
//         let prix_ttc = document.getElementById('fieldPrixTTC').value;
//
//         if (titre && categorie_f && statut && adresse_facturation && produit_f.length > 0 && prix_f && prix_ttc) {
//             try {
//                 let token = sessionStorage.getItem("token");
//                 let res = await this.svc.registerFacture(titre, categorie_f, parseFloat(prix_f), statut === 'true', adresse_facturation, produit_f, parseFloat(prix_ttc), token);
//                 if (res.token) {
//                     sessionStorage.setItem("token", res.token);
//                 }
//                 window.location.replace("mesFactures.html");
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
//
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
//         let defaultOption = document.createElement('option');
//         defaultOption.value = '';
//         defaultOption.textContent = 'Sélectionnez un produit';
//         defaultOption.disabled = true;
//         productListDropdown.appendChild(defaultOption);
//
//         products.forEach(product => {
//             let option = document.createElement('option');
//             option.value = product.id;
//             option.dataset.price = product.prix_p;
//             option.textContent = `${product.titrep} - ${product.prix_p} €`;
//             productListDropdown.appendChild(option);
//         });
//
//         M.FormSelect.init(productListDropdown);
//     }
//
//     async loadFactures() {
//         try {
//             let token = sessionStorage.getItem("token");
//             let factures = await this.svc.getFacturesByUser(token);
//             this.displayFactures(factures);
//         } catch (err) {
//             console.error("Erreur lors de la récupération des factures :", err);
//             this.displayServiceError();
//         }
//     }
//
//     displayFactures(factures) {
//         let factureList = document.getElementById('factureList');
//         factureList.innerHTML = '';
//
//         factures.forEach(facture => {
//             let card = document.createElement('div');
//             card.classList.add('col', 's12', 'm6', 'l4');
//             card.innerHTML = `
//         <div class="card">
//             <div class="card-content">
//                 <span class="card-title">Facture #${facture.id}</span>
//                 <p>Titre: ${facture.titre}</p>
//                 <p>Catégorie: ${facture.categorie_f}</p>
//                 <p>Statut: ${facture.statut ? 'En cours' : 'Terminée'}</p>
//                 <p>Adresse: ${facture.adresse_facturation}</p>
//                 <p>Produits: ${facture.produit_f.join(', ')}</p>
//                 <p>Prix TTC: ${facture.prix_ttc} €</p>
//                 <p>Client: ${facture.created_by}</p>
//             </div>
//             <div class="card-action">
//                 <a href="#" onclick="factureController.editFacture(${facture.id})">Modifier</a>
//                 <a href="#" onclick="factureController.deleteFacture(${facture.id})">Supprimer</a>
//                 <a href="#" onclick="factureController.displayFacturePDF(${facture.id})">Télécharger PDF</a>
//             </div>
//         </div>
//     `;
//             factureList.appendChild(card);
//         });
//     }
//
//     initStatutSelect() {
//         let statutDropdown = document.getElementById('fieldStatut');
//         statutDropdown.innerHTML = '';
//
//         let defaultOption = document.createElement('option');
//         defaultOption.value = '';
//         defaultOption.textContent = 'Sélectionnez un statut';
//         defaultOption.disabled = true;
//         defaultOption.selected = true;
//         statutDropdown.appendChild(defaultOption);
//
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
//         M.FormSelect.init(statutDropdown);
//     }
//
//     initProductSelectListener() {
//         const productSelect = document.getElementById('fieldProduitSelect');
//         productSelect.addEventListener('change', () =>
//             this.updateTotalPrice());
//     }
//
//     updateTotalPrice() {
//         const selectedOptions = Array.from(document.querySelectorAll('#fieldProduitSelect option:checked'));
//         const totalPrice = selectedOptions.reduce((total, option) => total + parseFloat(option.dataset.price), 0);
//         const prixTTC = totalPrice * 1.20; // Supposons une TVA de 20%
//         document.getElementById('fieldPrix').value = totalPrice;
//         document.getElementById('fieldPrixTTC').value = prixTTC;
//     }
//
//     async deleteFacture(factureId) {
//         try {
//             let token = sessionStorage.getItem("token");
//             await this.svc.deleteFacture(factureId, token);
//             this.toast("La facture a été supprimée avec succès");
//             await this.loadFactures(); // Recharger la liste des factures après la suppression
//         } catch (err) {
//             console.error("Erreur lors de la suppression de la facture :", err);
//             this.displayServiceError();
//         }
//     }
//
//     async displayFacturePDF(factureId) {
//         try {
//             let facture = await this.svc.getFactureById(factureId);
//             this.generatePDF(facture);
//         } catch (err) {
//             console.error("Erreur lors de la génération du PDF :", err);
//             this.displayServiceError();
//         }
//     }
//
//     generatePDF(facture) {
//         const { jsPDF } = window.jspdf;
//         const doc = new jsPDF();
//
//         doc.text(`Facture: ${facture.titre}`, 10, 10);
//         doc.text(`Catégorie: ${facture.categorie_f}`, 10, 20);
//         doc.text(`Statut: ${facture.statut ? 'En cours' : 'Terminée'}`, 10, 30);
//         doc.text(`Adresse: ${facture.adresse_facturation}`, 10, 40);
//         doc.text(`Produits: ${facture.produit_f.join(', ')}`, 10, 50);
//         doc.text(`Prix TTC: ${facture.prix_ttc} €`, 10, 60);
//         doc.text(`Client: ${facture.created_by}`, 10, 70);
//
//         doc.save(`facture_${facture.id}.pdf`);
//     }
//
//     displayServiceError() {
//         M.toast({html: 'Erreur de service. Veuillez réessayer plus tard.', classes: 'rounded'});
//     }
// }
//
// // Initialisation du controller
// document.addEventListener('DOMContentLoaded', function() {
//     let factureController = new FactureController();
//
//     // Initialiser les sélecteurs Materialize
//     let elems = document.querySelectorAll('select');
//     M.FormSelect.init(elems);
// });
// window.factureController = new FactureController();
class FactureController extends BaseFormController {
    constructor() {
        super(false);
        this.svc = new FactureAPI();
        this.initFacturePage();
    }

    async initFacturePage() {
        if (document.getElementById('factureForm')) {
            await this.fetchAndDisplayProducts();
            this.initStatutSelect();
            this.initProductSelectListener();
        }

        if (document.getElementById('factureList')) {
            await this.loadFactures();
        }
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
                let token = sessionStorage.getItem("token");
                let res = await this.svc.registerFacture(titre, categorie_f, parseFloat(prix_f), statut === 'true', adresse_facturation, produit_f, parseFloat(prix_ttc), token);
                if (res.token) {
                    sessionStorage.setItem("token", res.token);
                }
                window.location.replace("mesFactures.html");
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

    async loadFactures() {
        try {
            let token = sessionStorage.getItem("token");
            let factures = await this.svc.getFacturesByUser(token);
            this.displayFactures(factures);
        } catch (err) {
            console.error("Erreur lors de la récupération des factures :", err);
            this.displayServiceError();
        }
    }

    displayFactures(factures) {
        let factureList = document.getElementById('factureList');
        factureList.innerHTML = '';

        factures.forEach(facture => {
            let card = document.createElement('div');
            card.classList.add('col', 's12', 'm6', 'l4');
            card.innerHTML = `
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Facture #${facture.id}</span>
                        <p>Titre: ${facture.titre}</p>
                        <p>Catégorie: ${facture.categorie_f}</p>
                        <p>Statut: ${facture.statut ? 'En cours' : 'Terminée'}</p>
                        <p>Adresse: ${facture.adresse_facturation}</p>
                        <p>Produits: ${facture.produit_f.join(', ')}</p>
                        <p>Prix TTC: ${facture.prix_ttc} €</p>
                        <p>Client: ${facture.created_by}</p>
                    </div>
                    <div class="card-action">
                        <a href="#" onclick="factureController.editFacture(${facture.id})">Modifier</a>
                        <a href="#" onclick="factureController.deleteFacture(${facture.id})">Supprimer</a>
                        <a href="#" onclick="factureController.displayFacturePDF(${facture.id})">Télécharger PDF</a>
                    </div>
                </div>
            `;
            factureList.appendChild(card);
        });
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
        const prixTTC = totalPrice * 1.20;
        document.getElementById('fieldPrix').value = totalPrice;
        document.getElementById('fieldPrixTTC').value = prixTTC;
    }

    async deleteFacture(factureId) {
        try {
            let token = sessionStorage.getItem("token");
            await this.svc.deleteFacture(factureId, token);
            this.toast("La facture a été supprimée avec succès");
            await this.loadFactures();
        } catch (err) {
            console.error("Erreur lors de la suppression de la facture :", err);
            this.displayServiceError();
        }
    }

    async editFacture(factureId) {
        window.location.href = `editFacture.html?factureId=${factureId}`;
    }

    async displayFacturePDF(factureId) {
        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch(`https://projetback-production.up.railway.app/facture/pdf/${factureId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Erreur du serveur");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `facture_${factureId}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error("Erreur lors de la génération du PDF :", err);
            this.displayServiceError();
        }
    }

    displayServiceError() {
        M.toast({ html: 'Erreur de service. Veuillez réessayer plus tard.', classes: 'rounded' });
    }
}

// Initialisation du controller
document.addEventListener('DOMContentLoaded', function () {
    let factureController = new FactureController();
    let elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});
window.factureController = new FactureController();
