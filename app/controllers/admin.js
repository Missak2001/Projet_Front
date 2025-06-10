// class AdminController {
//     constructor() {
//         this.token = sessionStorage.getItem("token");
//         this.apiBase = "http://localhost:3333";
//     }
//
//     async fetchAndRender(url, renderFn) {
//         try {
//             const res = await fetch(this.apiBase + url, {
//                 headers: {
//                     Authorization: `Bearer ${this.token}`
//                 }
//             });
//             if (!res.ok) throw new Error("Accès refusé");
//             const data = await res.json();
//             renderFn(data);
//         } catch (e) {
//             console.error(e);
//             alert("Accès refusé ou erreur serveur.");
//             window.location.replace("login.html");
//         }
//     }
//
//
// }
//
// window.adminController = new AdminController();
class AdminController {
    constructor() {
        this.token = sessionStorage.getItem("token");

        this.apiBase = window.location.hostname.includes("localhost")
            ? "http://localhost:3333"
            : "https://projetback-production.up.railway.app";
    }

    async fetchAndRender(url, renderFn) {
        try {
            const res = await fetch(this.apiBase + url, {
                headers: { Authorization: `Bearer ${this.token}` }
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
