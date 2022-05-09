import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker, Circle } from 'react-native-maps';
import { Text, IconButton } from 'react-native-paper';
import _ from 'lodash';

import { common } from '../js';
import { commonStlye, wrkPlcMngStyle, CommuteMngStyle } from '../styles/styles';
import { cmsApi, location as loca } from '../actions';
import circleIcon from '../../assets/circleIcon.png';
import officeIcon from '../../assets/officeIcon.png';


// 거리비교
const compareDistance = (lttd1, lngt1, lttd2, lngt2) => {
    // 라디안 계산
    const deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }
    const R = 6371; // 지구반지름(km)
    const dLttd = deg2rad(lttd2 - lttd1);
    const dLngt = deg2rad(lngt2 - lngt1);
    const a = Math.sin(dLttd / 2) * Math.sin(dLttd / 2) + Math.cos(deg2rad(lttd1)) * Math.cos(deg2rad(lttd2)) * Math.sin(dLngt / 2) * Math.sin(dLngt / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // 거리(m)
}


const CommuteMng = () => {
    const action = useDispatch();

    // state
    const location = useSelector(state => state.location.location); // 현재위치정보
    const empCmt = useSelector(state => state.empCmt.data); // 출근정보
    const [distance, setDistance] = useState(999); // 거리
    const [isDisableComStrBtn, setIsDisableComStrBtn] = useState(true); // 출근가능여부
    const [isDisableComEndBtn, setIsDisableComEndBtn] = useState(true); // 퇴근가능여부
    const [isInitAble, setIsInitAble] = useState(false); // 초기화가능여부


    // screen function start

    // 출근등록
    const onCommuteStart = () => {
        commute(1);
    };

    // 퇴근등록
    const onCommuteEnd = () => {
        commute(2);
    };

    const commute = (type) => {
        const callback = () => {
            action(cmsApi.regEmpCmt({
                type,
                lttd: location.coords.latitude,
                lngt: location.coords.longitude,
            }));
            setIsDisableComStrBtn(true);
            setIsDisableComEndBtn(true);
        };

        const msg = (type == '1' ? '출근' : '퇴근') + '등록을 하시겠습니까?';
        common.showConfirmMsg(action, msg, () => callback());
    }

    // 지도정보 초기화
    const onInit = () => {
        setIsInitAble(false); // 초기화버튼 사용가능여부
        action(loca.getCurLocationFail()); // 현재좌표정보 초기화
        setDistance(999); // 거리 state 초기화
        action(loca.getCurLocation()); // 좌표정보 조회
    };

    // screen function end


    // useEffect start

    // page mount
    useEffect(() => {
        // 현재위치 조회
        action(loca.getCurLocation());
    }, []);

    // 지도정보
    useEffect(() => {
        // 출근정보 조회(출근지, 출퇴근여부)
        if (location.coords.latitude != null) {
            action(cmsApi.getEmpCmt());
        }
    }, [location]);

    // 출퇴근정보
    useEffect(() => {
        if (empCmt.lttd && empCmt.lngt && location.coords.latitude && location.coords.longitude) {
            setDistance(compareDistance(empCmt.lttd, empCmt.lngt, location.coords.latitude, location.coords.longitude));
        }
    }, [empCmt]);

    // 거리정보
    useEffect(() => {
        // 위변조여부
        if (location.mocked) return;

        // 출퇴근가능거리여부
        if (distance > 200) return;

        // 출퇴근정보 없을경우
        if (empCmt == null) return;

        // 출근가능
        if (empCmt.cmtStrDd == '00:00') {
            setIsDisableComStrBtn(false);
        }

        // 퇴근가능
        if (empCmt.cmtStrDd != '00:00' && empCmt.cmtEndDd == '00:00') {
            setIsDisableComEndBtn(false);
        }

        // 초기화버튼
        setIsInitAble(true);
    }, [distance]);

    // useEffect end


    return (
        <View style={commonStlye.defalutView}>
            <View style={commonStlye.container}>
                <View style={commonStlye.singleView}>
                    <Text style={CommuteMngStyle.text}>출퇴근기록</Text>
                    <Text style={CommuteMngStyle.text}>
                        {empCmt.cmtDd}
                    </Text>
                </View>
                <View style={commonStlye.multiView}>
                    <TouchableOpacity
                        style={isDisableComStrBtn ?
                            [CommuteMngStyle.commuteLBtn
                                , { backgroundColor: 'grey' }]
                            :
                            CommuteMngStyle.commuteLBtn}
                        disabled={isDisableComStrBtn}
                        onPress={() => onCommuteStart()}
                    >
                        <Text style={CommuteMngStyle.text}>{empCmt.cmtStrDd}</Text>
                        <Text style={CommuteMngStyle.text}>출근</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={isDisableComEndBtn ?
                            [CommuteMngStyle.commuteRBtn
                                , { backgroundColor: 'grey' }]
                            :
                            CommuteMngStyle.commuteRBtn}
                        disabled={isDisableComEndBtn}
                        onPress={() => onCommuteEnd()}
                    >
                        <Text style={CommuteMngStyle.text}>{empCmt.cmtEndDd}</Text>
                        <Text style={CommuteMngStyle.text}>퇴근</Text>
                    </TouchableOpacity>
                </View>
                <View style={CommuteMngStyle.mapViewContainer}>
                    {location && location.coords && location.coords.latitude && empCmt && empCmt.lttd && empCmt.lngt ?
                        <>
                            <MapView
                                style={CommuteMngStyle.mapView}
                                initialRegion={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                    latitudeDelta: 0.002,
                                    longitudeDelta: 0.002,
                                }}
                            >
                                {/* 출퇴근등록가능반경 200m */}
                                {distance > 200 ?
                                    <Circle
                                        center={{
                                            latitude: empCmt.lttd,
                                            longitude: empCmt.lngt,
                                        }}
                                        radius={200}
                                        fillColor="rgba(255, 204, 204, 1)"
                                        strokeColor="rgba(0,0,0,0.5)"
                                        zIndex={2}
                                        strokeWidth={2}
                                    />
                                    :
                                    null
                                }
                                {/* 출근지 */}
                                <Marker
                                    coordinate={{
                                        latitude: empCmt.lttd,
                                        longitude: empCmt.lngt,
                                    }}
                                    key={1}
                                    title={empCmt.prjNm}
                                    image={officeIcon}
                                />
                                {/* 현위치 */}
                                <Marker
                                    coordinate={{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude
                                    }}
                                    key={2}
                                    title={'현위치'}
                                    image={circleIcon}
                                />
                            </MapView>
                            <IconButton
                                style={CommuteMngStyle.initBtn}
                                icon="refresh"
                                size={30}
                                onPress={() => onInit()}
                                disabled={!isInitAble}
                            />
                        </>
                        :
                        null
                    }
                </View>
            </View>
        </View>
    );
}

export default CommuteMng;