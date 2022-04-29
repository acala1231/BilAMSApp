import React from 'react';
import { Provider } from 'react-redux';
import { DarkTheme, DefaultTheme,  Provider as PaperProvider } from 'react-native-paper';

import RootNavigator from './RootNavigator';
import { Loader, AlertMessage, ConfirmMessage } from './components';
import configureStore from './store/configureStore'
import rootSaga from './sagas'


const RootProvider = () => {
  const store = configureStore();
  store.runSaga(rootSaga);

  return (
    <Provider store={store}>
      <PaperProvider
        // theme={DarkTheme}
      >
        <RootNavigator>
        </RootNavigator>
      </PaperProvider>

      <Loader />
      <AlertMessage />
      <ConfirmMessage />
    </Provider >
  );
};

export default RootProvider;