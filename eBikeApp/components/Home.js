import React, { Component, useState } from 'react';
import { Alert, BackHandler, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';

import colors from '../assets/colors/colors';

import Entypo from 'react-native-vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native';
import { NetworkContext } from './Context';
Entypo.loadFont();

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;



function Home(props) {

    const [isReady, setIsReady] = useState(false);
    // const [dbData, setDbData] = useState([{id:0, user: 'john', data: 'doe'}]);
    const loadImage = async () => 
    {
        const images = [
            require('../assets/images/parked_bicycles.jpg'),
            require('../assets/images/secured_bicycle.jpg'),
            require('../assets/images/secured_bicycle_2.jpg')
        ]
        const cacheImages = images.map(image => {
            return Asset.fromModule(image).downloadAsync();
        }); 
        return Promise.all(cacheImages);

    }

    // fetch('https://dummy-server-iot.herokuapp.com/dummy').then(res => res.json()).then(res=>setDbData(res))

    // const backAction = () => {
    //     Alert.alert('Log out', "Are you sure you want to log out?", [
    //         {
    //             text: 'Cancel',
    //             onPress: ()=> null,
    //             style: 'cancel'
    //         },
    //         {
    //             text: 'Yes',
    //             onPress: () => props.navigation.navigate('Login'),
    //         }
    //     ]);
    //     return true;
    // }


    // useEffect(()=> {
    //     BackHandler.addEventListener('hardwareBackPress', backAction)

    //     return () => BackHandler.removeEventListener('hardwareBackPress', backAction)
    // }, [])

    

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            Alert.alert('Log out', "Are you sure you want to log out?", [
                {
                    text: 'Cancel',
                    onPress: ()=> null,
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => props.navigation.navigate('Login'),
                }
            ]);
            return true;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    // useFocusEffect(
    //     React.useCallback(()=>{
    //         let isActive = true;

    //         fetch('https://dummy-server-iot.herokuapp.com/dummy').then(res => res.json()).then(res=> {if (isActive) setDbData(res)})

    //         return () => {isActive=false};
    //     }, [])
    // )

    if (!isReady) {
        return (
          <AppLoading
            startAsync={loadImage}
            onFinish={() => setIsReady(true)}
            onError={console.warn}
          ></AppLoading>
        );
    }
    return (
        
        // <NetworkContext.Provider value={{username: props.route.params.username}}>
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Home</Text>
                </View>
                <View style={styles.buttonsWrapper}>
                    <TouchableOpacity style={[styles.buttonWrapper, {marginTop: 20}]} onPress={() => props.navigation.navigate('Find a Bike')}>
                        <ImageBackground
                            source={require('../assets/images/parked_bicycles.jpg')}
                            style={styles.button}
                            imageStyle={styles.buttonImage}
                            blurRadius={2}
                        >
                            <View style={styles.textWrapper}>
                                <Text style={styles.text}>Find a bike</Text>
                                <Entypo name="chevron-right" size={35} color={colors.white} />
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonWrapper} onPress={() => props.navigation.navigate('Rent a Bike')}>
                        <ImageBackground
                            source={require('../assets/images/secured_bicycle.jpg')}
                            style={styles.button}
                            imageStyle={styles.buttonImage}
                            blurRadius={2}
                        >
                            <View style={styles.textWrapper}>    
                                <Text style={styles.text}>Rent a bike</Text>
                                <Entypo name="chevron-right" size={35} color={colors.white} />
                            </View>    
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonWrapper} onPress={() => props.navigation.navigate('Secure Your Bike')}>
                        <ImageBackground
                            source={require('../assets/images/secured_bicycle_2.jpg')}
                            style={styles.button}
                            imageStyle={styles.buttonImage}
                            blurRadius={2}
                        >
                            <View style={styles.textWrapper}>    
                                <Text style={styles.text}>Secure Your bike</Text>
                                <Entypo name="chevron-right" size={35} color={colors.white} />
                            </View>    
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

            </View>
        // </NetworkContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        // alignItems: 'center'
    },
    titleWrapper: {
        marginTop: 20,
        marginLeft: 20,
    },
    title: {
        fontSize: 25,
        color: colors.white,
        fontWeight: 'bold'
    },
    buttonsWrapper: {
        alignItems: 'center'
    },
    buttonWrapper: {
        marginVertical: 16,
        flexDirection: 'row',
    },
    button: {
        width: windowWidth * 0.75,
        height: windowHeight * 0.22,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        justifyContent: 'flex-end'
    },
    buttonImage: {
        borderRadius: 20
    },
    textWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 8
    },
    text: {
        fontSize: 26,
        color: colors.white,
        textShadowColor: colors.black,
        textShadowOffset: {
            width: 0,
            height: 2,
        },
        textShadowRadius: 3.84,
        marginLeft: 5
    },
})

export default Home;