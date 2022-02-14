import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/colors'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Welcome(props) {
    return (
        <View style={styles.container}>
            {/* <View style={styles.titleWrapper}>
                <Text>eBike</Text>
            </View> */}

            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Sign Up')}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, {marginBottom: 75}]} onPress={() => props.navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    button: {
        width: windowWidth * 0.85,
        // height: 50,
        backgroundColor: colors.purple,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingVertical: 15
    },
    buttonText: {
        fontSize: 20,
        color: colors.white
    }
})

export default Welcome;