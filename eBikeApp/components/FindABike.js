import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location'

import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();

import colors from '../assets/colors/colors';
import AppLoading from 'expo-app-loading';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function FindABike(props) {
    const [location, setLocation] = useState({latitude: null, longtitude: null, latitudeDelta: 0.0622, longitudeDelta: 0.0421});
    const [errorMsg, setErrorMsg] = useState(null);
    const [isReady, setIsReady] = useState(false)
    const [bikes, setBikes] = useState([]);
    const [chargingPod, setChargingPod] = useState([]);
    const [visibleDetails, setVisibleDetails] = useState(false);
    const [chosenBike, setChosenBike] = useState({});

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

    useFocusEffect(
        React.useCallback(()=>{
            fetch("https://dummy-server-iot.herokuapp.com/chargingPod").then(res=>res.json()).then(res=>{
                setChargingPod(res)
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
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <AntDesign name='arrowleft' size={32} color={colors.white} style={styles.backIcon}/>
                </TouchableOpacity>
                <Text style={styles.title}>Find a Bike</Text>
            </View>
            {/* <Text style={{color: colors.white}}>{text}</Text> */}
            <View style={{alignItems: 'center'}}>
                <MapView style={styles.map} initialRegion={location} followsUserLocation={true} showsMyLocationButton={true} showsUserLocation={true} onPress={() => {if (visibleDetails) setVisibleDetails(false)}}>
                    {bikes.length !== 0 ? bikes.map(bike => 
                        <Marker key={bike.id} coordinate={{latitude: Number(bike.latitude), longitude: Number(bike.longtitude)}}
                        image={bike.locked === 1? require('../assets/images/map_icon_red.png') : require('../assets/images/map_icon_green.png')} 
                        onPress={()=>{
                            if(visibleDetails && chosenBike.id === bike.id) setVisibleDetails(false)
                            else{
                                setVisibleDetails(true)
                                setChosenBike(bike)
                            }
                        }} >
                        </Marker>) 
                    : true}
                    {chargingPod.length !== 0 ? chargingPod.map(cP => 
                        <Marker key={cP.id} coordinate={{latitude: Number(cP.latitude), longitude: Number(cP.longtitude)}} title={`Charging Pod ${cP.id}`} description={`Consumption: ${cP.consumption} kW/h`} image={require('../assets/images/station.png')}  >
                        </Marker>) 
                    : true}
                </MapView>
                {/* {!errorMsg ? <MapView style={styles.map} initialRegion={location} followsUserLocation={true} showsMyLocationButton={true} showsUserLocation={true} /> : <Text style={{color: colors.white}}>{text}</Text>} */}
            </View>
            {visibleDetails && <View style={styles.detailsWrapper}>
                <Text style={styles.detailsTitle}>Bike {chosenBike.id}</Text>
                <View style={styles.detailsTextRow}>
                    <Text style={styles.detailsTextLeft}>Battery Level</Text>
                    <Text style={styles.detailsTextRight}>{chosenBike.batteryLevel}%</Text>
                </View>
                <View style={styles.detailsTextRow}>
                    <Text style={styles.detailsTextLeft}>Speed</Text>
                    <Text style={styles.detailsTextRight}>{chosenBike.speed} km/h</Text>
                </View>
                <View style={[styles.detailsTextRow, {borderBottomWidth: 0}]}>
                    <Text style={styles.detailsTextLeft}>Locked</Text>
                    <Text style={styles.detailsTextRight}>{chosenBike.locked === 1? 'Yes' : 'No'}</Text>
                </View>
                <View style={styles.buttonWrapper}>
                    {chosenBike.locked === 1 ? 
                        <TouchableOpacity style={styles.rentButton} onPress={()=>props.navigation.navigate('Rent a Bike')}><Text style={styles.buttonText}>Rent Bike</Text></TouchableOpacity> : 
                        <View style={styles.disabledRentButton}><Text style={styles.buttonText}>Bike In Use</Text></View>
                    }
                </View>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    detailsWrapper: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        width: windowWidth,
        height: windowHeight * 0.42,
        marginTop: windowHeight * 0.58,
        backgroundColor: colors.boxGray,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,

    },
    detailsTitle: {
        fontSize: 24,
        color: colors.white,
        marginTop: 10,
        fontWeight: '700'
    },
    detailsTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: colors.cyanBorder
    },
    detailsTextLeft: {
        color: colors.purple,
        fontSize: 18
    },
    detailsTextRight: {
        color: colors.white,
        fontSize: 18,
        
    },
    buttonWrapper: {
        alignItems: 'center'
    },
    rentButton: {
        marginTop: -2,
        width:  windowWidth * 0.75,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: colors.purple,
        borderRadius: 13
    },
    disabledRentButton: {
        marginTop: -2,
        width:  windowWidth * 0.75,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: colors.gray,
        borderRadius: 13
    },
    buttonText: {
        fontSize: 20,
        color:colors.white
    }
})

export default FindABike;