import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location'

import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();

import colors from '../assets/colors/colors';
import AppLoading from 'expo-app-loading';

const windowWidth = Dimensions.get().width;
const windowHeight = Dimensions.get().height;


function FindABike(props) {
    const [location, setLocation] = useState({latitude: null, longtitude: null, latitudeDelta: 0.0622, longitudeDelta: 0.0421});
    const [errorMsg, setErrorMsg] = useState(null);
    const [isReady, setIsReady] = useState(false)
    const [bikes, setBikes] = useState([]);

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

    useFocusEffect(
        React.useCallback(()=>{
            fetch("https://dummy-server-iot.herokuapp.com/bikes").then(res=>res.json()).then(res=>{
                setBikes(res)
                // console.log(bikes)
                // console.log(res)
            })
        }, [])
    );

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
                <MapView style={styles.map} initialRegion={location} followsUserLocation={true} showsMyLocationButton={true} showsUserLocation={true}>
                    {/* {console.log(bikes)} */}
                    {bikes.length !== 0 ? bikes.map(bike => 
                        <Marker key={bike.id} coordinate={{latitude: Number(bike.latitude), longitude: Number(bike.longtitude)}} title={`Bike ${bike.id}`} description={`Battery level: ${bike.batteryLevel} | Speed: ${bike.speed} | Locked: ${bike.locked === 1?'Yes':'No'}`} pinColor={bike.locked === 1?'green':'red'}  >
                        </Marker>) 
                    : true}
                </MapView>
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
    tooltipWrapper: {
        // position: 'absolute',
        width: 100,
        height: 50,
        backgroundColor: colors.boxGray
    }
})

export default FindABike;