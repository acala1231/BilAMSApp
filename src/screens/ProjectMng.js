import React from 'react';
import { Text, View, Alert, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { LOADER_START, LOADER_END } from 'constants';


const ProjectMng = () => {
    const action = useDispatch();

    const spinnerTest = async () => {
        try {
            action(LOADER_START)
            setTimeout(() => {
                action(LOADER_END)
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