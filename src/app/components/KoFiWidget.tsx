"use client";
import { Coffee, Heart } from 'lucide-react';
import { useMemo } from 'react';

interface KoFiButtonProps {
  username: string;
  text?: string;
  className?: string;
  variant?: 'default' | 'minimal' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

export function KoFiButton({
  username,
  text = "Buy me a coffee",
  className = '',
  variant = 'default',
  size = 'md'
}: KoFiButtonProps) {
  const kofiUrl = `https://ko-fi.com/${username}`;
  
  // Use useMemo to ensure consistent values between server and client
  const classes = useMemo(() => {
    const sizeConfig = {
      sm: {
        container: 'px-4 py-2 text-sm gap-2',
        coffee: 'w-4 h-4',
        heart: 'w-3 h-3'
      },
      md: {
        container: 'px-6 py-3 text-base gap-2.5',
        coffee: 'w-5 h-5',
        heart: 'w-4 h-4'
      },
      lg: {
        container: 'px-8 py-4 text-lg gap-3',
        coffee: 'w-6 h-6',
        heart: 'w-5 h-5'
      }
    };

    const variantConfig = {
      default: 'bg-gradient-to-br from-orange-300 via-amber-200 to-yellow-300 hover:from-orange-400 hover:via-amber-300 hover:to-yellow-400 text-amber-800 hover:text-amber-900 border-2 border-amber-400/60 hover:border-amber-500/70 shadow-lg shadow-amber-200/40 hover:shadow-xl hover:shadow-amber-300/50',
      minimal: 'bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 hover:text-slate-800 border-2 border-slate-300/60 hover:border-slate-400/70 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-slate-300/50',
      gradient: 'bg-gradient-to-br from-pink-300 via-purple-200 to-indigo-300 hover:from-pink-400 hover:via-purple-300 hover:to-indigo-400 text-purple-800 hover:text-purple-900 border-2 border-purple-400/60 hover:border-purple-500/70 shadow-lg shadow-purple-200/40 hover:shadow-xl hover:shadow-purple-300/50'
    };

    const baseClasses = 'inline-flex items-center justify-center font-black rounded-2xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-98 hover:-rotate-1 focus:outline-none focus:ring-2 focus:ring-amber-300/60 focus:ring-offset-2 no-underline select-none cursor-pointer will-change-transform';

    return {
      container: `${baseClasses} ${sizeConfig[size].container} ${variantConfig[variant]} ${className}`,
      coffee: sizeConfig[size].coffee,
      heart: `${sizeConfig[size].heart} opacity-75`
    };
  }, [size, variant, className]);

  return (
    <a
      href={kofiUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.container}
    >
      <Coffee className={classes.coffee} />
      <span>{text}</span>
      <Heart className={classes.heart} />
    </a>
  );
}

// Alternative compact version for sidebars or minimal spaces
export function KoFiButtonCompact({
  username,
  className = ''
}: {
  username: string;
  className?: string;
}) {
  const kofiUrl = `https://ko-fi.com/${username}`;

  const classes = useMemo(() => {
    const baseClasses = 'inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-300 via-amber-200 to-yellow-300 hover:from-orange-400 hover:via-amber-300 hover:to-yellow-400 text-amber-800 border-2 border-amber-400/60 hover:border-amber-500/70 shadow-lg shadow-amber-200/40 hover:shadow-xl hover:shadow-amber-300/50 transition-all duration-300 ease-out transform hover:scale-105 active:scale-98 hover:-rotate-2 focus:outline-none focus:ring-2 focus:ring-amber-300/60 focus:ring-offset-2 no-underline select-none cursor-pointer will-change-transform';
    return `${baseClasses} ${className}`;
  }, [className]);
 
  return (
    <a
      href={kofiUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      title="Buy me a coffee"
    >
      <Coffee className="w-7 h-7" />
    </a>
  );
}