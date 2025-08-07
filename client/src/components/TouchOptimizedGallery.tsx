import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LazyImage from './LazyImage';

interface TouchOptimizedGalleryProps {
  items: Array<{
    id: number;
    title: string;
    description?: string;
    src: string;
  }>;
  initialIndex?: number;
  onClose: () => void;
}

const TouchOptimizedGallery = memo(({ items, initialIndex = 0, onClose }: TouchOptimizedGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchDistance, setTouchDistance] = useState(0);
  const [lastTouchEnd, setLastTouchEnd] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const currentItem = items[currentIndex];

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    resetImageTransform();
  }, [items.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    resetImageTransform();
  }, [items.length]);

  const resetImageTransform = useCallback(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setRotation(0);
  }, []);

  // Touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 1) {
      // Single touch - potential pan or swipe
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setIsDragging(true);
    } else if (e.touches.length === 2) {
      // Two fingers - pinch to zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      setTouchDistance(distance);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 1 && isDragging) {
      // Single touch - pan if zoomed, or prepare for swipe
      const currentTouch = e.touches[0];
      const deltaX = currentTouch.clientX - touchStart.x;
      const deltaY = currentTouch.clientY - touchStart.y;
      
      if (zoomLevel > 1) {
        // Pan the zoomed image
        setPanPosition(prev => ({
          x: prev.x + deltaX * 0.5,
          y: prev.y + deltaY * 0.5
        }));
        setTouchStart({ x: currentTouch.clientX, y: currentTouch.clientY });
      }
    } else if (e.touches.length === 2 && touchDistance > 0) {
      // Pinch to zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      const scale = currentDistance / touchDistance;
      const newZoom = Math.max(0.5, Math.min(3, zoomLevel * scale));
      setZoomLevel(newZoom);
      setTouchDistance(currentDistance);
    }
  }, [isDragging, touchStart, zoomLevel, touchDistance]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      // All touches ended
      if (isDragging && zoomLevel <= 1) {
        // Check for swipe gesture
        const deltaX = e.changedTouches[0].clientX - touchStart.x;
        const deltaY = Math.abs(e.changedTouches[0].clientY - touchStart.y);
        
        // Horizontal swipe with minimal vertical movement
        if (Math.abs(deltaX) > 50 && deltaY < 100) {
          if (deltaX > 0) {
            goToPrev();
          } else {
            goToNext();
          }
        }
      }
      
      // Double tap to zoom
      const now = Date.now();
      if (now - lastTouchEnd < 300) {
        if (zoomLevel > 1) {
          resetImageTransform();
        } else {
          setZoomLevel(2);
        }
      }
      setLastTouchEnd(now);
      
      setIsDragging(false);
      setTouchDistance(0);
    }
  }, [isDragging, zoomLevel, touchStart, goToNext, goToPrev, resetImageTransform, lastTouchEnd]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'r':
        case 'R':
          setRotation(prev => prev + 90);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goToNext, goToPrev]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-white text-lg sm:text-xl font-semibold truncate max-w-[200px] sm:max-w-none">
              {currentItem.title}
            </h3>
            <span className="text-white/70 text-sm">
              {currentIndex + 1} / {items.length}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 shrink-0"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>
      </div>

      {/* Navigation Arrows - Hidden on small screens */}
      <Button
        variant="ghost"
        size="lg"
        onClick={goToPrev}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20 hidden sm:flex"
      >
        <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
      </Button>

      <Button
        variant="ghost"
        size="lg"
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20 hidden sm:flex"
      >
        <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
      </Button>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-between p-4">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.2))}
              className="text-white hover:bg-white/20"
              disabled={zoomLevel <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-white text-sm min-w-[50px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.2))}
              className="text-white hover:bg-white/20"
              disabled={zoomLevel >= 3}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRotation(prev => prev + 90)}
              className="text-white hover:bg-white/20 ml-2"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-2 sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrev}
              className="text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              className="text-white hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center pb-4">
          <p className="text-white/70 text-xs">
            <span className="hidden sm:inline">Press ESC to close • ← → to navigate • </span>
            <span className="sm:hidden">Swipe to navigate • Pinch to zoom • Double tap to reset • </span>
            R to rotate
          </p>
        </div>
      </div>

      {/* Description */}
      {currentItem.description && (
        <div className="absolute bottom-20 right-4 max-w-sm z-20 hidden sm:block">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white/90 text-sm">{currentItem.description}</p>
          </div>
        </div>
      )}

      {/* Image Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          ref={imageRef}
          src={currentItem.src}
          alt={currentItem.title}
          className="max-w-full max-h-full object-contain transition-transform duration-300 ease-out select-none"
          style={{
            transform: `scale(${zoomLevel}) rotate(${rotation}deg) translate(${panPosition.x}px, ${panPosition.y}px)`,
          }}
          draggable={false}
          onLoad={resetImageTransform}
        />
      </div>
    </div>
  );
});

TouchOptimizedGallery.displayName = 'TouchOptimizedGallery';

export default TouchOptimizedGallery;