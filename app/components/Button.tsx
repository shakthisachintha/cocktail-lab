'use client'
import { Loading3QuartersOutlined, LoadingOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    icon?: React.ReactNode
    children: React.ReactNode
}

export const Button = ({ loading, onClick, icon, children, disabled }: Props) => {
    const isDisabled = loading || disabled;
    return (
        <button className={`btn ${isDisabled && 'btn-disabled'} ${(icon || loading) && 'icon-btn'}`}
            onClick={onClick} disabled={loading}>
            {loading && <Loading3QuartersOutlined spin className='icon' />}
            {icon && <span className="icon">{icon}</span>}
            {children}
        </button>
    )
}

export const LinkButton = ({ loading, href, icon, children, disabled, onClick }: Props & { href: string }) => {
    const isDisabled = loading || disabled;
    return (
        <Link
            className={`btn ${isDisabled && 'btn-disabled'} ${icon && 'icon-btn'}`}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => isDisabled ? e.preventDefault() : onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>)}
            href={isDisabled ? '' : href}>

            {loading && <LoadingOutlined />}
            {icon && <span className="icon">{icon}</span>}
            {children}
        </Link >
    )
}