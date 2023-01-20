import Lightbox from 'react-18-image-lightbox';

import { useState } from 'react';
import { Gallery } from 'react-grid-gallery';

import 'react-18-image-lightbox/style.css';

export type ImageryGridAsset = {
    src: string;
    thumbnail: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
}

export interface ImageryGridProps {
    images: ImageryGridAsset[];
}

export const ImageryGrid: React.FC<ImageryGridProps> = ({ images }) => {
    const [index, setIndex] = useState(-1);

    const current = images[index];
    const nextIndex = (index + 1) % images.length;
    const nextImage = images[nextIndex] || current;
    
    const prevIndex = (index + images.length - 1) % images.length;
    const prevImage = images[prevIndex] || current;

    const handleClick = (index: number, _image: ImageryGridAsset) => setIndex(index);
    const handleClose = () => setIndex(-1);
    const handlePrev = () => setIndex(prevIndex);
    const handleNext = () => setIndex(nextIndex);

    return (
        <>
            <Gallery
                images={images}
                onClick={handleClick}
                enableImageSelection={false} />

            {
                !!current && (
                    <Lightbox
                        mainSrc={current.src}
                        imageTitle={current.caption}
                        mainSrcThumbnail={current.src}
                        nextSrc={nextImage.src}
                        nextSrcThumbnail={nextImage.src}
                        prevSrc={prevImage.src}
                        prevSrcThumbnail={prevImage.src}
                        onCloseRequest={handleClose}
                        onMovePrevRequest={handlePrev}
                        onMoveNextRequest={handleNext} />
                )
            }
        </>
    );

};