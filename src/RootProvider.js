import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import * as Notifications from 'expo-notifications';

import RootNavigator from './RootNavigator';
import { Loader, AlertMessage, ConfirmMessage } from './components';
import configureStore from './store/configureStore'
import rootSaga from './sagas'


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// 기본테마
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ceae49',
  },
};


const RootProvider = () => {
  const store = configureStore();
  store.runSaga(rootSaga);

console.log('DefaultTheme', DefaultTheme);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
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