import React, { useContext } from 'react';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
// import { NavigationContainer } from '@react-navigation/native';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import rootReducer from 'reducers';
import { LoaderProvider, UserProvider } from 'contexts'
import RootNavigator from 'RootNavigator';

const RootProvider = () => {
  // const store = createStore(rootReducer);
  const store = createStore(
    rootReducer,
    // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
    composeWithDevTools(applyMiddleware(ReduxThunk, logger))
  ); // 여러개의 미들웨어를 적용 할 수 있습니다.


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