'use client';
import { SearchOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import './SearchBox.css';
export interface Props {
    onChange: (text: string) => void;
}

export const SearchBox = ({ onChange }: Props) => {
    const searchTerm = useRef<string>('');
    
    const setSearchTerm = (text: string) => {
        searchTerm.current = text;
    };

    return (
        <div className='search-box'>
            <SearchOutlined className='search-icon' />
            <input
                type="text"
                placeholder="Search..."
                className="search-input"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && searchTerm.current) onChange(searchTerm.current);
                }} />
        </div>
    );
};

export default SearchBox;
