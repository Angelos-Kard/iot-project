import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../assets/colors/colors';

function Rentals(props) {
    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Rentals</Text>
            </View>

            <View style={{alignItems: 'center'}}>


            <ScrollView style={styles.rentalsWrapper}>
                <View style={styles.rentalItem}>
                    <Text style={styles.rentalCategory}>Your Active Rentals: 1</Text>
                    <View style={styles.rentalBox}>
                        <View style={styles.firstRow}>
                            <View>
                                <Text style={styles.rentalText}>Start Date: 11/11/2021</Text>
                                <Text style={styles.rentalText}>Start Time: 14:20</Text>
                                <Text style={styles.rentalText}>Time Elapse: 08:54</Text>
                            </View>
                            <View style={styles.verticalLine}></View>
                            <View>
                                <Text style={styles.rentalText}>Initial Station: #A2</Text>
                                <Text style={styles.rentalText}>Rental Time: 1h</Text>
                                <Text style={styles.rentalText}>Current Charge: 1.57$</Text>
                            </View>
                            {/* <View style={styles.thirdCol}>
                                <Image source={require('../assets/images/secured_bicycle.jpg')} height={70} width={70} />
                            </View> */}
                        </View>
                        <View style={styles.horizontalLine}></View>
                        <View style={styles.secondRow}>
                            {/* <View style={styles.firstCol2}>

                            </View>
                            <View style={styles.secondCol2}>

                            </View> */}
                            <Text style={styles.rentalText}>Battery Level: 67%</Text>
                            <Text style={styles.rentalText}>Air Pressure: 46 PSI</Text>
                        </View>
                        <View style={styles.thirdRow}>
                            <TouchableOpacity style={styles.endButton}>
                                <Text style={styles.textButton}>End Rental</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 20
    },
    title: {
        fontSize: 25,
        color: colors.white,
        fontWeight: 'bold'
    },
    rentalsWrapper: {
        marginTop: 10,
    },
    rentalItem: {
        marginBottom: 40
    },
    rentalCategory: {
        color: colors.white,
        fontStyle: 'italic',
        fontSize: 17,
        marginBottom: 10,
        marginLeft: 5
    },
    rentalBox: {
        width: 330,
        height: 160,
        backgroundColor: colors.boxGray,
        borderRadius: 20,
        
    },
    firstRow: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    verticalLine: {
        height: "100%",
        width: 1,
        backgroundColor: colors.white
    },
    horizontalLine: {
        marginVertical: 10,
        width: "100%",
        height: 1,
        backgroundColor: colors.white
    },
    secondRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    rentalText: {
        fontSize: 12,
        color: colors.white
    },
    thirdRow: {
        width: "100%",
        height: "35%",
        alignItems: 'center',
        // borderWidth: 2,
        // borderColor: colors.white,
        justifyContent: 'flex-end',
        // overflow: "visible"
    },
    endButton: {
        width: "90%",
        height: "50%",
        backgroundColor: colors.red,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    }
})

export default Rentals;