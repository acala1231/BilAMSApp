import React, { useContext } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
// import { NavigationContainer } from '@react-navigation/native';

import rootReducer from 'reducers';
import { LoaderProvider, UserProvider } from 'contexts'
import RootNavigator from 'RootNavigator';

const RootProvider = () => {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <LoaderProvider>
        <UserProvider>
          <PaperProvider>
            <RootNavigator>
            </RootNavigator>
          </PaperProvider>
        </UserProvider>
      </LoaderProvider>
    </Provider>
  );
};

export default RootProvider;