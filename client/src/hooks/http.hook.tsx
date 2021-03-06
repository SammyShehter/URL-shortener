import { useCallback, useState } from 'react'
import axios from 'axios'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const request = useCallback(
        async (url: string, method = 'GET', data = {}, headers = {}) => {
            try {
                setLoading(true)
                const response = await axios({
                    method,
                    url: `https://to2api.sammyshehter.com${url}`,
                    data,
                    headers
                })
                setLoading(false)
                return response.data
            } catch (e) {
                setLoading(false)
                setErrors(e.response.data.errors)
                throw e
            }
        },
        []
    )

    const clearErrors = () => setErrors([])

    return { loading, request, errors, clearErrors }
}
