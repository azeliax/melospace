import glitch1 from "./graphics/glitch3.png";
import glitch2 from "./graphics/glitch4.png";
import React, { useState, useEffect } from 'react'


const images = [glitch1, glitch2];

export default function Overlay() {
    const [currentImage, setCurrentImage] = useState(images[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currentImage == images[0]) {
                setCurrentImage(images[1]);
            }
            else {
                setCurrentImage(images[0]);
            }
        }, 750)
        
        return () => clearInterval(intervalId);
    }, [currentImage])

    return (
        <div className="overlay" style={{backgroundImage: `url(${currentImage})`}}>
        </div>
    )
}