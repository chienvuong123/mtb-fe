import { useIsMutating } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';

interface IDebounceMutating {
  mutationKey?: string[];
  delay?: number;
}

function useDebouncedMutating({ delay = 100, mutationKey }: IDebounceMutating) {
  const mutatingCount = useIsMutating({ mutationKey });
  const [isMutating, setIsMutating] = useState(mutatingCount > 0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (mutatingCount > 0) {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsMutating(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsMutating(false);
        timeoutRef.current = null;
      }, delay);
    }

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mutatingCount, delay]);

  return isMutating;
}

export default useDebouncedMutating;
