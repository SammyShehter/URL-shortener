import React, {
    ButtonHTMLAttributes,
    useContext,
    useEffect,
    useState,
} from 'react'
import { useHistory } from 'react-router-dom'
import authContext from '../../contexts/auth.context'
import { useHttp } from '../../hooks/http.hook'
import './create.page.scss'

export const CreatePage = () => {
    const history = useHistory()
    const { request } = useHttp()
    const { token } = useContext(authContext)
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            try {
                if (!link) throw new Error('')
                const data = await request(
                    '/links/add',
                    'POST',
                    { from: link },
                    { authorization: `Bearer ${token}` }
                )
                history.push(`/details/${data.link._id}`)
            } catch (e) {}
        }
    }

    const buttonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            if (!link) throw new Error('')
            const data = await request(
                '/links/add',
                'POST',
                { from: link },
                { authorization: `Bearer ${token}` }
            )
            history.push(`/details/${data}`)
        } catch (e) {}
    }

    return (
        <div className='row'>
            <div className='col s8 offset-s2 create-page'>
                <div className='input-field'>
                    <input
                        id='link'
                        type='text'
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor='link'>Link</label>
                </div>
                <button
                    className='waves-effect waves-light blue btn'
                    onClick={buttonHandler}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
