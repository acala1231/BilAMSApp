import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { UserContext, LoaderContext } from 'contexts';

const Login = () => {
    const { dispatch } = useContext(UserContext);
    const { loader } = useContext(LoaderContext);

    const _testLogin = async () => {
        try {
            loader.start();
            dispatch({ email: 'testEmail', uid: 'testUid' });
        } catch (e) {
            Alert.alert('Login Error', e.message);
        } finally {
            // setTimeout(() => {
                loader.stop();
            // }, 5000);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>로그인화면</Text>
            <Button title="로그인" onPress={() => { _testLogin() }} />
        </View>
    );
}

export default Login;