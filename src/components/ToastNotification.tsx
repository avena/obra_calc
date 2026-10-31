import { useEffect } from 'react';

interface ToastNotificationProps {
  message: string;
  type?: 'success' | 'danger' | 'warning' | 'info';
  show: boolean;
  onClose: () => void;
}

export default function ToastNotification({ message, type = 'success', show, onClose }: ToastNotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1100 }}>
      <div className={`toast show align-items-center text-bg-${type} border-0`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose} aria-label="Close"></button>
        </div>
      </div>
    </div>
  );
}
