import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash';

import { hideConfirmMsg } from '../js/common';


const ConfirmMessage = () => {
  const { isShow, message, callback } = useSelector(state => state.confirmMsg);
  const action = useDispatch();

  // console.log('ConfirmMessage isShow', isShow);
  // console.log('ConfirmMessage message', message);
  // console.log('ConfirmMessage callBack', _.isFunction(callback));

  useEffect(() => {
    if (isShow) {
      Alert.alert(
        '',
        message,
        [
          {
            text: "취소",
            onPress: () => hideConfirmMsg(action),
            style: "cancel"
          },
          {
            text: '확인',
            onPress: () => {
              if (_.isFunction(callback)) callback();
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