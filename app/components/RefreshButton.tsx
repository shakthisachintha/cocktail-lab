import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'

interface ButtonProps {
    // onClick: () => void
    disabled?: boolean
    isLoading?: boolean,
    children?: React.ReactNode
}

const Button = ({  disabled, isLoading, children }: ButtonProps) => {
    return (
        <span className={`btn-loading ${disabled ? 'disabled' : ''}`}>
            {isLoading && <LoadingOutlined />}
            {children}
        </span>
    )
}

export default Button