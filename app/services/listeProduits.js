function loadProduitsAndSetupEventListeners() {
    loadProduits();
    setupEventListeners();
}

// function loadProduits() {
//     const produitAPI = new ProduitAPI();
//
//     produitAPI.getProduitsWithUser().then(produits => {
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
function loadProduits() {
    const produitAPI = new ProduitAPI();
    const token = sessionStorage.getItem("token");

    if (!token) {
        console.error("Le token est manquant");
        window.location.replace("login.html");
        return;
    }

    produitAPI.getProduitsWithUser(token).then(produits => {
        const produitsList = document.getElementById('produitsList');
        produitsList.innerHTML = '';

        produits.forEach(produit => {
            const produitElement = document.createElement('div');
            produitElement.className = 'card';
            produitElement.innerHTML = `
                <div class="card-content">
                    <span class="card-title">${produit.titrep}</span>
                    <p>Catégorie: ${produit.categorie_p}</p>
                    <p>Prix: ${produit.prix_p} €</p>
                    <p>Utilisateur: ${produit.id_useraccount}</p>
                </div>
            `;
            produitsList.appendChild(produitElement);
        });
    }).catch(err => {
        console.error("Erreur lors de la récupération des produits :", err);
    });
}


function setupEventListeners() {
    document.getElementById('addProduitButton').addEventListener('click', () => {
        window.location.href = 'ajoutProduit.html';
    });

    // document.getElementById('logoutButton').addEventListener('click', () => {
    //     loginController.logout();
    // });
}
