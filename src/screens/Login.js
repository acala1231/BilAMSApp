import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import _ from 'lodash'

import { cmsApi, common } from 'actions';
import { loginStlye } from 'styles/styles';


const Login = () => {
    const action = useDispatch();
    const [empNo, setEmpNo] = useState('');
    const [empPw, setEmpPw] = useState('');


    useEffect(() => {
        setEmpNo('22010101');
        setEmpPw('1111');
    }, []);


    function showErrorMsg(msg) {
        action(common.errorMsgShow(msg));
    }

    function login() {
        if (_.isEmpty(empNo)) {
            showErrorMsg('사번을 입력하세요.');
            return;
        }

        let str = _.toNumber(empNo);
        if (_.isNaN(str) || !_.isNumber(str) || str.toString().length != 8) {
            showErrorMsg('잘못된 사번입니다.');
            return;
        }

        if (_.isEmpty(empPw)) {
            showErrorMsg('비밀번호를 입력하세요.');
            return;
        }

        action(cmsApi.login({ empNo, empPw }));
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <View> */}
            <Text>로그인화면</Text>
            <TextInput
                mode='outlined'
                label='사번'
                placeholder='Type something'
                // right={<TextInput.Affix text='/8' />}
                style={loginStlye.input}
                value={empNo}
                maxLength={8}
                onChangeText={text => setEmpNo(text)}
            />
            <TextInput
                label='비밀번호'
                secureTextEntry
                right={<TextInput.Icon name='eye' />}
                style={loginStlye.input}
                value={empPw}
                maxLength={20}
                onChangeText={text => setEmpPw(text)}
            />


            <Button title='로그인' onPress={() => login()} />

            {/* </View> */}
        </View>
    );
}

export default Login;