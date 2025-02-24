import { t } from '@/i18n/locale_service';
import { Routes, siteTitle, StaticImageAssets } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { LinkButton } from './Button';
import './NavBar.css';
import NavSearchBox from './NavSearchBox';
import SideMenu from './SideMenu';
import ThemeTogleButton from './ThemeTogleButton';

const NavBar = () => {
    return (
        <nav className='navbar sticky top-0'>
            <div className='container mx-auto py-3 px-2'>
                <div className='flex justify-between items-center'>
                    <Link className='flex items-center gap-2' href={Routes.home}>
                        <Image className='logo-image' src={StaticImageAssets.logo} alt='cocktail labs logo' width={80} height={80} />
                        <div>
                            <h1 className="logo-text">{siteTitle}</h1>
                        </div>
                    </Link>

                    <div className='gap-5 hidden md:flex'>
                        <NavSearchBox />
                        <ThemeTogleButton />
                        <LinkButton href={Routes.favourites}>{t('favourites')}</LinkButton>
                    </div>

                    <div className='flex md:hidden'>
                        <SideMenu />
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default NavBar