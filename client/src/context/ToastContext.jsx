import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = 'info', duration = 3500) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), duration);
    },
    [removeToast]
  );

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    info: (msg) => addToast(msg, 'info'),
    warning: (msg) => addToast(msg, 'warning'),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onClose={onClose} />
      ))}
    </div>
  );
};

const Toast = ({ toast, onClose }) => {
  const config = {
    success: {
      bg: 'bg-white',
      border: 'border-l-4 border-green-500',
      icon: '✓',
      iconBg: 'bg-green-100 text-green-600',
      text: 'text-gray-800',
    },
    error: {
      bg: 'bg-white',
      border: 'border-l-4 border-red-500',
      icon: '✕',
      iconBg: 'bg-red-100 text-red-600',
      text: 'text-gray-800',
    },
    warning: {
      bg: 'bg-white',
      border: 'border-l-4 border-yellow-500',
      icon: '!',
      iconBg: 'bg-yellow-100 text-yellow-600',
      text: 'text-gray-800',
    },
    info: {
      bg: 'bg-white',
      border: 'border-l-4 border-blue-500',
      icon: 'i',
      iconBg: 'bg-blue-100 text-blue-600',
      text: 'text-gray-800',
    },
  };

  const c = config[toast.type] || config.info;

  return (
    <div
      className={`pointer-events-auto ${c.bg} ${c.border} rounded-lg shadow-xl px-4 py-3 flex items-start gap-3 min-w-[280px] max-w-md fade-in`}
      style={{
        animation: 'toastSlideIn 0.3s ease-out',
      }}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${c.iconBg} font-bold text-sm`}
      >
        {c.icon}
      </div>
      <p className={`flex-1 text-sm font-medium ${c.text}`}>{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="text-gray-400 hover:text-gray-600 text-lg leading-none flex-shrink-0"
      >
        ×
      </button>
    </div>
  );
};