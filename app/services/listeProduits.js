// function loadProduitsAndSetupEventListeners() {
//     loadProduits();
//     setupEventListeners();
// }
//
// function loadProduits() {
//     const produitAPI = new ProduitAPI();
//     const token = sessionStorage.getItem("token");
//
//     if (!token) {
//         console.error("Le token est manquant");
//         window.location.replace("login.html");
//         return;
//     }
//
//     produitAPI.getProduitsWithUser(token).then(produits => {
//         const produitsList = document.getElementById('produitsList');
//         produitsList.innerHTML = '';
//
//         produits.forEach(produit => {
//             const produitElement = document.createElement('div');
//             produitElement.className = 'card';
//             produitElement.innerHTML = `
//                 <div class="card-content">
//                     <span class="card-title">${produit.titrep}</span>
//                     <p>Catégorie: ${produit.categorie_p}</p>
//                     <p>Prix: ${produit.prix_p} €</p>
//                     <p>Utilisateur: ${produit.id_useraccount}</p>
//                 </div>
//             `;
//             produitsList.appendChild(produitElement);
//         });
//     }).catch(err => {
//         console.error("Erreur lors de la récupération des produits :", err);
//     });
// }
//
//
// function setupEventListeners() {
//     document.getElementById('addProduitButton').addEventListener('click', () => {
//         window.location.href = 'ajoutProduit.html';
//     });
//
//     // document.getElementById('logoutButton').addEventListener('click', () => {
//     //     loginController.logout();
//     // });
// }
// listeProduits.js (côté client)
function loadProduitsAndSetupEventListeners() {
    loadProduits();
    setupEventListeners();
}

function loadProduits() {
    const produitAPI = new ProduitAPI();
    const token = sessionStorage.getItem("token");

    if (!token) {
        console.error("Le token est manquant");
        window.location.replace("login.html");
        return;
    }

    produitAPI.getProduitsWithUser(token)
        .then(produits => {
            const produitsList = document.getElementById('produitsList');
            produitsList.innerHTML = '';

            produits.forEach(produit => {
                const produitElement = document.createElement('div');
                produitElement.className = 'card';
                produitElement.innerHTML = `
                    <div class="card-content">
                        <p>Titre:${produit.titrep}
                        <p>Catégorie: ${produit.categorie_p}</p>
                        <p>Prix: ${produit.prix_p} €</p>
                        <button class="waves-effect waves-light btn edit-button" data-id="${produit.id}">Modifier</button>
                        <button class="waves-effect waves-light btn delete-button" data-id="${produit.id}">Supprimer</button>
                    </div>
                `;
                produitsList.appendChild(produitElement);
            });
        })
        .then(() => {
            setupEditButtons();
            setupDeleteButtons();
        })
        .catch(err => {
            console.error("Erreur lors de la récupération des produits :", err);
        });
}

function setupEventListeners() {
    document.getElementById('addProduitButton').addEventListener('click', () => {
        window.location.href = 'ajoutProduit.html';
    });
}

function setupEditButtons() {
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const produitId = button.dataset.id;
            // Rediriger vers la page de modification de produit avec l'ID du produit
            window.location.href = `modifierProduit.html?id=${produitId}`;
        });
    });
}

function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const produitId = button.dataset.id;
            // Demander une confirmation avant de supprimer le produit
            if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
                // Appeler la fonction de suppression de produit
                deleteProduit(produitId);
            }
        });
    });
}

function deleteProduit(produitId) {
    // Appeler l'API pour supprimer le produit avec l'ID spécifié
    const produitAPI = new ProduitAPI();
    const token = sessionStorage.getItem("token");

    if (!token) {
        console.error("Le token est manquant");
        window.location.replace("login.html");
        return;
    }

    produitAPI.deleteProduit(produitId, token)
        .then(() => {
            // Recharger la liste des produits après la suppression
            loadProduits();
        })
        .catch(err => {
            console.error("Erreur lors de la suppression du produit :", err);
        });
}

document.addEventListener('DOMContentLoaded', loadProduitsAndSetupEventListeners);
