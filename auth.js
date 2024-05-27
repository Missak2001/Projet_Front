function checkAuthentication() {
    const token = sessionStorage.getItem("token");
    if (!token) {
        window.location.replace("login.html");
    }
}

// Appel de la fonction checkAuthentication sur chaque page protégée
checkAuthentication();
