"use client";
import { FaHeart, FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { KoFiButton } from "@/app/components/KoFiWidget"; 

export default function Footer() {
    const [year, setYear] = useState<number>(new Date().getFullYear());
   
    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);
   
    return (
        <footer className="container mx-auto my-4 text-gray-400">
            {/* Mobile Layout: Stack vertically */}
            <div className="flex flex-col items-center gap-4 md:hidden">
                <div className="text-sm flex gap-2 items-center text-center">
                    &copy; {year} Made with <FaHeart className="text-pink-300" /> by Ferupin
                </div>
                
                <KoFiButton 
                    username="L4L81FXZQX" 
                    text="Buy me a coffee"
                    size="sm"
                    className="text-sm"
                />
                
                <div className="flex gap-4 text-xl">
                    <a
                        href="https://github.com/ferupin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        aria-label="GitHub"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/felipedmats/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin />
                    </a>
                </div>
            </div>

            {/* Desktop Layout: Three columns with Ko-Fi centered */}
            <div className="hidden md:grid md:grid-cols-3 md:items-center md:gap-4">
                {/* Left: Copyright */}
                <div className="text-sm flex gap-2 items-center">
                    &copy; {year} Made with <FaHeart className="text-pink-300" /> by Ferupin
                </div>
                
                {/* Center: Ko-Fi Button */}
                <div className="flex justify-center">
                    <KoFiButton 
                        username="L4L81FXZQX" 
                        text="Buy me a coffee"
                        size="sm"
                        className="text-sm"
                    />
                </div>
                
                {/* Right: Social Links */}
                <div className="flex gap-4 text-xl justify-end">
                    <a
                        href="https://github.com/ferupin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        aria-label="GitHub"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/felipedmats/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    );
}