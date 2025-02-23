import React from 'react'
import BreadCrumbs from './BreadCrumbs'
import { BreadCrumbPath } from '@/lib/types'

interface Props extends React.PropsWithChildren {
    path?: BreadCrumbPath[]
    extras?: React.ReactNode
    title?: string
    description?: string
}

const GridContainer = ({ children, path, title, description, extras }: Props) => {
    return (
        <div className='grid-container'>
            {path && <BreadCrumbs items={path} />}

            <div className='flex justify-between items-center'>
                {(title || description) && < div className="flex flex-col">
                    {title && <h1 className="page-title-text">{title}</h1>}
                    {description && <p className="page-desc-text">{description}</p>}
                </div>}

                {extras && extras}
            </div>

            <div className='main-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                {children}
            </div>
        </div >
    )
}

export default GridContainer