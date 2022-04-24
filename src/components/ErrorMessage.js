import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import { common } from 'actions';
import * as constants from '../constants';


const ErrorMessage = () => {
  const { error, message } = useSelector(state => state.errorMsg);
  const action = useDispatch();

  useEffect(() => {
    if (error) {
      console.log(message ? message : '에러가 발생했습니다.');
      action(common.errorMsgHide());
      Alert.alert(
        '',
        message ? message : '에러가 발생했습니다.',
        [
          {
            text: '확인',
            onPress: () => { action(common.errorMsgHide()) },
          }
        ]
      );
    }
  }, [error]);

  return (
    <></>
  )
};

export default ErrorMessage;