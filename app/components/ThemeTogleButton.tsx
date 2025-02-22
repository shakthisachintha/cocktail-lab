'use client';

import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import React from 'react'
import { ThemeContext } from '../../providers/ThemeProvider';

const ThemeTogleButton = () => {
    const { toggleTheme, theme } = React.useContext(ThemeContext);
    return (
        <div onClick={toggleTheme} className='icon-btn'>
            {theme === 'light-theme' ? <MoonOutlined /> : <SunOutlined />}
        </div>
    )
}

export default ThemeTogleButton