'use client';
import { t } from '@/i18n/locale_service';
import { Routes, siteTitle } from '@/lib/constants';
import { CloseOutlined, LeftOutlined, MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useState } from 'react';
import { Button, LinkButton } from './Button';
import NavSearchBox from './NavSearchBox';
import './SideMenu.css';
import ThemeTogleButton from './ThemeTogleButton';

const SideMenu = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleMenu = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <div className="side-menu-container">
            <div className="menu-toggle" onClick={toggleMenu}>
                {isExpanded ? (
                    <CloseOutlined className='toggle-icon' />
                ) : (
                    <MenuOutlined className='toggle-icon' />
                )}
            </div>
            {isExpanded && (
                <nav className="side-menu">
                    <div className='flex flex-col gap-5'>
                        <Link className='flex items-center justify-center gap-2' href="/">
                            <div>
                                <h1 className="logo-text">{siteTitle}</h1>
                            </div>
                        </Link>
                        <NavSearchBox onNavigation={toggleMenu} />
                        <LinkButton href={Routes.home} onClick={toggleMenu}>{t('home')}</LinkButton>
                        <LinkButton href={Routes.favourites} onClick={toggleMenu}>{t('favourites')}</LinkButton>

                        <ThemeTogleButton showText />
                    </div>

                    <div className="side-menu-back flex justify-center">
                        <Button onClick={toggleMenu}>
                            <LeftOutlined />
                        </Button>
                    </div>
                </nav>
            )}
        </div>
    );
};

export default SideMenu;
