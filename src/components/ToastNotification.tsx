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
      <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
        {message}
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
      </div>
    </div>
  );
}
