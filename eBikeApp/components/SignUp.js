import React, { useState } from 'react';
import { Dimensions, Keyboard, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import colors from '../assets/colors/colors';

import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function SignUp(props) {

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [telephone, setTelephone] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const checkUser = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (firstName.length === 0) ToastAndroid.show('First name cannot be empty', ToastAndroid.SHORT)
        else if (lastName.length === 0) ToastAndroid.show('Last name cannot be empty', ToastAndroid.SHORT)
        else if (email.length === 0) ToastAndroid.show('Email cannot be empty', ToastAndroid.SHORT)
        else if (telephone.length === 0) ToastAndroid.show('Email cannot be empty', ToastAndroid.SHORT)
        else if (username.length === 0) ToastAndroid.show('Username cannot be empty', ToastAndroid.SHORT)
        else if (password.length === 0) ToastAndroid.show('Password cannot be empty', ToastAndroid.SHORT)
        else if (reg.test(email) === false) ToastAndroid.show('Email has not a correct form', ToastAndroid.SHORT)
        else
        {
            ToastAndroid.show('Registration was successful', ToastAndroid.SHORT)
            props.navigation.navigate('Welcome');
            // fetch('https://dummy-server-iot.herokuapp.com/users', {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify({username: username, password: password})
            // }).then(res => res.json()).then(res=>{if (res[0].plithos == 1) props.navigation.navigate('TabNavigator', {username: username}); else ToastAndroid.show("Wrong username or password", ToastAndroid.SHORT)})
        }
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.titleWrapper}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <AntDesign name='arrowleft' size={32} color={colors.white} style={styles.backIcon}/>
                </TouchableOpacity>
                <Text style={styles.title}>Register</Text>
            </View>
            <View style={styles.formWrapper}>
                <ScrollView>
                    <View style={{alignItems: 'center'}}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => setFirstName(text)}
                            value={firstName}
                            placeholder='First Name'
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => setLastName(text)}
                            value={lastName}
                            placeholder='Last Name'
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => setEmail(text)}
                            keyboardType='email-address'
                            value={email}
                            placeholder='Email'
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => setTelephone(text)}
                            keyboardType='phone-pad'
                            value={telephone}
                            maxLength={10}
                            placeholder='Phone'
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => setUsername(text)}
                            value={username}
                            placeholder='Username'
                        />
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            placeholder='Password'
                        />
                        <TouchableOpacity style={styles.button} onPress={checkUser}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        marginTop: 50,
        marginBottom: 80,
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

export default SignUp;