import React from 'react'

interface ILinkProps {
    link: { to: string; from: string; clicks: number; expDate: number }
}

export const LinkCard = ({ link }: ILinkProps) => {

    const convert = (t: number) => {
        const dt = new Date(t);
        const hr = dt.getUTCHours();
        const m = "0" + dt.getUTCMinutes();
        
        return hr + ':' + m.substr(-2)
      }

    const expiresIn = (): string => {
        const now = Date.now()
        if(now > link.expDate) {
            return 'Link expired'
        } else {
            return convert(link.expDate - now)
        }
        
    }

    return (
        <>
            <h2>Link</h2>

            <p>
                Short Link:{' '}
                <a href={link.to} target='_blank' rel='noopener noreferrer'>
                    {link.to}
                </a>
            </p>
            <p>
                Original Link:{' '}
                <a href={link.from} target='_blank' rel='noopener noreferrer'>
                    {link.from}
                </a>
            </p>
            <p>
                Click count: <strong>{link.clicks}</strong>
            </p>
            <p>
                Expiration: <strong>{expiresIn()}</strong>
            </p>
        </>
    )
}
