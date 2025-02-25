'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './Button';
import { CaretLeftOutlined, CaretRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { t } from '@/i18n/locale_service';

interface Props {
    total: number;
    perPage: number;
    currentPage: number;
}

const Pagination = ({ total, perPage, currentPage }: Props) => {
    const pageCount = Math.ceil(total / perPage);
    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-2 p-2">
            <div className="flex items-center gap-2">
                <Button disabled={currentPage === 1} icon={<LeftOutlined />} onClick={() => changePage(1)} aria-label="first-page" />
                <Button disabled={currentPage === 1} icon={<CaretLeftOutlined />} onClick={() => changePage(currentPage - 1)} aria-label="previous-page" />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
                {/* Full pagination on dekstops */}
                <div className="hidden sm:flex gap-2">
                    {Array.from({ length: pageCount }, (_, i) => (
                        <Button
                            key={i}
                            onClick={() => changePage(i + 1)}
                            className={i === (currentPage - 1) ? 'btn-blue' : ''}
                        >
                            {i + 1}
                        </Button>
                    ))}
                </div>
                {/* Mobile indicator */}
                <div className="sm:hidden text-sm">
                    {t("mobile_pagination", [currentPage, pageCount])}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button disabled={pageCount === currentPage} icon={<CaretRightOutlined />} onClick={() => changePage(currentPage + 1)} aria-label="next-page" />
                <Button disabled={pageCount === currentPage} icon={<RightOutlined />} onClick={() => changePage(pageCount)} aria-label='last-page' />
            </div>
        </div>
    );
};

export default Pagination;
