import React from 'react';

// All props of <img> are valid
interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
}

export function Logo(props: LogoProps) {
  const { size = 60, style, ...rest } = props;
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/Logoblue.png?alt=media&token=f70fb522-82ee-4f79-a43b-2e6a22ab7fd7";

  return (
    <img
      src={logoUrl}
      alt="English Excellence Logo"
      className="logo-spin"
      {...rest}
      style={{ width: size, height: 'auto', ...style }}
    />
  );
}
