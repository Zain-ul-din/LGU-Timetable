import { useEffect, ReactNode, useState } from 'react';

const STORAGE_KEY = 'SESSION_RENDER_ONCE';

export default function RenderOnce({ children, uid }: { children: ReactNode; uid: string }) {
  const [shouldRender] = useState(() => localStorage.getItem(STORAGE_KEY) !== uid);

  useEffect(() => {
    if (!shouldRender) return;
    localStorage.setItem(STORAGE_KEY, uid);
  }, [shouldRender, uid]);

  return shouldRender ? <>{children}</> : null;
}
