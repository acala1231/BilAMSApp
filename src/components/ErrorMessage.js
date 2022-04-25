import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import { hideErrorMsg } from 'js/common';


const ErrorMessage = () => {
  const { error, message } = useSelector(state => state.errorMsg);
  const action = useDispatch();

  useEffect(() => {
    if (error) {
      console.log(message ? message : '에러가 발생했습니다.');
      hideErrorMsg(action);
      Alert.alert(
        '',
        message ? message : '에러가 발생했습니다.',
        [
          {
            text: '확인',
            onPress: () => { hideErrorMsg(action) },
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