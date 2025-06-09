class BaseAPIService {
    constructor(resource) {
        this.url = `${window.API_BASE_URL}/${resource}`;
        this.headers = new Headers();
    }

    setAuthToken(token) {
        this.headers.set("Authorization", `Bearer ${token}`);
    }
}
window.BaseAPIService = BaseAPIService;
