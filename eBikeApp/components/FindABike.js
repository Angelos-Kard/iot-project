import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';

import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();

import colors from '../assets/colors/colors';

function FindABike(props) {
    return (
        <View style={styles.conatiner}>
            <View style={styles.titleWrapper}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <AntDesign name='arrowleft' size={32} color={colors.white} style={styles.backIcon}/>
                </TouchableOpacity>
                <Text style={styles.title}>Find a Bike</Text>
            </View>

            <MapView style={styles.map} />
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
        height: Dimensions.get('window').height,
    },
})

export default FindABike;