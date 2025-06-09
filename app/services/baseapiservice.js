class BaseAPIService {
    constructor(resource) {
        this.url = `${API_BASE_URL}/${resource}`;
        this.headers = new Headers();
    }

    setAuthToken(token) {
        this.headers.set("Authorization", `Bearer ${token}`);
    }
}

// rendre disponible globalement
window.BaseAPIService = BaseAPIService;
