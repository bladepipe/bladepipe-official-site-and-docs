import React from 'react';
import { CookiesProvider } from 'react-cookie';

// Default implementation, that you can customize
export default function Root({children}) {
  return (
    <CookiesProvider>
      {children}
    </CookiesProvider>
  );
}
