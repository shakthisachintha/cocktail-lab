import Link from 'next/link';
import Image from 'next/image';
import ThemeTogleButton from './ThemeTogleButton';
import { HeartFilled } from '@ant-design/icons';
import NavSearchBox from './NavSearchBox';

const NavBar = () => {
    return (
        <nav className='navbar sticky top-0 shadow-md'>
            <div className='container mx-auto py-5'>
                <div className='flex justify-between items-center'>
                    <Link className='flex items-center gap-5' href="/">
                        <Image src="/logo.png" alt='cocktail labs logo' width={100} height={100} />
                        <div>
                            <h1 className="text-5xl font-bold">Cocktail Labs</h1>
                            <p className="text-2xl">Your go-to place for all things cocktails</p>
                        </div>
                    </Link>

                    <div className='flex items-center'>
                        <NavSearchBox />
                        <ThemeTogleButton />
                        <NavLinks />
                    </div>
                </div>
            </div>
        </nav>
    );
}

const NavLinks = () => {
    const navItems = [
        { label: 'Favourites', path: '/favourites' },
    ];

    return <ul className='flex'>
        {navItems.map(item =>
            <li className='icon-btn' key={item.label}><Link
                href={item.path}><HeartFilled /></Link></li>
        )}
    </ul>
}

export default NavBar