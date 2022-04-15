import React, { useContext } from 'react';
import { Text, View, Alert, Button } from 'react-native';
import { LoaderContext } from 'contexts';

const ProjectMng = () => {

    const { loader } = useContext(LoaderContext);

    const spinnerTest = async () => {
        console.log('start')
        try {
            loader.start();
            console.log('started')
            setTimeout(() => {
                console.log('stop')
                loader.stop();
            }, 5000);
        } catch (e) {
            console.log(e.message)
            Alert.alert('Login Error', e.message);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>프로젝트관리</Text>
            <Button onPress={spinnerTest} title='test' />
        </View>
    );
}

export default ProjectMng;