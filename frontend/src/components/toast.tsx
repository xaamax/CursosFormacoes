import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./toast.css";

type ToastContextType = {
  toast: (props: ToastProps) => void;
};

const ToastContext = React.createContext<ToastContextType | null>(null);

type ToastPosition = 
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

type SwipeDirection = 'up' | 'down' | 'left' | 'right';

type ToastProps = {
  title: string;
  description: string;
  variant?: 'default' | 'destructive' | 'success';
  position?: ToastPosition;
  swipeDirection?: SwipeDirection;
  action?: React.ReactNode;
  duration?: number;
};

const ToastComponent = ({ 
  title, 
  description, 
  variant = "default", 
  action,
  duration = 3000,
  onOpenChange 
}: ToastProps & { onOpenChange: (open: boolean) => void }) => {
  return (
    <ToastPrimitives.Root
      className={`toast-root ${variant}`}
      duration={duration}
      onOpenChange={onOpenChange}
    >
      <ToastPrimitives.Title className="toast-title">
        {title}
      </ToastPrimitives.Title>
      <ToastPrimitives.Description className="toast-description">
        {description}
      </ToastPrimitives.Description>
      {action && (
        <ToastPrimitives.Action asChild altText="Ação">
          {action}
        </ToastPrimitives.Action>
      )}
      <ToastPrimitives.Close className="toast-close">
        <Cross2Icon />
      </ToastPrimitives.Close>
    </ToastPrimitives.Root>
  );
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<(ToastProps & { id: string })[]>([]);

  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { 
      ...props, 
      id, 
      position: props.position || 'top-right',
      swipeDirection: props.swipeDirection || 'up'
    }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, props.duration || 3000);
  };

  const toastsByPositionAndSwipe = toasts.reduce((acc, toast) => {
    const position = toast.position || 'top-right';
    const swipeDirection = toast.swipeDirection || 'up';
    const key = `${position}-${swipeDirection}`;
    
    if (!acc[key]) {
      acc[key] = {
        position,
        swipeDirection,
        toasts: []
      };
    }
    acc[key].toasts.push(toast);
    return acc;
  }, {} as Record<string, { position: ToastPosition; swipeDirection: SwipeDirection; toasts: (ToastProps & { id: string })[] }>);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      {Object.values(toastsByPositionAndSwipe).map(({ position, swipeDirection, toasts: groupToasts }) => (
        <ToastPrimitives.Provider 
          key={`${position}-${swipeDirection}`}
          swipeDirection={swipeDirection}
        >
          <ToastPrimitives.Viewport 
            className={`toast-viewport ${position}`}
          />
          {groupToasts.map((toastProps) => (
            <ToastComponent 
              key={toastProps.id}
              {...toastProps}
              onOpenChange={(open) => !open && setToasts((prev) => prev.filter((t) => t.id !== toastProps.id))}
            />
          ))}
        </ToastPrimitives.Provider>
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastViewport = ToastPrimitives.Viewport;
export const Toast = ToastComponent;