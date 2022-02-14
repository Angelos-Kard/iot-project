import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
Entypo.loadFont();
MCI.loadFont();
AntDesign.loadFont();

import colors from '../assets/colors/colors';


function Profile(props) {
    const params = props.navigation.getState().routes.find(x => x.name === 'Home').params;

    return (

        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Profile</Text>
            </View>
            <View style={styles.firstRow}>
                <View style={styles.walletWrapper}>
                    <Entypo name='wallet' size={80} color={colors.purple}></Entypo>
                    <Text style={styles.firstRowText}>Your Balance: {params.balance}€</Text>
                </View>
                <TouchableOpacity style={styles.profileWrapper}>
                    <MCI name='account-circle-outline' color={colors.purple} size={80}></MCI>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AntDesign name="pluscircle" color={colors.white} size={16}></AntDesign>
                        <Text style={styles.firstRowText}>{params.profileImage === null ? '  Add porfile image' : ''}</Text>
                    </View>
                </TouchableOpacity>

            </View>

            <View style={styles.detailsWrapper}>
                <View style={styles.detailsBox}>
                    <View style={styles.detailsRow}>
                        <Text style={styles.detailsTitle}>Full Name</Text>
                        <Text style={styles.detailsText}>{params.firstName} {params.lastName}</Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={styles.detailsTitle}>Username</Text>
                        <Text style={styles.detailsText}>{params.username}</Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={styles.detailsTitle}>Password</Text>
                        <Text style={styles.detailsText}>{'*'.repeat(params.password.length)}</Text>
                    </View>
                    <TouchableOpacity style={styles.detailsRow}>
                        <Text style={styles.detailsTitle}>Email</Text>
                        <Text style={styles.detailsText}>{params.email}</Text>
                    </TouchableOpacity>
                    <View style={[styles.detailsRow, {borderBottomWidth: 0}]}>
                        <Text style={styles.detailsTitle}>Telephone</Text>
                        <Text style={styles.detailsText}>{params.telephone}</Text>
                    </View>
                </View>
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    },
    titleWrapper: {
        marginVertical: 20,
        marginLeft: 20,
    },
    title: {
        fontSize: 25,
        color: colors.white,
        fontWeight: 'bold'
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 15,
    },
    walletWrapper: {
        alignItems: 'center'
    },
    firstRowText: {
        fontSize: 16,
        color: colors.white
    },
    profileWrapper: {
        alignItems: 'center'
    },
    detailsWrapper: {
        marginVertical: 15,
        alignItems: 'center'
    },
    detailsBox: {
        borderRadius: 20,
        height: '69%',
        width: '90%',
        backgroundColor: colors.boxGray
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        // marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: colors.cyanBorder,
        paddingVertical: 15
    },
    detailsText: {
        fontSize: 18,
        color: colors.white
    },
    detailsTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.purple
    }
})

export default Profile;