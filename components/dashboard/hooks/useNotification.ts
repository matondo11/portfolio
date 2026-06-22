'use client';

import { toast as sonnerToast } from 'sonner';
import { NotificationPayload } from '@/types/dashboard';

export function useNotification() {
  const notify = (payload: NotificationPayload) => {
    const { type, title, message, action } = payload;

    switch (type) {
      case 'success':
        sonnerToast.success(title, {
          description: message,
          action: action ? { label: action.label, onClick: action.onClick } : undefined,
        });
        break;
      case 'error':
        sonnerToast.error(title, {
          description: message,
          action: action ? { label: action.label, onClick: action.onClick } : undefined,
        });
        break;
      case 'info':
        sonnerToast(title, {
          description: message,
          action: action ? { label: action.label, onClick: action.onClick } : undefined,
        });
        break;
      case 'warning':
        sonnerToast.warning(title, {
          description: message,
          action: action ? { label: action.label, onClick: action.onClick } : undefined,
        });
        break;
    }
  };

  return { notify };
}
