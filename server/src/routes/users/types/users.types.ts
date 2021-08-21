export type User = {
    _id?: string
    username: string
    password: string
    links: []
}

export type decodedUser = {
    id: string
    iat: number
    exp: number
}
