
export class userAuthenticationModel {
    email: string
    password: string
    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}

export class userDetails {
    name:string
    email: string
    password: string
    number:number
    image:string
    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}