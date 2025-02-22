import React from 'react'

const BreadCrumbs = (items: { items: string[] }) => {
    return (
        <div className='flex items-center space-x-2 text-gray-500'>
            {items.items.map((item, idx) => (
                idx === items.items.length - 1 ?
                    <div key={`bc-${idx}`} className='font-bold'>{item}</div> :
                    <div key={`bc-${idx}`}>{item} <span>&#47;</span> </div>
            ))}
        </div>
    )
}

export default BreadCrumbs