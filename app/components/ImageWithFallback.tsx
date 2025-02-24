'use client'
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { StaticImageAssets } from '@/lib/constants';

interface ImageWithFallbackProps extends ImageProps {
    fallbackSrc?: string
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
    const { src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image {...rest} alt={rest.alt} src={imgSrc} onError={() => { setImgSrc(fallbackSrc || StaticImageAssets.fallback); }} />
    );
};

export default ImageWithFallback
