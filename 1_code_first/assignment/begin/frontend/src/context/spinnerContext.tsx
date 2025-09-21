import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { ClipLoader } from 'react-spinners';

interface SpinnerContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SpinnerContext = createContext<SpinnerContextType | undefined>(undefined);

export const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error('useSpinner must be used within a SpinnerProvider');
  }
  return context;
};

export const SpinnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SpinnerContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}>
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}
    </SpinnerContext.Provider>
  );
};