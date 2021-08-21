export interface CreateLinkDto {
    from: string
    to: string
    code: string
    owner: string
    expDate?:number
    clicks?: number
}