import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location'

import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();

import colors from '../assets/colors/colors';
import AppLoading from 'expo-app-loading';

function FindABike(props) {
    const [location, setLocation] = useState({latitude: null, longtitude: null, latitudeDelta: 0.0622, longitudeDelta: 0.0421});
    const [errorMsg, setErrorMsg] = useState(null);
    const [isReady, setIsReady] = useState(false)

    // useFocusEffect(
    //     React.useCallback(async ()=>{
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             setErrorMsg('Permission to access location was denied');
    //         }

    //         let location = await Location.getCurrentPositionAsync({});
    //         setLocation(location);
    //     }, [])
    // );   

    const userLocation = async () => {
        // (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
        }

        let location = await Location.getCurrentPositionAsync({timeInterval: 1000});
        setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0522, longitudeDelta: 0.0421});
        // })();
    };

    // const onRegionChange = (region, lastLat, lastLong) => {
    //     setLocation({
    //       mapRegion: region,
    //       // If there are no new values set the current ones
    //       lastLat: lastLat || this.state.lastLat,
    //       lastLong: lastLong || this.state.lastLong
    //     });
    // }

    if (!isReady) {
        return (
          <AppLoading
            startAsync={userLocation}
            onFinish={() => setIsReady(true)}
            onError={console.warn}
          ></AppLoading>
        );
    }
    

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    }
    else text = JSON.stringify(location)

    return (
        <View style={styles.conatiner}>
            <View style={styles.titleWrapper}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <AntDesign name='arrowleft' size={32} color={colors.white} style={styles.backIcon}/>
                </TouchableOpacity>
                <Text style={styles.title}>Find a Bike</Text>
            </View>
            {/* <Text style={{color: colors.white}}>{text}</Text> */}
            <View style={{alignItems: 'center'}}>
            <MapView style={styles.map} initialRegion={location} followsUserLocation={true} showsMyLocationButton={true} showsUserLocation={true} />
                {/* {!errorMsg ? <MapView style={styles.map} initialRegion={location} followsUserLocation={true} showsMyLocationButton={true} showsUserLocation={true} /> : <Text style={{color: colors.white}}>{text}</Text>} */}
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: colors.black
    },
    titleWrapper: {
        flexDirection: 'row',
        marginVertical: 20,
        marginLeft: 20,
        alignItems: 'center'
    },
    backIcon: {
        marginRight: 10
    },
    title: {
        fontSize: 25,
        color: colors.white,
        fontWeight: 'bold'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.85,
    },
})

export default FindABike;