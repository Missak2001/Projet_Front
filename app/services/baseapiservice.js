class BaseAPIService {
    constructor(resource) {
        // Utilise la variable globale
        this.url = `${API_BASE_URL}/${resource}`;
        this.headers = new Headers();
    }

    setAuthToken(token) {
        this.headers.set("Authorization", `Bearer ${token}`);
    }
}

// Rendez-la disponible globalement si nécessaire
window.BaseAPIService = BaseAPIService;
