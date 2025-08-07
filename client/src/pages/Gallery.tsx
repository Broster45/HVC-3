import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Edit3, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import LazyImage from "@/components/LazyImage";

// Gallery Images - Use the select button in Replit to choose different images
// Each import can be easily changed using the image selector

const galleryImage1 = "/attached_assets/IMG_3886.jpg";
const galleryImage2 = "/attached_assets/IMG_0548.jpeg";
const galleryImage3 = "/attached_assets/IMG_3887.JPG";
const galleryImage4 = "/attached_assets/IMG_3889.JPG";
const galleryImage5 = "/attached_assets/IMG_3883.JPG";
const galleryImage6 = "/attached_assets/IMG_3273.JPEG";
const galleryImage7 = "/attached_assets/IMG_9218.JPEG";
const galleryImage8 = "/attached_assets/website photo dad_1751588144361.jpg";
const galleryImage9 = "/attached_assets/wood-1853403_1751588818138.jpg";

export default function Gallery() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [customImages, setCustomImages] = useState<{[key: number]: string}>({});
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  
  // Image zoom preview states
  const [zoomPreview, setZoomPreview] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
    description: string;
    currentIndex: number;
  }>({
    isOpen: false,
    imageUrl: "",
    title: "",
    description: "",
    currentIndex: 0
  });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  
  // Fixed gallery state - always shows the same 12 items in all environments
  const [additionalItems, setAdditionalItems] = useState<Array<{id: number, title: string, description: string, image: string}>>([
    {
      id: 10,
      title: "Master Bathroom Renovation",
      description: "Complete bathroom remodel featuring custom tile work, modern fixtures, and elegant finishes that transform this space into a luxurious retreat.",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ci8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMTUwVjEwMEgxMjVWMTI1SDEwMEwxMjUgMTUwTDEwMCAxNzVIMTI1VjIwMEgxNTBWMTc1SDE3NUwyMDAgMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIyMDAiIHk9IjI0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DbGljayB0byB1cGxvYWQgaW1hZ2U8L3RleHQ+Cjwvc3ZnPgo="
    },
    {
      id: 11,
      title: "Composite Deck Construction", 
      description: "New composite decking installation with modern railings and built-in lighting, creating the perfect outdoor entertainment space for family gatherings.",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ci8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMTUwVjEwMEgxMjVWMTI1SDEwMEwxMjUgMTUwTDEwMCAxNzVIMTI1VjIwMEgxNTBWMTc1SDE3NUwyMDAgMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIyMDAiIHk9IjI0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DbGljayB0byB1cGxvYWQgaW1hZ2U8L3RleHQ+Cjwvc3ZnPgo="
    },
    {
      id: 12,
      title: "Luxury Vinyl Plank Flooring",
      description: "Premium LVP flooring installation throughout the main living areas, providing durability and style with realistic wood-look patterns.",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ci8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMTUwVjEwMEgxMjVWMTI1SDEwMEwxMjUgMTUwTDEwMCAxNzVIMTI1VjIwMEgxNTBWMTc1SDE3NUwyMDAgMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIyMDAiIHk9IjI0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DbGljayB0byB1cGxvYWQgaW1hZ2U8L3RleHQ+Cjwvc3ZnPgo="
    }
  ]);
  
  const [nextId, setNextId] = useState(13);

  // Gallery items - default gallery items
  const galleryItems = [
    {
      id: 1,
      title: "Custom Home Framing",
      description: "Precision framing and structural work for a custom residential build, showcasing our attention to detail in foundation and framework construction",
      image: galleryImage1
    },
    {
      id: 2,
      title: "Kitchen Renovation Project", 
      description: "Complete kitchen transformation featuring modern appliances, custom cabinetry, and premium countertops for enhanced functionality and style",
      image: galleryImage2
    },
    {
      id: 3,
      title: "Interior Construction Progress",
      description: "Mid-construction interior work showing our meticulous approach to residential building and renovation projects", 
      image: galleryImage3
    },
    {
      id: 4,
      title: "Professional Construction Site",
      description: "Active construction site demonstrating our organized approach to project management and quality building practices",
      image: galleryImage4
    },
    {
      id: 5,
      title: "Structural Building Work",
      description: "Expert structural construction and framing work, highlighting our commitment to solid foundations and quality craftsmanship",
      image: galleryImage5
    },
    {
      id: 6,
      title: "Residential Construction",
      description: "On-site residential construction work showing our team's dedication to precision and professional building standards",
      image: galleryImage6
    },
    {
      id: 7,
      title: "Construction Team in Action", 
      description: "Highland Valley Construction crew at work, demonstrating our hands-on approach and commitment to excellence on every project",
      image: galleryImage7
    },
    {
      id: 8,
      title: "Meet Our Team",
      description: "Highland Valley Construction team member representing our experienced professionals dedicated to bringing your vision to life",
      image: galleryImage8
    },
    {
      id: 9,
      title: "Premium Building Materials",
      description: "High-quality wood and construction materials that exemplify our commitment to using only the finest materials in every project", 
      image: galleryImage9
    }
  ];

  // Force reload gallery data function
  const forceReloadGalleryData = () => {
    try {
      // Load custom images - try multiple sources
      let savedImages = localStorage.getItem('gallery-custom-images') ||
                       sessionStorage.getItem('gallery-custom-images') ||
                       localStorage.getItem('hvc-gallery-custom-images') ||
                       sessionStorage.getItem('hvc-gallery-custom-images');
      
      if (savedImages) {
        const parsedImages = JSON.parse(savedImages);
        setCustomImages(parsedImages);
      }
      
      // Load additional items - try multiple sources
      let savedItems = localStorage.getItem('gallery-additional-items') ||
                      sessionStorage.getItem('gallery-additional-items') ||
                      localStorage.getItem('hvc-gallery-additional-items') ||
                      sessionStorage.getItem('hvc-gallery-additional-items');
      
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        setAdditionalItems(parsedItems);
      }
      
      // Load next ID - try multiple sources
      let savedNextId = localStorage.getItem('gallery-next-id') ||
                       sessionStorage.getItem('gallery-next-id') ||
                       localStorage.getItem('hvc-gallery-next-id') ||
                       sessionStorage.getItem('hvc-gallery-next-id');
      
      if (savedNextId) {
        const parsedId = parseInt(savedNextId);
        setNextId(parsedId);
      }
    } catch (error) {
      console.error('Error force reloading gallery data:', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check localStorage availability
    const isStorageAvailable = (() => {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    })();
    
    // Load saved data from multiple storage locations
    try {
      // Load custom images - try multiple sources
      let savedImages = localStorage.getItem('gallery-custom-images') ||
                       sessionStorage.getItem('gallery-custom-images') ||
                       localStorage.getItem('hvc-gallery-custom-images') ||
                       sessionStorage.getItem('hvc-gallery-custom-images');
      
      if (savedImages) {
        const parsedImages = JSON.parse(savedImages);
        setCustomImages(parsedImages);
        
        // Sync to all storage locations
        localStorage.setItem('gallery-custom-images', JSON.stringify(parsedImages));
        sessionStorage.setItem('gallery-custom-images', JSON.stringify(parsedImages));
        localStorage.setItem('hvc-gallery-custom-images', JSON.stringify(parsedImages));
        sessionStorage.setItem('hvc-gallery-custom-images', JSON.stringify(parsedImages));
      }
      
      // Load additional items - try multiple sources
      let savedItems = localStorage.getItem('gallery-additional-items') ||
                      sessionStorage.getItem('gallery-additional-items') ||
                      localStorage.getItem('hvc-gallery-additional-items') ||
                      sessionStorage.getItem('hvc-gallery-additional-items');
      
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        setAdditionalItems(parsedItems);
        
        // Sync to all storage locations
        localStorage.setItem('gallery-additional-items', JSON.stringify(parsedItems));
        sessionStorage.setItem('gallery-additional-items', JSON.stringify(parsedItems));
        localStorage.setItem('hvc-gallery-additional-items', JSON.stringify(parsedItems));
        sessionStorage.setItem('hvc-gallery-additional-items', JSON.stringify(parsedItems));
      }
      
      // Load next ID - try multiple sources
      let savedNextId = localStorage.getItem('gallery-next-id') ||
                       sessionStorage.getItem('gallery-next-id') ||
                       localStorage.getItem('hvc-gallery-next-id') ||
                       sessionStorage.getItem('hvc-gallery-next-id');
      
      if (savedNextId) {
        const parsedId = parseInt(savedNextId);
        setNextId(parsedId);
        
        // Sync to all storage locations
        localStorage.setItem('gallery-next-id', savedNextId);
        sessionStorage.setItem('gallery-next-id', savedNextId);
        localStorage.setItem('hvc-gallery-next-id', savedNextId);
        sessionStorage.setItem('hvc-gallery-next-id', savedNextId);
      }
    } catch (error) {
      console.error('Error loading gallery data from storage:', error);
    }

    // Set up periodic refresh to sync with other tabs - less frequent for performance
    const interval = setInterval(() => {
      forceReloadGalleryData();
    }, 10000); // Check every 10 seconds instead of 3

    return () => clearInterval(interval);
  }, []);

  const compressImage = useCallback((file: File, maxWidth = 800, quality = 0.8): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      
      img.src = URL.createObjectURL(file);
    });
  }, []);

  const handleImageUpload = async (itemId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        const newImages = {
          ...customImages,
          [itemId]: compressedImage
        };
        setCustomImages(newImages);
        
        try {
          // Store in multiple locations for better persistence
          localStorage.setItem('gallery-custom-images', JSON.stringify(newImages));
          sessionStorage.setItem('gallery-custom-images', JSON.stringify(newImages));
          
          // Also try to store with domain-specific keys
          const baseKey = 'hvc-gallery-custom-images';
          localStorage.setItem(baseKey, JSON.stringify(newImages));
          sessionStorage.setItem(baseKey, JSON.stringify(newImages));
          
        } catch (storageError) {
          // If storage quota exceeded, clear old images and try again
          const essentialImages = { [itemId]: compressedImage };
          setCustomImages(essentialImages);
          localStorage.setItem('gallery-custom-images', JSON.stringify(essentialImages));
          sessionStorage.setItem('gallery-custom-images', JSON.stringify(essentialImages));
          alert('Storage limit reached. Previous uploaded images were cleared to make space for the new one.');
        }
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Error uploading image. Please try a smaller file.');
      }
    }
  };

  const startEditing = (item: any) => {
    setEditingItem(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const saveEdit = (itemId: number) => {
    // Update additional items if it's a new item
    if (itemId >= 10) {
      const updatedItems = additionalItems.map(item => 
        item.id === itemId 
          ? { ...item, title: editTitle, description: editDescription }
          : item
      );
      setAdditionalItems(updatedItems);
      try {
        // Save to multiple storage locations
        localStorage.setItem('gallery-additional-items', JSON.stringify(updatedItems));
        sessionStorage.setItem('gallery-additional-items', JSON.stringify(updatedItems));
        localStorage.setItem('hvc-gallery-additional-items', JSON.stringify(updatedItems));
        sessionStorage.setItem('hvc-gallery-additional-items', JSON.stringify(updatedItems));
        
      } catch (error) {
        console.error('Error saving gallery edit:', error);
      }
    }
    setEditingItem(null);
  };

  const addNewPhoto = () => {
    const newItem = {
      id: nextId,
      title: "New Project",
      description: "Click Edit Text to add description",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ci8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMTUwVjEwMEgxMjVWMTI1SDEwMEwxMjUgMTUwTDEwMCAxNzVIMTI1VjIwMEgxNTBWMTc1SDE3NUwyMDAgMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIyMDAiIHk9IjI0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DbGljayB0byB1cGxvYWQgaW1hZ2U8L3RleHQ+Cjwvc3ZnPgo="
    };
    const updatedItems = [...additionalItems, newItem];
    const newNextId = nextId + 1;
    
    setAdditionalItems(updatedItems);
    setNextId(newNextId);
    
    try {
      // Save to multiple storage locations
      localStorage.setItem('gallery-additional-items', JSON.stringify(updatedItems));
      sessionStorage.setItem('gallery-additional-items', JSON.stringify(updatedItems));
      localStorage.setItem('hvc-gallery-additional-items', JSON.stringify(updatedItems));
      sessionStorage.setItem('hvc-gallery-additional-items', JSON.stringify(updatedItems));
      
      localStorage.setItem('gallery-next-id', newNextId.toString());
      sessionStorage.setItem('gallery-next-id', newNextId.toString());
      localStorage.setItem('hvc-gallery-next-id', newNextId.toString());
      sessionStorage.setItem('hvc-gallery-next-id', newNextId.toString());
      
    } catch (error) {
      console.error('Error saving gallery:', error);
    }
  };

  const removePhoto = (itemId: number) => {
    const updatedItems = additionalItems.filter(item => item.id !== itemId);
    setAdditionalItems(updatedItems);
    
    // Remove custom image if it exists
    const newImages = { ...customImages };
    delete newImages[itemId];
    setCustomImages(newImages);
    
    try {
      // Save to multiple storage locations
      localStorage.setItem('gallery-additional-items', JSON.stringify(updatedItems));
      sessionStorage.setItem('gallery-additional-items', JSON.stringify(updatedItems));
      localStorage.setItem('hvc-gallery-additional-items', JSON.stringify(updatedItems));
      sessionStorage.setItem('hvc-gallery-additional-items', JSON.stringify(updatedItems));
      
      localStorage.setItem('gallery-custom-images', JSON.stringify(newImages));
      sessionStorage.setItem('gallery-custom-images', JSON.stringify(newImages));
      localStorage.setItem('hvc-gallery-custom-images', JSON.stringify(newImages));
      sessionStorage.setItem('hvc-gallery-custom-images', JSON.stringify(newImages));
      
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  };

  const getImageSource = (item: any) => {
    return customImages[item.id] || item.image;
  };

  // Zoom preview functions
  const openZoomPreview = (item: any, index: number) => {
    if (isEditMode) return; // Don't open zoom in edit mode
    
    setZoomPreview({
      isOpen: true,
      imageUrl: getImageSource(item),
      title: item.title,
      description: item.description,
      currentIndex: index
    });
    setZoomLevel(1);
    setRotation(0);
    setPanPosition({ x: 0, y: 0 });
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeZoomPreview = () => {
    setZoomPreview({
      isOpen: false,
      imageUrl: "",
      title: "",
      description: "",
      currentIndex: 0
    });
    setZoomLevel(1);
    setRotation(0);
    setPanPosition({ x: 0, y: 0 });
    setIsDragging(false);
    // Restore body scroll
    document.body.style.overflow = 'auto';
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      const deltaX = e.clientX - lastMousePosition.x;
      const deltaY = e.clientY - lastMousePosition.y;
      
      setPanPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const allItems = [...galleryItems, ...additionalItems];
    const currentIndex = zoomPreview.currentIndex;
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : allItems.length - 1;
    } else {
      newIndex = currentIndex < allItems.length - 1 ? currentIndex + 1 : 0;
    }
    
    const newItem = allItems[newIndex];
    setZoomPreview(prev => ({
      ...prev,
      imageUrl: getImageSource(newItem),
      title: newItem.title,
      description: newItem.description,
      currentIndex: newIndex
    }));
    setZoomLevel(1);
    setRotation(0);
    setPanPosition({ x: 0, y: 0 });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!zoomPreview.isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeZoomPreview();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case 'r':
        case 'R':
          handleRotate();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomPreview.isOpen]);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };



  // Combine original gallery items with additional items
  const allGalleryItems = [...galleryItems, ...additionalItems];

  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-charcoal mb-4 sm:mb-6">
            Our Work
          </h1>
          <p className="text-lg sm:text-xl text-brand-grey max-w-3xl mx-auto leading-relaxed">
            Take a look at some of our recent projects showcasing our commitment 
            to quality craftsmanship and attention to detail
          </p>
        </div>
      </section>
      
      

      {/* Gallery Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#607b8a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {allGalleryItems.map((item, index) => (
              <div 
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => !isEditMode && openZoomPreview(item, index)}
              >
                {/* Image Upload Overlay (Edit Mode) */}
                {isEditMode && (
                  <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center">
                    <div className="text-center">
                      <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(item.id, e)}
                          className="hidden"
                        />
                      </label>
                      <div className="mt-2">
                        <Button
                          size="sm"
                          onClick={() => startEditing(item)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Edit3 className="h-3 w-3 mr-1" />
                          Edit Text
                        </Button>
                        {item.id >= 10 && (
                          <div className="mt-2">
                            <Button
                              size="sm"
                              onClick={() => removePhoto(item.id)}
                              variant="destructive"
                            >
                              <X className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Zoom icon overlay for preview mode */}
                {!isEditMode && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn className="h-6 w-6 text-gray-800" />
                      </div>
                    </div>
                  </div>
                )}

                <LazyImage 
                  src={getImageSource(item)}
                  alt={item.title}
                  title={item.title}
                  className="w-full h-64 sm:h-72 md:h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />

              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green-light text-white font-bold border-2 border-brand-charcoal hover:border-brand-slate-dark shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base px-6 sm:px-8 py-3">
              <Link href="/contact">Start Your Project Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Edit Dialog */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit Gallery Item</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingItem(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Project title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Project description"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditingItem(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => saveEdit(editingItem)}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Zoom Preview Modal */}
      {zoomPreview.isOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center transition-all duration-300"
          onClick={(e) => e.target === e.currentTarget && closeZoomPreview()}
        >
          {/* Header Controls */}
          <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h3 className="text-white text-xl font-semibold">{zoomPreview.title}</h3>
              <span className="text-white/70 text-sm">
                {zoomPreview.currentIndex + 1} / {allGalleryItems.length}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeZoomPreview}
              className="text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              className="text-white hover:bg-white/20"
              disabled={zoomLevel <= 0.5}
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
            <span className="text-white text-sm min-w-[60px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              className="text-white hover:bg-white/20"
              disabled={zoomLevel >= 3}
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRotate}
              className="text-white hover:bg-white/20 ml-4"
            >
              <RotateCw className="h-5 w-5" />
            </Button>
          </div>

          {/* Image Description */}
          {zoomPreview.description && (
            <div className="absolute bottom-4 right-4 max-w-md z-10">
              <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4">
                <p className="text-white/90 text-sm">{zoomPreview.description}</p>
              </div>
            </div>
          )}

          {/* Keyboard Shortcuts Info */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-white/70 text-xs text-center">
                Press ESC to close • ← → to navigate • Scroll to zoom • R to rotate
              </p>
            </div>
          </div>

          {/* Main Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <img
              src={zoomPreview.imageUrl}
              alt={zoomPreview.title}
              className="max-w-full max-h-full object-contain transition-all duration-300 ease-out"
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg) translate(${panPosition.x}px, ${panPosition.y}px)`,
                cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
              }}
              draggable={false}
              onLoad={() => {
                // Reset position when new image loads
                setPanPosition({ x: 0, y: 0 });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}