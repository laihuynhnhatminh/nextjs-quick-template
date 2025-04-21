import debounce from 'lodash/debounce';
import { useEffect, useRef, useState } from 'react';

import { useBrowserClient } from './use-browser-client';

export type MediaQueryType = 'mobile' | 'tablet' | 'desktop' | 'smarttv';

export default function useMediaQuery(defaultMediaType?: MediaQueryType) {
  const isBrowserClient = useBrowserClient();

  const [device, setDevice] = useState<MediaQueryType | undefined>(
    defaultMediaType === 'smarttv' ? 'desktop' : defaultMediaType,
  );

  const [dimensions, setDimensions] = useState<
    { width: number; height: number } | undefined
  >();

  // Ref to store the latest device and dimensions for less rerenders
  // This is necessary to avoid stale closures in the event handler
  // and ensure that we are always comparing against the latest values.
  const latestDevice = useRef(device);
  const latestDimensions = useRef(dimensions);

  useEffect(() => {
    if (!isBrowserClient) return;

    const checkDevice = () => {
      let newDevice: MediaQueryType;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width <= 768) {
        newDevice = 'mobile';
      } else if (width <= 960) {
        newDevice = 'tablet';
      } else {
        newDevice = 'desktop';
      }

      const newDimensions = { width, height };

      // Update device only if changed
      if (latestDevice.current !== newDevice) {
        latestDevice.current = newDevice;
        setDevice(newDevice);
      }

      // Update dimensions only if changed
      if (
        latestDimensions.current?.width !== width ||
        latestDimensions.current?.height !== height
      ) {
        latestDimensions.current = newDimensions;
        setDimensions(newDimensions);
      }
    };

    const debouncedCheckDevice = debounce(checkDevice, 100);

    checkDevice();
    window.addEventListener('resize', debouncedCheckDevice);

    return () => {
      window.removeEventListener('resize', debouncedCheckDevice);
    };
  }, [isBrowserClient]);

  return {
    device,
    width: dimensions?.width,
    height: dimensions?.height,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
    isMobileView: device === 'mobile' || device === 'tablet',
  };
}
