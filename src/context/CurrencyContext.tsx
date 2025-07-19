import React, { createContext, useContext, useState, useEffect } from 'react';

interface CurrencyContextType {
  currencySymbol: string;
  setCurrencySymbol: (symbol: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencySymbol, setCurrencySymbolState] = useState('лв');

  // Load currency symbol from localStorage on mount
  useEffect(() => {
    const savedSymbol = localStorage.getItem('currencySymbol');
    if (savedSymbol) {
      setCurrencySymbolState(savedSymbol);
    }
  }, []);

  const setCurrencySymbol = (symbol: string) => {
    setCurrencySymbolState(symbol);
    localStorage.setItem('currencySymbol', symbol);
  };

  return (
    <CurrencyContext.Provider value={{ currencySymbol, setCurrencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};