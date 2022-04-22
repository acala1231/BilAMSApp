import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import { ERROR_MSG_HIDE } from 'constants';


const ErrorMessage = () => {
  const error = useSelector(state => state.errorMsg.error);
  const action = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert(
        '에러가 발생했습니다.',
        [
          {
            text: "확인",
            onPress: () => action(ERROR_MSG_HIDE),
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