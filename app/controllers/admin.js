class AdminController {
    constructor() {
        this.token = sessionStorage.getItem("token");
        this.apiBase = "https://projetback-production.up.railway.app";


    }

    async fetchAndRender(url, renderFn) {
        try {
            const res = await fetch(this.apiBase + url, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            if (!res.ok) throw new Error("Accès refusé");
            const data = await res.json();
            renderFn(data);
        } catch (e) {
            console.error(e);
            alert("Accès refusé ou erreur serveur.");
            window.location.replace("login.html");
        }
    }


}

window.adminController = new AdminController();
