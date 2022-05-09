import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Title, Button, TextInput, Modal, Portal, IconButton, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Postcode from '@actbase/react-daum-postcode';
import _ from 'lodash';

import { common } from '../js';
import { commonStlye, wrkPlcMngStyle } from '../styles/styles';
import { cmsApi } from '../actions';


const WrkPlcMng = () => {
    const action = useDispatch();

    // state
    const [isAdrModal, setAdrModal] = useState(false); // 주소검색팝업
    const [isAplyModal, setAplyModal] = useState(false); // 근무지등록팝업
    const [prjNm, setPrjNm] = useState(''); // 프로젝트이름
    const [zipcd, setZipcd] = useState(''); // 우편번호
    const [adr, setAdr] = useState(''); // 주소
    const [dtlAdr, setDtlAdr] = useState(''); // 상세주소
    const [query, setQuery] = useState(''); // 주소검색용변수
    const [refreshing, setRefreshing] = useState(false); // 리스트 초기화
    const [list, setList] = useState([]); // 리스트데이터
    const [pageNo, setPageNo] = useState(1); // 리스트페이지번호
    const [maxPageNo, setMaxPageNo] = useState(1); // 리스트페이지번호
    const data = useSelector(state => state.workPlcList.data); // 근무지 목록 조회데이터


    // screen function start

    // 프로젝트 신규 등록신청 유효성검사
    const validate = () => {
        if (_.isEmpty(prjNm)) {
            common.showAlertMsg(action, '프로젝트명을 입력하세요.');
            return;
        }

        if (_.isEmpty(zipcd) || _.isEmpty(adr)) {
            common.showAlertMsg(action, '주소를 입력하세요.');
            return;
        }

        if (_.isEmpty(dtlAdr)) {
            common.showAlertMsg(action, '상세주소를 입력하세요.');
            return;
        }

        const params = {
            prjNm: prjNm,
            zipcd: zipcd,
            adr: adr,
            dtlAdr: dtlAdr,
            query: query,
            callback: () => hideAplyModal()
        };

        const callback = () => {
            action(cmsApi.aplyWrkPlc(params));
        };

        common.showConfirmMsg(action, '신규 근무지를 등록 신청 하시겠습니까?.', () => callback());
    }

    // 근무지 등록
    const regWrkPlc = (wrkPlcNo) => {
        const callback = () => {
            action(cmsApi.regWrkPlc({ wrkPlcNo }));
        };

        common.showConfirmMsg(action, '근무지로 등록 하시겠습니까?.', () => callback());
    }

    // 근무지리스트 조회
    const getWrkPlcList = (pageNo) => {
        if (maxPageNo == 0 || pageNo > maxPageNo) return;
        action(cmsApi.getWrkPlcList({ 'pageNo': pageNo }));
    }

    // 리스트 초기화
    const onRefresh = () => {
        if (!refreshing) {
            setRefreshing(true);
            getWrkPlcList(1);
            setRefreshing(false);
        }
    };

    // 등록신청모달숨김
    const hideAplyModal = () => {
        // 신청정보 초기화
        setPrjNm('');
        setZipcd('');
        setAdr('');
        setDtlAdr('');
        setQuery('');
        setAplyModal(false);
        setAdrModal(false);
    }

    // screen function end


    // useEffect start

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
        action(cmsApi.getWrkPlcListFail());
    }, [data]);

    // useEffect end


    return (
        <View style={commonStlye.defalutView}>
            <View style={commonStlye.container}>
                <View>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                    }}>
                        <Button
                            style={{ marginTop: 20, marginBottom: 5, margin: 10 }}
                            mode="contained"
                            onPress={() => setAplyModal(true)}
                        >신규근무지등록신청</Button>

                    </View>
                    <FlatList
                        style={wrkPlcMngStyle.flatList}
                        data={list}
                        renderItem={({ item }) => (
                            <List.Item
                                key={item.wrkPlcNo}
                                style={wrkPlcMngStyle.listItem}
                                title={item.prjNm}
                                description={item.adr}
                                right={() =>
                                    <Button
                                        style={{ justifyContent: 'center', }}
                                        icon={item.wrkRegYn == 'Y' ? 'pin' : 'pin-off'}
                                        mode="text"
                                        onPress={item.wrkRegYn == 'N' ? () => regWrkPlc(item.wrkPlcNo) : undefined}
                                    >
                                        {item.wrkRegYn == 'N' ? '변경' : '출근중'}
                                    </Button>
                                }
                            />
                        )}
                        keyExtractor={item => item.wrkPlcNo}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        onEndReached={() => getWrkPlcList(pageNo + 1)}
                        onEndReachedThreshold={1}
                    />
                </View>
                {/* 근무지등록신청 */}
                <Portal>
                    <Modal
                        visible={isAplyModal}
                        style={wrkPlcMngStyle.modal}
                        onDismiss={() => hideAplyModal(false)}
                    >
                        <View style={wrkPlcMngStyle.aplyContainer}>
                            <Title>근무지 등록신청</Title>
                            <View style={commonStlye.singleView}>
                                <TextInput
                                    label="프로젝트명"
                                    value={prjNm}
                                    maxLength={100}
                                    onChangeText={text => setPrjNm(text)}
                                />
                            </View>
                            <View style={commonStlye.multiView}>
                                <TextInput
                                    style={{ width: '80%' }}
                                    label="우편번호"
                                    disabled={true}
                                    value={zipcd}
                                />
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                                    <IconButton
                                        icon={'magnify'}
                                        mode="contained"
                                        onPress={() => setAdrModal(true)}
                                    />
                                </View>
                            </View>
                            <View style={commonStlye.singleView}>
                                <TextInput
                                    label="주소"
                                    disabled={true}
                                    value={adr}
                                />
                            </View>
                            <View style={commonStlye.singleView}>
                                <TextInput
                                    label="상세주소"
                                    value={dtlAdr}
                                    maxLength={100}
                                    onChangeText={text => setDtlAdr(text)}
                                />
                            </View>
                            <View style={commonStlye.singleView}>
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
                        style={wrkPlcMngStyle.modal}
                    >
                        <View style={wrkPlcMngStyle.adrContainer}>
                            <Title>주소검색</Title>
                            <Postcode
                                style={wrkPlcMngStyle.adrPostcode}
                                jsOptions={{ animation: true, hideMapBtn: true }}
                                onSelected={data => {
                                    setAdr(data.address);
                                    setQuery(data.address);
                                    setZipcd(data.zonecode);
                                    setAdrModal(false);
                                }}
                            />
                        </View>
                    </Modal>
                </Portal>
            </View>
        </View>
    );
}

export default WrkPlcMng;