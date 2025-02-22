'use client';
import { useRef } from 'react';

export interface Props {
    onChange: (text: string) => void;
}

export const SearchBox = ({ onChange }: Props) => {
    const searchTerm = useRef<string>('');
    
    const setSearchTerm = (text: string) => {
        searchTerm.current = text;
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                className="input"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && searchTerm.current) onChange(searchTerm.current);
                }} />
        </div>
    );
};

export default SearchBox;
