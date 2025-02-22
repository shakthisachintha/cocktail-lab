'use client';
import { getFavouritesFromSessionStorage } from '@/lib/utils';
import { useState, useEffect } from 'react';
import {
    HeartFilled,
    HeartOutlined,
} from '@ant-design/icons';

interface Props {
    cocktailId: string;
}

function isInFavourites(cocktailId: string): boolean {
    const favourites = getFavouritesFromSessionStorage()
    return favourites.includes(cocktailId);
};

const FavouriteButton = ({ cocktailId }: Props) => {
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        setIsFavourite(isInFavourites(cocktailId));
    }, [cocktailId]);

    const handleClick = () => {
        const favourites = getFavouritesFromSessionStorage();
        let newFavourites;

        // Remove from favourites if already in favourites
        if (isFavourite) {
            newFavourites = favourites.filter((id: string) => id !== cocktailId);
        } else {
            // Add to favourites if not in favourites
            newFavourites = [...favourites, cocktailId];
        }

        sessionStorage?.setItem('favourites', JSON.stringify(newFavourites));
        setIsFavourite(!isFavourite);
    };

    return (
        <span onClick={handleClick} className='favourite-btn'>
            {isFavourite ? <HeartFilled /> : <HeartOutlined />}
        </span >
    );
};

export default FavouriteButton;
