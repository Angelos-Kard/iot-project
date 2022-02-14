import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../assets/colors/colors';

function Profile(props) {
    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{console.log(props.route.params)}Profile</Text>
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
        marginTop: 20,
        marginLeft: 20,
    },
    title: {
        fontSize: 25,
        color: colors.white,
        fontWeight: 'bold'
    },
})

export default Profile;