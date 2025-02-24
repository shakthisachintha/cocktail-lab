'use client';

import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import React from 'react'
import { ThemeContext } from '../../lib/providers/ThemeProvider';
import { Button } from './Button';
import { t } from '@/i18n/locale_service';

interface Props {
    showText?: boolean
}

const ThemeTogleButton = ({ showText }: Props) => {
    const { toggleTheme, theme } = React.useContext(ThemeContext);
    return (
        <Button
            icon={theme === 'light-theme' ? <MoonOutlined /> : <SunOutlined />}
            onClick={toggleTheme}>
            {showText && <span className='mr-2'>{t('toggle_theme', [theme === 'light-theme' ? 'Dark' : 'Light'])}</span>}
        </Button>
    )
}

export default ThemeTogleButton