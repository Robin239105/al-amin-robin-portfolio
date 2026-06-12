import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    // Exclude admin pages from visitor tracking
    if (location.pathname.startsWith('/admin')) {
      return;
    }

    try {
      // Check or initialize a session ID
      let sessionId = sessionStorage.getItem('visitor_session_id');
      if (!sessionId) {
        sessionId = 'sess_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
        sessionStorage.setItem('visitor_session_id', sessionId);
      }

      fetch('/api/track-visitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          pagePath: location.pathname,
        }),
      }).catch((err) => {
        console.error('Visitor tracking request error:', err);
      });
    } catch (e) {
      console.error('Visitor tracking storage error:', e);
    }
  }, [location.pathname]);

  return null;
}
