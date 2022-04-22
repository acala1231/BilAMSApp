import React from 'react';
import { Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { cmsApi } from 'actions';

const Login = () => {
    const action = useDispatch();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>로그인화면</Text>
            <Button title="로그인" onPress={() => { action(cmsApi.login({ empNo: 'testEmail', pw: 'testUid' })) }} />
        </View>
    );
}

export default Login;