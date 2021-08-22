import React from 'react'
import { Link } from 'react-router-dom'

export interface ILinksProps {
    links: any[]
}

export const LinksList = ({ links }: ILinksProps) => {

    if (!links.length) return <h1>No Links here yet!</h1>

    // const convert = (t: number) => {
    //     const dt = new Date(t);
    //     const hr = dt.getUTCHours();
    //     const m = "0" + dt.getUTCMinutes();

    //     return hr + ':' + m.substr(-2)
    //   }

    // const expiresIn = (): string => {
    //     const now = Date.now()
    //     if(now > link.expDate) {
    //         return 'Link expired'
    //     } else {
    //         return convert(link.expDate - now)
    //     }

    // }

    const linksOrder = links.map((link, idx) => {
        return (
            <tr key={link._id}>
                <td>{idx+1}</td>
                <td>{link.from}</td>
                <td>{link.to}</td>
                <td><Link to={`details/${link._id}`}>Details</Link></td>
            </tr>
        )
    })

    return (
        <>
            <h2>Links</h2>
            <table className='striped responsive-table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Origin</th>
                        <th>Short</th>
                        <th>Open</th>
                    </tr>
                </thead>

                <tbody>{linksOrder}</tbody>
            </table>
        </>
    )
}
