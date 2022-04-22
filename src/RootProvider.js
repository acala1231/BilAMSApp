import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import RootNavigator from 'RootNavigator';

import { Loader, ErrorMessage } from 'components';
import configureStore from 'store/configureStore'
import rootSaga from 'sagas'


const RootProvider = () => {
  const store = configureStore();
  store.runSaga(rootSaga);

  return (
    <Provider store={store}>
      <PaperProvider>
        <RootNavigator>
        </RootNavigator>
      </PaperProvider>

      <Loader />
      <ErrorMessage />
    </Provider>
  );
};

export default RootProvider;