import React, { useEffect, useState } from 'react';
import { Text, View, Alert, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { LOADER_START, LOADER_END } from 'constants';
import { common } from 'js';


const ProjectMng = () => {
    const action = useDispatch();

    const [empNo, setEmpNo] = useState('');

    const readData = async () => {
        try {
            const userAge = await common.getAsyncStore('empInfo');
            console.log('projectMng page empInfo', userAge);
            if (userAge !== null) {
                setEmpNo(userAge)
            }
        } catch (e) {
            console.log('Failed to fetch the data from storage');
        }
    }




    const spinnerTest = async () => {
        try {
            action(LOADER_START)
            setTimeout(() => {
                action(LOADER_END)
            }, 5000);
        } catch (e) {
            Alert.alert('Login Error', e.message);
        }
    };



    useEffect(() => {

        readData();

    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>프로젝트관리</Text>
            <Button onPress={spinnerTest} title='test' />
        </View>
    );
}

export default ProjectMng;