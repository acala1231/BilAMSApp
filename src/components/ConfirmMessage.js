import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash';

import { hideConfirmMsg } from '../js/common';


const ConfirmMessage = () => {
  const { isShow, message, callBack } = useSelector(state => state.confirmMsg);
  const action = useDispatch();

  console.log('ConfirmMessage isShow', isShow);
  console.log('ConfirmMessage message', message);
  console.log('ConfirmMessage callBack', callBack);

  useEffect(() => {
    if (isShow) {
      console.log(message);
      hideConfirmMsg(action);
      Alert.alert(
        '',
        message,
        [
          {
            text: '확인',
            onPress: () => {
              if (_.isFunction(callBack)) action(callBack);
              hideConfirmMsg(action);
            },
          }
        ]
      );
    }
  }, [isShow]);

  return (
    <></>
  )
};

export default ConfirmMessage;