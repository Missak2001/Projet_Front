export default class MyAPI {
    constructor() {
        this.apiServer = "https://example.com/api/v1"
        this.myHeaders = new Headers({
            "api-key-header-example": "MYAPIKEY",
        })
    }

    myFetch(url) {
        return new Promise(((resolve, reject) => {
            fetch(`${this.apiServer}/${url}`,
                {headers: this.myHeaders})
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.json())
                    } else {
                        reject(response.status)
                    }
                })
                .catch(err => reject(err))
        }))
    }
}