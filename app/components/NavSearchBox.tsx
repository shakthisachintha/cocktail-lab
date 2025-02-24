'use client';
import React from 'react'
import SearchBox from './SearchBox';
import { useRouter } from 'next/navigation'

interface Props {
    onNavigation?: () => void
}

const NavSearchBox = ({ onNavigation }: Props) => {
    const router = useRouter()

    const onSearch = (term: string) => {
        onNavigation?.();
        const params = new URLSearchParams();
        params.set('s', term);
        router.push(`/search?${params.toString()}`);
    }

    return (
        <SearchBox onChange={onSearch} />
    )
}

export default NavSearchBox