import MyAPI from "./myapi.js";
export default class MyExampleRoutes extends MyAPI {
    constructor() {
        super();
        this.routesUrl = "example"
    }

    getSomething() {
        return this.myFetch(`${this.routesUrl}/something`)
    }

}