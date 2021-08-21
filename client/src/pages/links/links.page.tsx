import React, { useCallback, useEffect, useState } from 'react'
import { useContext } from 'react'
import { ILinksProps, LinksList } from '../../components/linksList/linksList'
import { Loader } from '../../components/loader/loader.component'
import authContext from '../../contexts/auth.context'
import { useHttp } from '../../hooks/http.hook'

export const LinksPage = () => {
    const { request, loading } = useHttp()
    const { token } = useContext(authContext)
    const [links, setLinks] = useState([])

    const getLinks = useCallback(async () => {
        try {
            const linksData = await request(
                `/links`,
                'GET',
                {},
                { authorization: `Bearer ${token}` }
            )
            setLinks(linksData)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        getLinks()
    }, [getLinks])

    if (loading) return <Loader />

    return <>{!loading && <LinksList links={links} />}</>
}
