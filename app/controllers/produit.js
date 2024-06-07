// class ProduitController extends BaseFormController {
//     constructor() {
//         super(false);
//         this.svc = new ProduitAPI();
//     }
//
//     async registerProduit() {
//         let titrep = this.validateRequiredField('#fieldTitre', 'Titre');
//         let categorie_p = this.validateRequiredField('#fieldCategorie', 'Categorie');
//         let prix_p = this.validateRequiredField('#fieldPrix', 'Prix');
//
//         if (titrep && categorie_p && prix_p) {
//             try {
//                 const token = sessionStorage.getItem("token");
//                 if (!token) {
//                     console.error("Le token est manquant");
//                     return;
//                 }
//
//                 let res = await this.svc.registerProduit(titrep, categorie_p, prix_p, token);
//                 window.location.replace("");
//             } catch (err) {
//                 console.error("Erreur lors de l'enregistrement du produit :", err);
//                 if (err === 409) {
//                     this.toast("Ce produit existe déjà");
//                 } else {
//                     this.displayServiceError();
//                 }
//             }
//         }
//     }
//
//     async loadProduits() {
//         try {
//             const produits = await this.svc.getProduitsWithUser();
//             let produitsList = document.getElementById('produitsList');
//             produitsList.innerHTML = produits.map(produit => `
//                 <div class="card">
//                     <div class="card-content">
//                         <span class="card-title">${produit.titrep}</span>
//                         <p>Catégorie: ${produit.categorie_p}</p>
//                         <p>Prix: ${produit.prix_p}</p>
//                         <p>Utilisateur: ${produit.displayName}</p>
//                     </div>
//                 </div>
//             `).join('');
//         } catch (err) {
//             console.error("Erreur lors du chargement des produits :", err);
//         }
//     }
// }
//
// window.produitController = new ProduitController();
// produit.js

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
                window.location.replace("listeProduits.html");
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
            const token = sessionStorage.getItem("token");
            if (!token) {
                console.error("Le token est manquant");
                window.location.replace("login.html");
                return;
            }
            const produits = await this.svc.getProduitsWithUser(token);
            this.displayProduits(produits);
        } catch (err) {
            console.error("Erreur lors du chargement des produits :", err);
        }
    }

    displayProduits(produits) {
        const produitsList = document.getElementById('produitsList');
        if (produitsList) {
            produitsList.innerHTML = '';
            produits.forEach(produit => {
                const card = this.createProduitCard(produit);
                produitsList.appendChild(card);
            });
        } else {
            console.error("Element avec l'ID 'produitsList' introuvable.");
        }
    }


    createProduitCard(produit) {
        const card = document.createElement('div');
        card.className = 'card';

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        cardContent.innerHTML = `
            <span class="card-title">${produit.titrep}</span>
            <p>Catégorie: ${produit.categorie_p}</p>
            <p>Prix: ${produit.prix_p} €</p>
            <p>Utilisateur: ${produit.displayName}</p>
        `;
        card.appendChild(cardContent);

        const cardAction = document.createElement('div');
        cardAction.className = 'card-action';
        const editButton = document.createElement('button');
        editButton.className = 'btn waves-effect waves-light edit-button';
        editButton.textContent = 'Modifier';
        editButton.addEventListener('click', () => this.editProduit(produit.id));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn red waves-effect waves-light delete-button';
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => this.deleteProduit(produit.id));

        cardAction.appendChild(editButton);
        cardAction.appendChild(deleteButton);
        card.appendChild(cardAction);

        return card;
    }

    async editProduit(produitId) {
        try {
            const produit = await this.svc.getProduitById(produitId);
            // Préremplir le formulaire avec les détails du produit
            document.querySelector('#fieldTitre').value = produit.titrep;
            document.querySelector('#fieldCategorie').value = produit.categorie_p;
            document.querySelector('#fieldPrix').value = produit.prix_p;

            // Ajouter un gestionnaire d'événement pour enregistrer les modifications
            document.querySelector('#saveButton').onclick = async () => {
                const token = sessionStorage.getItem("token");
                const updatedProduit = {
                    id: produitId,
                    titrep: document.querySelector('#fieldTitre').value,
                    categorie_p: document.querySelector('#fieldCategorie').value,
                    prix_p: document.querySelector('#fieldPrix').value,
                    id_useraccount: produit.id_useraccount
                };
                await this.svc.updateProduit(updatedProduit, token);
                window.location.replace("listeProduits.html");
            };
        } catch (err) {
            console.error("Erreur lors de la modification du produit :", err);
        }
    }

    async deleteProduit(produitId) {
        try {
            const token = sessionStorage.getItem("token");
            await this.svc.deleteProduit(produitId, token);
            await this.loadProduits();
        } catch (err) {
            console.error("Erreur lors de la suppression du produit :", err);
        }
    }
}

window.produitController = new ProduitController();
document.addEventListener('DOMContentLoaded', () => produitController.loadProduits());
