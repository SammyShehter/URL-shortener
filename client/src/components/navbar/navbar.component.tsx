import React, { useContext, useEffect, useRef } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import authContext from '../../contexts/auth.context'
import './navbar.component.scss'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(authContext)
    useEffect(() => {
        const sidebar = document.querySelector('#mobile')
        M.Sidenav.init(sidebar as any, {
                draggable: true
            })
    }, [])

    const logoutHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <>
            <nav className='main-navbar blue darken-1'>
                <div className='nav-wrapper'>
                    <span className='brand-logo'>URL shotrener</span>
                    <a
                        href='#'
                        data-target='mobile'
                        className='sidenav-trigger'
                    >
                        <i className='material-icons'>
                            menu
                        </i>
                    </a>
                    <ul id='nav-mobile' className='right hide-on-med-and-down'>
                        <li>
                            <NavLink to='/create'>Create</NavLink>
                        </li>
                        <li>
                            <NavLink to='/links'>Links</NavLink>
                        </li>
                        <li>
                            <a href='/links' onClick={logoutHandler}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <ul className='sidenav' id='mobile'>
                <li>
                    <NavLink to='/create' className='sidenav-close'>Create</NavLink>
                </li>
                <li>
                    <NavLink to='/links' className='sidenav-close'>Links</NavLink>
                </li>
                <li>
                    <a href='/links' className='sidenav-close' onClick={logoutHandler}>
                        Logout
                    </a>
                </li>
            </ul>
        </>
    )
}
