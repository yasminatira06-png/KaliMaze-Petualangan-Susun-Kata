import React from 'react';
import { motion } from 'motion/react';

interface GameButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'orange' | 'blue' | 'green' | 'purple' | 'gray';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
}

export const GameButton: React.FC<GameButtonProps> = ({
  children,
  onClick,
  variant = 'orange',
  size = 'md',
  disabled = false,
  className = '',
  title,
  icon
}) => {
  const variantClass = {
    orange: 'btn-game-orange text-white',
    blue: 'btn-game-blue text-white',
    green: 'btn-game-green text-white',
    purple: 'btn-game-purple text-white',
    gray: 'bg-slate-300 border-[3.5px] border-slate-600 text-slate-500 shadow-[0_5px_0_#475569] cursor-not-allowed opacity-80'
  }[variant];

  const sizeClass = {
    sm: 'py-1.5 px-3 text-xs sm:text-sm rounded-xl',
    md: 'py-2.5 px-5 text-sm sm:text-base rounded-2xl',
    lg: 'py-3.5 px-7 text-base sm:text-lg rounded-2xl',
    xl: 'py-4 px-8 text-lg sm:text-xl md:text-2xl rounded-2xl sm:rounded-3xl'
  }[size];

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      title={title}
      className={`font-heading font-black flex items-center justify-center gap-2 cursor-pointer select-none leading-none ${variantClass} ${sizeClass} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
