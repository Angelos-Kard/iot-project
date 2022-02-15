import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../assets/colors/colors';
AntDesign.loadFont();

function RentABike(props) {
    
    // const params = props.navigation.getState().routes.find(x => x.name === 'Home').params;

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannerVisble, setScannerVisible] = useState(false);

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setScannerVisible(true);
        const d = new Date().toLocaleString()
        console.log(d)
        // fetch('https://dummy-server-iot.herokuapp.com/users', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({username: params.username, password: data, datetime: })
        // }).then(res => res.json()).then(res=>{})
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <TouchableOpacity onPress={() => {setScannerVisible(false); props.navigation.goBack()}}>
                    <AntDesign name='arrowleft' size={32} color={colors.white} style={styles.backIcon}/>
                </TouchableOpacity>
                <Text style={styles.title}>Rent a Bike</Text>
            </View>

            <View style={styles.contentWrapper}>
                <Text style={styles.infoText}>Scan the QR Code to rent a bike</Text>
                {!scannerVisble ? 
                    <TouchableOpacity style={styles.button} onPress={() => setScannerVisible(true)}>
                        <Text style={styles.buttonText}>Open Camera</Text>
                    </TouchableOpacity> :
                    true
                }

                {hasPermission && scannerVisble ? <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.scanner}
                    

                /> : !hasPermission && <Text style={styles.infoText}>No access to camera</Text>
                }

                {scannerVisble ? 
                    <TouchableOpacity style={styles.button} onPress={()=> {setScanned(true); setScannerVisible(false)}}>
                        <Text style={styles.buttonText}>Close Camera</Text>
                    </TouchableOpacity> :
                    true
                }

                {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
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
    contentWrapper: {
        alignItems: 'center',
        marginTop: 20
    },
    infoText: {
        fontSize: 24,
        color: colors.white
    },
    button: {
        marginTop: 40,
        width:  Dimensions.get('window').width * 0.75,
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: colors.purple,
        borderRadius: 13
    },
    buttonText: {
        fontSize: 18,
        color: colors.white
    },
    scanner: {
        width: "100%",
        height: "70%"
    }
})

export default RentABike;