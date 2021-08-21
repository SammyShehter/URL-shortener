import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/auth.hook'
import { useHttp } from '../hooks/http.hook'
import { AuthPage } from '../pages/auth/auth.page'
import { CreatePage } from '../pages/create/create.page'
import { DetailsPage } from '../pages/details/details.page'
import { LinksPage } from '../pages/links/links.page'

export const useRoutes = (isAuthenticated: any) => { //TODO get right type
    
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/links' exact>
                    <LinksPage />
                </Route>
                <Route path='/create' exact>
                    <CreatePage />
                </Route>
                <Route path='/details/:id'>
                    <DetailsPage />
                </Route>
                <Redirect to='/create' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}
