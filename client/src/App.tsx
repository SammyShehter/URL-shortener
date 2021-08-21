import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import AuthContext, { AuthContextProps } from './contexts/auth.context'
import { Navbar } from './components/navbar/navbar.component'
import { Loader } from './components/loader/loader.component'

function App() {
    const { token, login, logout, ready } = useAuth()
    const isAuhtenticated = !!token
    const authContextValue: AuthContextProps = {
        token,
        login,
        logout,
        isAuhtenticated,
    }
    const routes = useRoutes(isAuhtenticated)

    if(!ready){
        return <Loader />
    }
    return (
        <AuthContext.Provider value={authContextValue}>
            <Router>
                {isAuhtenticated && <Navbar/>}
                <div className='container'>{routes}</div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App
