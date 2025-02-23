import { BreadCrumbPath } from '@/lib/types';
import Link from 'next/link';
import React from 'react';

const BreadCrumbs = ({ items }: { items: BreadCrumbPath[] }) => {

    items.unshift({ label: 'Home', href: '/' });

    return (
        <div className="breadcrumbs">
            {items.map((item, idx) => {
                const isLast = idx === items.length - 1;
                return (
                    <React.Fragment key={`breadcrumb-${idx}`}>
                        {item.href ? (
                            <Link href={item.href} className={isLast ? 'font-bold' : ''}>
                                {item.label}
                            </Link>
                        ) : (
                            <span className={isLast ? 'font-bold' : ''}>
                                {item.label}
                            </span>
                        )}
                        {isLast ? null : <span>&#47;</span>}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default BreadCrumbs;
