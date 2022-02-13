import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../assets/colors/colors';

import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


function Login(props) {
    const [username, setUsername] = React.useState()
    const [password, setPassword] = React.useState()

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <AntDesign name='arrowleft' size={32} color={colors.white} style={styles.backIcon}/>
                </TouchableOpacity>
                <Text style={styles.title}>Login</Text>
            </View>

            <View style={styles.formWrapper}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    placeholder='Όνομα Χρήστη'
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    placeholder='Κωδικός Πρόσβασης'
                />
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('TabNavigator', {username: "johndoe", password: "123456"})}>
                    <Text style={styles.buttonText}>Σύνδεση</Text>
                </TouchableOpacity>
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
        flexDirection: 'row',
        marginTop: 20,
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
    formWrapper: {
        marginTop: 70,
        alignItems: 'center'
    },
    textInput: {
        width: windowWidth * 0.8,
        paddingVertical: 15,
        paddingHorizontal: 15,
        opacity: 0.8,
        color: colors.black,
        backgroundColor: colors.gray,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.cyanBorder,
        marginBottom: 30
    },
    button: {
        width:  windowWidth * 0.85,
        // height: 50,
        backgroundColor: colors.purple,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingVertical: 15
    },
    buttonText: {
        fontSize: 20,
        color: colors.white
    }
})

export default Login;