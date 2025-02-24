'use client';
import React from 'react'
import SearchBox from './SearchBox';
import { useRouter } from 'next/navigation'
import { sanitizeUserInputs } from '@/lib/utils';

interface Props {
    onNavigation?: () => void
}

const NavSearchBox = ({ onNavigation }: Props) => {
    const router = useRouter()

    const onSearch = (term: string) => {
        onNavigation?.();
        const sanitizedTerm = sanitizeUserInputs(term);
        const params = new URLSearchParams();
        params.set('s', sanitizedTerm);
        router.push(`/search?${params.toString()}`);
    }

    return (
        <SearchBox onChange={onSearch} />
    )
}

export default NavSearchBox