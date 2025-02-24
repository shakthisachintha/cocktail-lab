'use client';

import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import React from 'react'
import { ThemeContext } from '../../providers/ThemeProvider';
import { Button } from './Button';

interface Props {
    showText?: boolean
}

const ThemeTogleButton = ({ showText }: Props) => {
    const { toggleTheme, theme } = React.useContext(ThemeContext);
    return (
        <Button 
        icon={theme === 'light-theme' ? <MoonOutlined /> : <SunOutlined />}
        onClick={toggleTheme}>
            {showText && <span className='mr-2'>Toggle {theme === 'light-theme' ? 'Dark' : 'Light'} Mode</span>}
        </Button>
    )
}

export default ThemeTogleButton