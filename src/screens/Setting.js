import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, } from 'react-native';
import { TextInput, Button, Switch, Divider, Text, Headline, Subheading } from 'react-native-paper';
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

const Setting = () => {
    const action = useDispatch();

    // state
    const isInitPw = useSelector(state => state.emp.empInfo.isInitPw);
    const [curEmpPw, setCurEmpPw] = useState('');
    const [newEmpPw, setNewEmpPw] = useState('');
    const [isSecretCurPw, setIsSecretCurPw] = useState(true);
    const [isSecretNewPw, setIsSecretNewPw] = useState(true);
    const [isPushOn, setIsPushOn] = useState(false);

    
    // 비밀번호 확인
    useEffect(() => {
        if (isInitPw == 'true') {
            common.showAlertMsg(action, '초기 비밀번호를 변경해주세요.');
        }
    }, [isInitPw]);

    // 알림설정 토글
    const onToggleSwitch = () => setIsPushOn(!isPushOn);


    return (
        <View style={commonStlye.defalutView}>
            <View style={commonStlye.container}>
                <View
                    style={{
                        margin: 5,
                        flexDirection: 'row',
                        alignItems: 'stretch'
                    }}
                >
                    <Subheading
                        style={{
                            textAlign: 'left',
                            width: '80%'
                        }}
                    >
                        알림설정
                    </Subheading>
                    <Switch
                        style={{ width: '20%' }}
                        value={isPushOn} onValueChange={onToggleSwitch}
                    />
                </View>

                <Divider style={{ border: '5px solid black', backgroundColor: 'black' }} />
                <View style={{ width: '100%' }}>
                    <TextInput
                        mode='outlined'
                        label='기존 비밀번호'
                        secureTextEntry={isSecretCurPw}
                        right={<TextInput.Icon name={isSecretCurPw ? 'eye' : 'eye-outline'} onPress={() => setIsSecretCurPw(!isSecretCurPw)} />}
                        // style={loginStlye.input}
                        value={curEmpPw}
                        maxLength={20}
                        onChangeText={(text) => setCurEmpPw(text)}
                    />
                    <TextInput
                        mode='outlined'
                        label='새 비밀번호'
                        secureTextEntry={isSecretNewPw}
                        right={<TextInput.Icon name={isSecretNewPw ? 'eye' : 'eye-outline'} onPress={() => setIsSecretNewPw(!isSecretNewPw)} />}
                        style={loginStlye.input}
                        value={newEmpPw}
                        maxLength={20}
                        onChangeText={(text) => setNewEmpPw(text)}
                    />
                    <Button
                        mode="contained"
                        onPress={() => validate(action, curEmpPw, newEmpPw)}
                        style={loginStlye.button}
                    >비밀번호변경</Button>
                </View>
            </View>
        </View>
    );
}

export default Setting;