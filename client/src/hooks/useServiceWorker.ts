import { useEffect, useState } from 'react';

export interface ServiceWorkerStatus {
  isSupported: boolean;
  isInstalled: boolean;
  isWaiting: boolean;
  isControlled: boolean;
  canUpdate: boolean;
}

export const useServiceWorker = () => {
  const [status, setStatus] = useState<ServiceWorkerStatus>({
    isSupported: 'serviceWorker' in navigator,
    isInstalled: false,
    isWaiting: false,
    isControlled: false,
    canUpdate: false,
  });

  useEffect(() => {
    if (!status.isSupported) return;

    const updateStatus = () => {
      const registration = navigator.serviceWorker?.controller;
      setStatus(prev => ({
        ...prev,
        isInstalled: !!registration,
        isControlled: !!registration,
      }));
    };

    const handleStateChange = () => {
      updateStatus();
    };

    const handleControllerChange = () => {
      updateStatus();
    };

    // Check initial state
    updateStatus();

    // Listen for changes
    navigator.serviceWorker?.addEventListener('controllerchange', handleControllerChange);

    return () => {
      navigator.serviceWorker?.removeEventListener('controllerchange', handleControllerChange);
    };
  }, [status.isSupported]);

  const installServiceWorker = async (swUrl: string) => {
    if (!status.isSupported) {
      throw new Error('Service Workers are not supported in this browser');
    }

    try {
      const registration = await navigator.serviceWorker.register(swUrl);
      
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setStatus(prev => ({
                ...prev,
                isWaiting: true,
                canUpdate: true,
              }));
            }
          });
        }
      });

      setStatus(prev => ({
        ...prev,
        isInstalled: true,
      }));

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      throw error;
    }
  };

  const updateServiceWorker = async () => {
    if (!navigator.serviceWorker.controller) return;

    const registration = await navigator.serviceWorker.getRegistration();
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      setStatus(prev => ({
        ...prev,
        isWaiting: false,
        canUpdate: false,
      }));
    }
  };

  return {
    status,
    installServiceWorker,
    updateServiceWorker,
  };
};