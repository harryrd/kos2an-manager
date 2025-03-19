
import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface AnimatedTransitionProps {
  children: React.ReactNode;
}

export function AnimatedTransition({ children }: AnimatedTransitionProps) {
  const location = useLocation();
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      element.style.opacity = "0";
      element.style.transform = "translateY(10px)";
      
      // Trigger reflow
      void element.offsetWidth;
      
      element.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
    
    return () => {
      if (element) {
        element.style.opacity = "0";
        element.style.transform = "translateY(10px)";
      }
    };
  }, [location.pathname]);
  
  return (
    <div ref={elementRef} className="min-h-[calc(100vh-3rem)]">
      {children}
    </div>
  );
}
