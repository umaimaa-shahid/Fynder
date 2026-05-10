// SendRequests.jsx
// This page is now handled inside Requests.jsx (Sent tab).
// This file keeps the route alive and redirects cleanly.
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SendRequests() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/app/requests', { state: { openTab: 'sent' }, replace: true });
  }, []);
  return null;
}