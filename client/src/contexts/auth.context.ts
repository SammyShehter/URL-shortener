import {createContext} from 'react'

export interface AuthContextProps {
    token: string,
    login: (token:string) => void,
    logout: () => void,
    isAuhtenticated: boolean
}


export const defaultState: AuthContextProps = {
    token: '',
    login: () => {},
    logout: () => {},
    isAuhtenticated: false
}

export default createContext(defaultState)