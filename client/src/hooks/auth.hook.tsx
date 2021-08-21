import { useState, useCallback, useEffect } from "react"

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState('')
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken: string) => {
        setToken(jwtToken)

        localStorage.setItem(storageName, JSON.stringify({token: jwtToken}))
    },[]) 

    const logout = useCallback(() => {
        setToken('')
        localStorage.removeItem(storageName)
    },[])

    useEffect(() => {
        const userData = localStorage.getItem(storageName)
        const data = JSON.parse(userData as string)

        if(data && data.token){
            login(data.token)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, ready}
}