import { useState } from 'react';

export function useBrowserClient() {
  const [isBrowser] = useState(typeof window !== 'undefined');
  return isBrowser;
}
