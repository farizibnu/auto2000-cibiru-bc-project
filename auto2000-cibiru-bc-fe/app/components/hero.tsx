"use client";

import { useState, useEffect } from "react";

const images = [
    "/images/BodyandPaint.jpg",
    "/images/body-and-paint-auto2000-di-bandung-jawa-barat.jpeg",
    "/images/News_17.jpg"
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Ganti gambar setiap 3 detik

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-36 overflow-hidden relative">
            <div className="absolute inset-0 w-full h-full flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${image})` }}>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 flex flex-col px-4 w-3/4 justify-center h-full gap-2">
                <p className="text-white font-semibold text-sm">Selamat Datang di Auto2000 Bodi & Cat</p>
                <p className="text-white text-[9px]">Cibiru, Bandung</p>
            </div>
        </div>
    );
}


