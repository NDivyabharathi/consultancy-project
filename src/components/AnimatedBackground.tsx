import React from 'react';
import '../styles/animated-bg.css';

export const AnimatedBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="animated-bg-container">
      <svg className="textile-pattern" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        {/* Swirling textile patterns */}
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#888888" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#404040" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Large swirling circles */}
        <circle cx="200" cy="200" r="150" fill="none" stroke="url(#grad1)" strokeWidth="2" opacity="0.3" className="swirl-circle" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="url(#grad1)" strokeWidth="2" opacity="0.3" className="swirl-circle-reverse" />
        <circle cx="200" cy="200" r="90" fill="none" stroke="url(#grad1)" strokeWidth="2" opacity="0.3" className="swirl-circle" />

        {/* Spiral textile pattern */}
        <path
          d="M 200 80 Q 280 140 280 200 Q 280 280 200 320 Q 120 280 120 200 Q 120 140 200 80"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="3"
          opacity="0.2"
          className="swirl-path"
        />

        {/* Small decorative circles - textile weave pattern */}
        <g className="textile-weave" opacity="0.2">
          <circle cx="100" cy="100" r="8" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
          <circle cx="150" cy="80" r="6" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
          <circle cx="200" cy="70" r="7" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
          <circle cx="250" cy="85" r="6" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
          <circle cx="300" cy="110" r="8" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
          
          <circle cx="80" cy="150" r="6" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
          <circle cx="320" cy="160" r="7" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
          
          <circle cx="70" cy="200" r="7" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
          <circle cx="330" cy="210" r="6" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
          
          <circle cx="90" cy="280" r="8" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
          <circle cx="310" cy="290" r="7" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
          
          <circle cx="150" cy="320" r="6" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
          <circle cx="250" cy="330" r="8" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
        </g>

        {/* Connecting lines - fabric threads */}
        <g className="fabric-threads" opacity="0.15" strokeWidth="1" stroke="url(#grad1)">
          <line x1="100" y1="100" x2="150" y2="80" />
          <line x1="150" y1="80" x2="200" y2="70" />
          <line x1="200" y1="70" x2="250" y2="85" />
          <line x1="250" y1="85" x2="300" y2="110" />
          
          <line x1="100" y1="100" x2="80" y2="150" />
          <line x1="300" y1="110" x2="320" y2="160" />
          
          <line x1="80" y1="150" x2="70" y2="200" />
          <line x1="320" y1="160" x2="330" y2="210" />
          
          <line x1="70" y1="200" x2="90" y2="280" />
          <line x1="330" y1="210" x2="310" y2="290" />
          
          <line x1="90" y1="280" x2="150" y2="320" />
          <line x1="310" y1="290" x2="250" y2="330" />
        </g>
      </svg>

      {/* Multiple animated backgrounds at different layers */}
      <div className="textile-bg-layer layer-1"></div>
      <div className="textile-bg-layer layer-2"></div>
      <div className="textile-bg-layer layer-3"></div>

      {children}
    </div>
  );
};
