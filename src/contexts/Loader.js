import React, { createContext, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { loaderStlye } from 'styles/styles'

const initialState = {
  isLoading: false,
  loader: () => { },
};

const LoaderContext = createContext(initialState);

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const loader = {
    start: () => setIsLoading(true),
    stop: () => setIsLoading(false),
  };
  const value = { isLoading, loader };
  return (
    <LoaderContext.Provider value={value}>
      {children}
      {isLoading ?
        <ActivityIndicator
          style={loaderStlye.indicator}
          size={'large'}
        />
        :
        <></>
      }
    </LoaderContext.Provider>
  );
};

export { LoaderContext, LoaderProvider };


