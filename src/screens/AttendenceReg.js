import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import MapView, { Marker, Circle, Polygon } from 'react-native-maps';

import { Title, Button, TextInput, Modal, Portal, IconButton, List } from 'react-native-paper';

import _ from 'lodash';

import { common } from '../js';
import { prjMngStlye } from '../styles/styles';
import { cmsApi, location as loca } from '../actions';
// import flagBlueImg from './assets/flag-blue.png';
import flagPinkImg from '../../assets/flag-pink.png';



const AttendenceReg = () => {
    const action = useDispatch();
    // const [location, setLocation] = useState(null);

    const location = useSelector(state => state.location.location);



    // page mount
    useEffect(() => {
        action(loca.getCurLocation());
    }, []);


    if (location && location.coords && location.coords.latitude) {
        console.log(location.coords.latitude, location.coords.longitude);
    }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>출퇴근기록</Text>
            {location && location.coords && location.coords.latitude ?
                <>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            // latitudeDelta: 0.0922,
                            // longitudeDelta: 0.0421,
                            latitudeDelta: 0.002,
                            longitudeDelta: 0.002,
                        }}
                    >
                        {/* <Circle
                            center={{
                                latitude: 37.5102752,
                                longitude: 127.0176489,
                            }}
                            radius={200}
                            fillColor="rgba(255, 255, 255, 1)"
                            strokeColor="rgba(0,0,0,0.5)"
                            zIndex={2}
                            strokeWidth={2}
                        /> */}

                        {/* <Polygon
                            coordinates={[{
                                latitude: 40,
                                longitude: 128,
                            }]}
                            fillColor="rgba(0, 200, 0, 0.5)"
                            strokeColor="rgba(0,0,0,0.5)"
                            strokeWidth={2}
                        /> */}

                        <Marker
                            coordinate={{
                                latitude: 37.5102371365016,
                                longitude: 127.017633644988
                            }}
                            key={1}
                            title={'신영빌딩'}
                        // description={text}
                        />
                        <Marker
                            coordinate={{
                                latitude: (location.coords.latitude),
                                longitude: (location.coords.longitude)
                            }}
                            key={2}
                            title={'현위치'}
                            // image={flagPinkImg}
                        // description={text}
                        />

                    </MapView>

                    <View style={styles.buttonContainerUpDown}>
                        <TouchableOpacity
                            style={[styles.button, styles.down]}
                            onPress={() => location.getCurLocation()}
                        >
                            <Text>- Lat</Text>
                        </TouchableOpacity>
                    </View>
                </>
                :
                <Text>좌표없음</Text>
            }
        </View>
    );
}

export default AttendenceReg;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: 300,
        height: 300,
        //   width: Dimensions.get('window').width,
        //   height: Dimensions.get('window').height,
    },
    flex: {
        flex: 1,
        width: '100%',
    },
    buttonContainerUpDown: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonContainerLeftRight: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'rgba(100,100,100,0.2)',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 50,
        width: 50,
    },
    up: {
        alignSelf: 'flex-start',
    },
    down: {
        alignSelf: 'flex-end',
    },
    left: {
        alignSelf: 'flex-start',
    },
    right: {
        alignSelf: 'flex-end',
    },
});