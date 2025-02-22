'use client';
import React from 'react'
import SearchBox from './SearchBox';
import { useRouter } from 'next/navigation'

const NavSearchBox = () => {
    const router = useRouter()

    const onSearch = (term: string) => {
        const params = new URLSearchParams();
        params.set('s', term);
        router.push(`/search?${params.toString()}`);
    }

    return (
        <div>
            <SearchBox onChange={onSearch} />
        </div>
    )
}

export default NavSearchBox