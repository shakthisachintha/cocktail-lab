import React from 'react'
import BreadCrumbs from './BreadCrumbs'
import { BreadCrumbPath } from '@/lib/types'

interface Props extends React.PropsWithChildren {
    path: BreadCrumbPath[],
    title?: string
    description?: string
}

const GridContainer = ({ children, path, title, description }: Props) => {
    return (
        <div className='grid-container'>
            <BreadCrumbs items={path} />

            {(title || description) && < div className="flex flex-col">
                {title && <h1 className="page-title-text">{title}</h1>}
                {description && <p className="page-desc-text">{description}</p>}
            </div>}

            <div className='main-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                {children}
            </div>
        </div >
    )
}

export default GridContainer