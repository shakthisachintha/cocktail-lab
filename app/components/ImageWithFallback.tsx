'use client'
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends ImageProps {
    fallbackSrc?: string
}

const defaultFallbackSrc = "/fallback.png"

const ImageWithFallback = (props: ImageWithFallbackProps) => {
    const { src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image {...rest} alt={rest.alt} src={imgSrc} onError={() => { setImgSrc(fallbackSrc || defaultFallbackSrc); }} />
    );
};

export default ImageWithFallback
