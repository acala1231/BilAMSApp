import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import { hideAlertMsg } from '../js/common';


const AlertMessage = () => {
  const { isShow, message } = useSelector(state => state.alertMsg);
  const action = useDispatch();

  useEffect(() => {
    if (isShow) {
      Alert.alert(
        '',
        message ? message : '에러가 발생했습니다.',
        [
          {
            text: '확인',
            onPress: () => { hideAlertMsg(action) },
          }
        ]
      );
    }
  }, [isShow]);

  return (
    <></>
  )
};

export default AlertMessage;