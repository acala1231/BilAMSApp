import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title, Button, TextInput, DarkTheme, Modal, Portal, IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Postcode from '@actbase/react-daum-postcode';

import { LOADER_START, LOADER_END } from 'constants';
import { common } from 'js';
import WebView from 'react-native-webview';
import { prjMngStlye } from 'styles/styles'


// 프로젝트 등록신청 유효성검사
const validate = (action, prjNm, zipcode, adr, dtlAdr, query) => {

    console.log(prjNm, zipcode, adr, dtlAdr, query);

    if (_.isEmpty(prjNm)) {
        common.showErrorMsg(action, '프로젝트명을 입력하세요.');
        return;
    }

    if (_.isEmpty(zipcode) || _.isEmpty(adr)) {
        common.showErrorMsg(action, '주소를 입력하세요.');
        return;
    }

    if (_.isEmpty(dtlAdr)) {
        common.showErrorMsg(action, '상세주소를 입력하세요.');
        return;
    }

    // 등록신청
    
}

const ProjectMng = () => {
    const action = useDispatch();

    // 팝업
    const [isAdrModal, setAdrModal] = useState(false);
    const [isAplyModal, setAplyModal] = useState(false);

    // 변수
    const [prjNm, setPrjNm] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [adr, setAdr] = useState('');
    const [dtlAdr, setDtlAdr] = useState('');
    const [query, setQuery] = useState('');



    useEffect(() => {

        // readData();

    }, []);

    return (
        <View style={prjMngStlye.container}>
            <Title>프로젝트관리</Title>
            <Button
                mode="contained"
                onPress={() => setAplyModal(true)}
            >등록</Button>

            {/* 프로젝트등록신청 */}
            <Portal>
                <Modal
                    visible={isAplyModal}
                    style={prjMngStlye.modal}
                    onDismiss={() => setAplyModal(false)}
                >
                    <View style={prjMngStlye.aplyContainer}>
                        <View style={prjMngStlye.singleView}>
                            <TextInput
                                label="프로젝트명"
                                value={prjNm}
                                maxLength={100}
                                onChangeText={text => setPrjNm(text)}
                            />
                        </View>
                        <View style={prjMngStlye.multiView}>
                            <TextInput
                                style={{ width: '80%' }}
                                label="우편번호"
                                disabled={true}
                                value={zipcode}
                            />
                            <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton
                                    icon={'magnify'}
                                    mode="contained"
                                    onPress={() => setAdrModal(true)}
                                />
                            </View>
                        </View>
                        <View style={prjMngStlye.singleView}>
                            <TextInput
                                label="주소"
                                disabled={true}
                                value={adr}
                            />
                        </View>
                        <View style={prjMngStlye.singleView}>
                            <TextInput
                                label="상세주소"
                                value={dtlAdr}
                                maxLength={100}
                                onChangeText={text => setDtlAdr(text)}
                            />
                        </View>
                        <View style={prjMngStlye.singleView}>
                            <Button
                                mode="contained"
                                onPress={() => validate(action, prjNm, zipcode, adr, dtlAdr, query)}
                            >등록</Button>
                        </View>
                    </View>
                </Modal>
            </Portal>
            <Portal>
                {/* 주소검색 */}
                <Modal
                    visible={isAdrModal}
                    onDismiss={() => setAdrModal(false)}
                    // style={prjMngStlye.adrContainer}
                    style={prjMngStlye.modal}
                >
                    <View style={prjMngStlye.adrContainer}>
                        <Postcode
                            style={prjMngStlye.adrPostcode}
                            jsOptions={{ animation: true, hideMapBtn: true }}
                            onSelected={data => {
                                console.log(JSON.stringify(data));
                                console.log(data.query);
                                setAdr(data.address);
                                setQuery(data.query);
                                setZipcode(data.zonecode);
                                setAdrModal(false);
                            }}
                        />
                    </View>

                </Modal>
            </Portal>
        </View >
    );
}

export default ProjectMng;