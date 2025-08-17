// components/ui/badge.tsx

import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  color?: string; // Optional: pass a color (e.g., "bg-blue-500 text-white")
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({ children, color, className }) => {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${color ? color : 'bg-gray-200 text-gray-800'} ${className || ''}`}
    >
      {children}
    </span>
  );
};

export default Badge;
