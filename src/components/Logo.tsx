import React from 'react';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
}

export function Logo(props: LogoProps) {
  const { size = 60, style, ...rest } = props;
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/logoEng-ex.jpg?alt=media&token=072db962-82e2-4bab-9d95-0a3948463c41";

  const componentStyle = { ...style, width: size, height: 'auto' };

  return (
    <img
      src={logoUrl}
      alt="English Excellence Logo"
      {...rest}
      style={componentStyle}
    />
  );
}
