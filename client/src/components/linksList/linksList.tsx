import React from 'react'

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

    const linksOrder = links.map((link) => {
        return (
            <tr key={link.expDate}>
                <td>{link.from}</td>
                <td>{link.to}</td>
                <td>{link.code}</td>
            </tr>
        )
    })

    return (
        <>
            <h2>Links</h2>
            <table className='striped'>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Code</th>
                    </tr>
                </thead>

                <tbody>{linksOrder}</tbody>
            </table>
        </>
    )
}
