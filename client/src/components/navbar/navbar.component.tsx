import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import authContext from '../../contexts/auth.context'
import './navbar.component.scss'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(authContext)
    const logoutHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav className='main-navbar blue darken-1'>
            <div className='nav-wrapper'>
                <span className='brand-logo'>
                    URL-shotrener
                </span>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li>
                        <NavLink to='/create'>Create</NavLink>
                    </li>
                    <li>
                        <NavLink to='/links'>Links</NavLink>
                    </li>
                    <li>
                        <a href='/links' onClick={logoutHandler}>Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
