import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, Alert, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import _ from 'lodash'

import { loginStlye, commonStlye } from '../styles/styles';
import { common } from '../js';
import { cmsApi } from '../actions';


// 비밀번호 변경 유효성검사
const validate = (action, curEmpPw, newEmpPw) => {

    if (_.isEmpty(curEmpPw)) {
        common.showAlertMsg(action, '비밀번호를 입력하세요.');
        return;
    }

    if (_.isEmpty(newEmpPw)) {
        common.showAlertMsg(action, '새 비밀번호를 입력하세요.');
        return;
    }

    if (!common.chkPwReg(newEmpPw)) {
        common.showAlertMsg(action, '비밀번호는 문자, 숫자, 특수문자를 포함하여 8~16자 이내로 입력하여야 합니다.');
        return;
    }

    // 비밀번호 변경
    action(cmsApi.modifyEmpPw({ curEmpPw, newEmpPw }));
}

const PasswordMng = () => {
    const action = useDispatch();
    const [curEmpPw, setCurEmpPw] = useState('');
    const [newEmpPw, setNewEmpPw] = useState('');
    const [isSecretCurPw, setIsSecretCurPw] = useState(true);
    const [isSecretNewPw, setIsSecretNewPw] = useState(true);


    return (
        <View style={commonStlye.defalutView}>
            <View style={commonStlye.container}>
                <TextInput
                    mode='outlined'
                    label='기존 비밀번호'
                    secureTextEntry={isSecretCurPw}
                    right={<TextInput.Icon name='eye' onPress={() => setIsSecretCurPw(!isSecretCurPw)} />}
                    style={loginStlye.input}
                    value={curEmpPw}
                    maxLength={20}
                    onChangeText={(text) => setCurEmpPw(text)}
                />
                <TextInput
                    mode='outlined'
                    label='새 비밀번호'
                    secureTextEntry={isSecretNewPw}
                    right={<TextInput.Icon name='eye' onPress={() => setIsSecretNewPw(!isSecretNewPw)} />}
                    style={loginStlye.input}
                    value={newEmpPw}
                    maxLength={20}
                    onChangeText={(text) => setNewEmpPw(text)}
                />
                <Button
                    mode="contained"
                    onPress={() => validate(action, curEmpPw, newEmpPw)}
                    style={loginStlye.button}
                >
                    비밀번호변경
                </Button>
            </View>
        </View>
    );
}

export default PasswordMng;