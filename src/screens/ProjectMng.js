import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Title, Button, TextInput, DarkTheme, Modal, Portal, IconButton, Dialog, List, Card, Caption, Headline, Paragraph, Subheading, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Postcode from '@actbase/react-daum-postcode';
import _ from 'lodash';
import { useDrawerStatus } from '@react-navigation/drawer';

import { LOADER_START, LOADER_END } from 'constants';
import { common } from 'js';
import WebView from 'react-native-webview';
import { prjMngStlye, sampleStlye } from 'styles/styles';
import { cmsApi } from '../actions';



const listItem = ({ item }) => {
    // console.log(item.wrkPlcNo);
    return (
        <List.Item
            title={item.prjNm}
            description={item.adr}
            right={props => <List.Icon {...props} icon="folder" />}
        />

        // <View style={prjMngStlye.multiView}>
        //     {/* <Text>{item.wrkPlcNo}</Text>
        //     <Text>{item.prjNm}</Text>
        //     <Text>{item.adr}</Text> */}




        // </View>
    )
};

const ProjectMng = (props) => {

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

    // 리스트 초기화
    const [refreshing, setRefreshing] = useState(false);


    // 프로젝트 등록신청 유효성검사
    const validate = () => {
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
        console.log(prjNm, zipcode, adr, dtlAdr, query);
    }

    // 근무지리스트 조회
    const getWrkPlcList = (pageNo) => {
        if (maxPageNo == 0 || pageNo > maxPageNo) return;
        action(cmsApi.callCmsApi('/getWrkPlcList', { 'pageNo': pageNo }));
    }

    // 리스트 초기화
    const onRefresh = () => {
        if (!refreshing) {
            setRefreshing(true);
            console.log('init');
            getWrkPlcList(1);
            setRefreshing(false);
        }
    };

    // 등록신청모달숨김
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


    // page mount
    useEffect(() => {
        getWrkPlcList(1);
    }, []);

    // 데이터 조회해올때
    useEffect(() => {
        // 조회해온 데이터가 있을때
        if (data.list && data.list.length > 0) {
            let tempList = [];
            if (data.curPageNo > 1) {
                tempList = _.union(list, data.list);
            } else {
                tempList = data.list;
            }
            setList(tempList);
        }

        if (data.pageCnt) setMaxPageNo(data.pageCnt);
        if (data.curPageNo) setPageNo(data.curPageNo);

        // data 초기화
        action(cmsApi.callCmsApiFail());
    }, [data]);



    return (

        <View style={[prjMngStlye.container, {backgroundColor: DarkTheme.colors.background}]}>
            <View style={prjMngStlye.detailContainer}>
                <Title>프로젝트관리</Title>



                <View>

                </View>
            </View>
            <View style={prjMngStlye.listContainer}>
                <View style={prjMngStlye.multiView}>
                    <Button
                        mode="contained"
                        onPress={() => setAplyModal(true)}
                    >등록</Button>

                </View>
                <FlatList
                    data={list}
                    renderItem={listItem}
                    keyExtractor={item => item.wrkPlcNo}
                    style={prjMngStlye.flatList}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    onEndReached={() => getWrkPlcList(pageNo + 1)}
                    onEndReachedThreshold={1}
                />

                {/* <View> */}
                {/* <View style={prjMngStlye.container}> */}



                {/* 근무지등록신청 */}
                <Portal>
                    <Modal
                        visible={isAplyModal}
                        style={prjMngStlye.modal}
                        onDismiss={() => hideAplyModal(false)}
                    >
                        <View style={prjMngStlye.aplyContainer}>
                            <Title>근무지 등록신청</Title>
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
                                    onPress={() => validate()}
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
                        style={prjMngStlye.modal}
                    >
                        <View style={prjMngStlye.adrContainer}>
                            <Title>주소검색</Title>
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
                {/* </View> */}
            </View>
        </View>



    );
}

export default ProjectMng;