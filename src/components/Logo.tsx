import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 120 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Navy Circle with Gold Border */}
      <circle cx="50" cy="50" r="48" fill="#02074d" stroke="#c5a059" strokeWidth="1" />
      
      {/* Inner Cream Circle with Gold Border */}
      <circle cx="50" cy="50" r="32" fill="#e8e4d9" stroke="#c5a059" strokeWidth="0.8" />
      
      {/* Curved Text Path - Centered in the navy ring */}
      <defs>
        <path
          id="topPath"
          d="M 10,50 A 40,40 0 0,1 90,50"
        />
        <path
          id="bottomPath"
          d="M 10,50 A 40,40 0 0,0 90,50"
        />
      </defs>

      {/* Top Text: ENGLISH - Centered in the navy ring */}
      <text fill="#ffffff" fontSize="11" fontWeight="900" fontFamily="'Playfair Display', serif" letterSpacing="0.05em">
        <textPath href="#topPath" startOffset="50%" textAnchor="middle" dy="3.5">
          ENGLISH
        </textPath>
      </text>

      {/* Bottom Text: EXCELLENCE - Centered in the navy ring */}
      <text fill="#ffffff" fontSize="11" fontWeight="900" fontFamily="'Playfair Display', serif" letterSpacing="0.05em">
        <textPath href="#bottomPath" startOffset="50%" textAnchor="middle" dy="8.5">
          EXCELLENCE
        </textPath>
      </text>

      {/* Separator Dots - White */}
      <circle cx="10" cy="50" r="2" fill="#ffffff" />
      <circle cx="90" cy="50" r="2" fill="#ffffff" />

      {/* Center Pen Icon - Detailed Fountain Pen */}
      <g transform="translate(44, 30) scale(0.65)">
        {/* Pen Cap/Body */}
        <path d="M 4,0 L 14,0 L 14,30 L 4,30 Z" fill="#02074d" />
        <path d="M 4,2 L 14,2" stroke="#e8e4d9" strokeWidth="0.5" />
        <path d="M 4,28 L 14,28" stroke="#e8e4d9" strokeWidth="0.5" />
        
        {/* Pen Clip */}
        <path d="M 4,5 Q -2,5 -2,15 Q -2,25 4,25" fill="none" stroke="#02074d" strokeWidth="1.5" />
        
        {/* Pen Nib Holder */}
        <path d="M 5,30 L 13,30 L 11,35 L 7,35 Z" fill="#02074d" />
        
        {/* Pen Nib */}
        <path d="M 4,35 L 14,35 L 9,55 Z" fill="#02074d" />
        <line x1="9" y1="35" x2="9" y2="48" stroke="#e8e4d9" strokeWidth="0.5" />
        
        {/* Top Detail */}
        <path d="M 4,0 Q 9,-4 14,0" fill="#02074d" />
      </g>

      {/* HSC and TUTOR Text with Lines */}
      <g fill="#02074d" fontFamily="sans-serif" fontWeight="bold">
        {/* HSC Section */}
        <text x="32" y="51" fontSize="4.5" textAnchor="middle" letterSpacing="0.05em">HSC</text>
        <line x1="24" y1="45" x2="40" y2="45" stroke="#02074d" strokeWidth="0.4" />
        <line x1="24" y1="54" x2="40" y2="54" stroke="#02074d" strokeWidth="0.4" />

        {/* TUTOR Section */}
        <text x="68" y="51" fontSize="4.5" textAnchor="middle" letterSpacing="0.05em">TUTOR</text>
        <line x1="60" y1="45" x2="76" y2="45" stroke="#02074d" strokeWidth="0.4" />
        <line x1="60" y1="54" x2="76" y2="54" stroke="#02074d" strokeWidth="0.4" />
      </g>
    </svg>
  );
}
