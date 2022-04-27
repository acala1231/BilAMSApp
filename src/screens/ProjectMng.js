import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Title, Button, TextInput, DarkTheme, Modal, Portal, IconButton, Dialog } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Postcode from '@actbase/react-daum-postcode';
import _ from 'lodash';
import { useDrawerStatus } from '@react-navigation/drawer';

import { LOADER_START, LOADER_END } from 'constants';
import { common } from 'js';
import WebView from 'react-native-webview';
import { prjMngStlye } from 'styles/styles';
import { cmsApi } from '../actions';


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

// 근무지리스트 조회
const getWrkPlcList = (action, pageNo, setPageNo, pageCnt) => {
    if (pageCnt == 0 || pageNo > pageCnt) return;
    action(cmsApi.callCmsApi('/getWrkPlcList', { 'pageNo': pageNo }));
    setPageNo(pageNo + 1);
}

const listItem = ({ item }) => (
    <View style={prjMngStlye.multiView}>
        <Text>{item.wrkPlcNo}</Text>
        <Text>{item.prjNm}</Text>
        <Text>{item.adr}</Text>
    </View>
);



const ProjectMng = (props) => {

    const isDrawerOpen = useDrawerStatus() === 'open';
    console.log('isDrawerOpen', isDrawerOpen);

    props.navigation.isFocused()
    console.log(!props.navigation.isFocused());


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

    // 근무지리스트
    const [pageNo, setPageNo] = useState(1); // 리스트페이지번호
    const [maxPageNo, setMaxPageNo] = useState(1); // 리스트페이지번호
    const [list, setList] = useState([]); // 리스트데이터
    const data = useSelector(state => state.callApi.data); // 조회데이터

    const [refreshing, setRefreshing] = useState(false);

    const getRefreshData = async () => {
        setRefreshing(true);
        console.log('init');
        // await RefreshDataFetch();
        setList([]);
        setRefreshing(false);
    };

    const onRefresh = () => {
        if (!refreshing) {
            getRefreshData();
        }
    };


    // 데이터 조회해올때
    useEffect(() => {
        // 조회해온 데이터가 있을때
        if (data.list && data.list.length > 0) {
            let temp = _.union(list, data.list);
            setList(temp);
        }

        if (data.pageCnt) {
            setMaxPageNo(data.pageCnt);
        }

        // data 초기화
        action(cmsApi.callCmsApiFail());
    }, [data]);

    const hideAplyModal = () => {
        // 신청정보 초기화
        setPrjNm('');
        setZipcode('');
        setAdr('');
        setDtlAdr('');
        setQuery('');
        setAplyModal(false);
        setAdrModal(false)
    }

    const initPage = () => {
        hideAplyModal();
        setList([]);
    }

    
    // if (!props.navigation.isFocused()) initPage();

    return (
        <View style={prjMngStlye.container}>
            <Title>프로젝트관리</Title>

            <Button
                mode="contained"
                onPress={() => setAplyModal(true)}
            >등록</Button>
            <Button
                mode="contained"
                onPress={() => getWrkPlcList(action, pageNo, setPageNo, maxPageNo)}
            >테스트</Button>

            <View>
                <FlatList
                    data={list}
                    renderItem={listItem}
                    keyExtractor={item => item.wrkPlcNo}
                    style={prjMngStlye.flatList}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                />
            </View>


            {/* 근무지등록신청 */}
            <Portal>
                <Dialog
                    visible={isAplyModal}
                    style={prjMngStlye.modal}
                    onDismiss={() => hideAplyModal(false)}
                >
                    <Dialog.Title>근무지 등록신청</Dialog.Title>
                    <Dialog.Content style={prjMngStlye.aplyContainer}>
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
                        {/* </View> */}
                    </Dialog.Content>
                </Dialog>
            </Portal>
            <Portal>
                {/* 주소검색 */}
                <Dialog
                    visible={isAdrModal}
                    onDismiss={() => setAdrModal(false)}
                    // style={prjMngStlye.adrContainer}
                    style={prjMngStlye.modal}
                >
                    <Dialog.Title>주소검색</Dialog.Title>
                    <Dialog.Content style={prjMngStlye.adrContainer}>
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
                    </Dialog.Content>



                    {/* <View style={prjMngStlye.adrContainer}>
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
                    </View> */}

                </Dialog>
            </Portal>
        </View>
    );
}

export default ProjectMng;