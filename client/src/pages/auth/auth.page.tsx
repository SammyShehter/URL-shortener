import React, { useContext, useState } from 'react'
import './auth.page.scss'
import { useHttp } from '../../hooks/http.hook'
import { useEffect } from 'react'
import { useMessage } from '../../hooks/message.hook'
import authContext from '../../contexts/auth.context'
import 'materialize-css'

export const AuthPage = () => {
    const auth = useContext(authContext)
    const message = useMessage()
    const { loading, request, errors } = useHttp()
    
    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    useEffect(() => {
        errors.forEach((error: { param: string; message: string }) => {
            message(`${error.param}: ${error.message}`)
        })
    }, [errors, message])

    const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }

    const registeHandler = async () => {
        try {
            const data = await request('/users/register', 'POST', { ...form })
            message(data.message)
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const {token} = await request('/users/login', 'POST', { ...form })
            auth.login(token)
        } catch (e) {}
    }

    return (
            <div className='col m8'>
                <h1 className='center'>URL Shortener</h1>
                <div className='card hoverable blue darken-1 card-styles'>
                    <div className='card-content white-text'>
                        <span className='card-title center'>Authorization</span>
                        <div className='row'>
                            <div className='input-field'>
                                <i className='material-icons prefix'>
                                    account_circle
                                </i>
                                <input
                                    id='username'
                                    type='text'
                                    name='username'
                                    className='custom-input'
                                    value={form.username}
                                    onChange={changeHandler}
                                />
                                <label htmlFor='username'>Username</label>
                            </div>
                            <div className='input-field'>
                                <i className='material-icons prefix'>
                                    security
                                </i>
                                <input
                                    id='password'
                                    type='password'
                                    name='password'
                                    value={form.password}
                                    className='custom-input'
                                    onChange={changeHandler}
                                />
                                <label htmlFor='password'>Password</label>
                            </div>
                        </div>
                    </div>
                    <div className='card-action buttons-styles'>
                        <button
                            className='btn orange darken-1'
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Log in
                        </button>
                        <button
                            className='btn grey lighten-1 black-text'
                            onClick={registeHandler}
                            disabled={loading}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
    )
}
