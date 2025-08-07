import React, { useState, useRef, useEffect, memo } from 'react';

interface MobileOptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  title?: string;
  onClick?: () => void;
  lowQualitySrc?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

const MobileOptimizedImage = memo(({ 
  src, 
  alt, 
  className = '', 
  title, 
  onClick,
  lowQualitySrc,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy'
}: MobileOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loading]);

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string) => {
    // For demo purposes, we'll use the same image
    // In production, you'd have different sizes
    return `${baseSrc} 1x, ${baseSrc} 2x`;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  const shouldShowImage = isInView || loading === 'eager';

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {/* Low quality placeholder */}
      {lowQualitySrc && !isLoaded && shouldShowImage && (
        <img
          src={lowQualitySrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-105 transition-opacity duration-300"
          style={{ opacity: isLoaded ? 0 : 1 }}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {shouldShowImage && (
        <img
          src={src}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          title={title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          decoding="async"
          style={{
            contentVisibility: 'auto',
            containIntrinsicSize: '300px 200px'
          }}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <div className="text-center">
            <svg 
              className="w-12 h-12 mx-auto mb-2 opacity-50" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Loading placeholder */}
      {!shouldShowImage && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="flex items-center justify-center h-full">
            <svg 
              className="w-8 h-8 text-gray-400 animate-spin" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
});

MobileOptimizedImage.displayName = 'MobileOptimizedImage';

export default MobileOptimizedImage;