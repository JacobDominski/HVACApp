import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default ShowProposal = ({ proposalData }) => {
    const date = new Date()

    const options = () => {
        let addons = ""
        for (const addon of proposalData.addOns) {
            addons += addon + "; "
        }
        addons += "hook up to existing duct system (and sael any gaps); evacuate and start system. Old equipment will be removes upon clean up."
        return addons
    }

    return (
        <ScrollView style={styles.viewData}>
            {/* Top Section */}
            <View style={styles.topSection}>
                <Image 
                    style={styles.logo}
                    source={require('../assets/Ultimate-Air-LogoSmall.jpg')}
                    resizeMode="contain"
                />
                <View>
                    <Text style={styles.paragraphText}>Steve's Ultimate Air Heating and Cooling Service</Text>
                    <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                        <Text style={styles.paragraphText}>Chandler, AZ               </Text>
                        <Text style={{fontSize: 12, fontWeight: "bold"}}>480-458-7287</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                        <Text style={styles.paragraphText}>www.stevesultimateair.com          </Text>
                        <Text style={styles.paragraphText}>ROC#267871</Text>
                    </View>
                </View>
            </View>
            {/* Customer Information */}
            <View style={styles.customerInfo}>
                <Text style={{fontSize: 13, fontWeight: "bold"}}>{proposalData.name}</Text>
                <Text style={styles.paragraphText}>{proposalData.address}</Text>
                <Text style={styles.paragraphText}>{`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`}</Text>
            </View>
            {/* Options */}
            <Text style={{fontSize: 12, textDecorationLine:"underline"}}>Remove and replace {proposalData.unitSize} {proposalData.unitType}.</Text>
            <Text style={styles.paragraphText}>Includes: {options()}</Text>
            {/* Prices */}
            <View style={styles.priceLayout}>
                <View style={styles.priceColumn}>
                    <Text style={styles.paragraphText}>____ Bryant 14SEER</Text>
                </View>
                <View>
                    <Text style={styles.paragraphText}>Price **</Text>
                    <Text style={styles.paragraphText}>$8375.00</Text>
                </View>
            </View>
            {/* Warranty */}
            <Text style={styles.paragraphText}>WARRANTY:</Text>
            <View style={styles.warrantyLayout}>
                <Entypo name="check" size={12} color="black" style={{marginHorizontal: 10}}/>
                <Text style={{fontSize: 12, width: "93%"}}>10 years functional parts from the manufacturer for original purchaser. Subsequent owners receive 5 years from the date of installation.</Text>
            </View>
            <View style={styles.warrantyLayout}>
                <Entypo name="check" size={12} color="black" style={{marginHorizontal: 10}}/>
                <Text style={{fontSize: 12, width: "93%"}}>**2 years contractor provided labor and refrigeration allowance from Steve's Ultimate Air. {proposalData.warrantySelected && `If you are interested in a 10 year labor warranty and refrigeration allowance, please add &900 to the price above and initial here _${proposalData.name.match(/\b(\w)/g).join('')}_`}</Text>
            </View>
            <View style={styles.warrantyLayout}>
                <Entypo name="check" size={12} color="black" style={{marginHorizontal: 10}}/>
                <Text style={{fontSize: 12, width: "93%"}}>1 spring and 1 fall maintenance after the first year</Text>
            </View>
            {/* Agreement */}
            <View style={styles.agreement}>
                <Text style={styles.paragraphText}>
                    I, the customer, have the authority to order the work outlined above and understand
                    that the terms of agreement on page two are part of this proposal and incorporated herein.
                    I further understand that payment is due at the time of installation. If accepted, 
                    please make your selection, choose a preferred start date, sign page one, read and initial
                    page two, then return both pages via fax to 480-240-5468 or e-mail stevesultimateair@gmail.com.
                    Once confirmed, you will received a signed copy back.
                </Text>
            </View>
            {/* Start date */}
            <View style={styles.customer}>
                <View style={styles.preferredDate}>
                    <Text style={styles.paragraphText}>Preferred start date </Text>
                    <Text style={styles.input}>    {proposalData.startDate}       </Text>
                    <Text style={styles.paragraphText}>Actual start date </Text>
                    <Text style={styles.input}>  {proposalData.startDate}       </Text>
                </View>
                <View style={styles.signatureAndDates}>
                    <View style={styles.names}>
                        {/* image with border bottom */}
                        <View style={styles.signatures}>
                            <Image 
                                style={styles.signatures}
                                source={{
                                    uri: proposalData.customerSignature.uri
                                }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.paragraphText}>Customer's Signature</Text>
                        <Text style={styles.printName}>         {proposalData.name}         </Text>
                        <Text style={styles.paragraphText}>Print Name</Text>
                        <View style={styles.signatures}>
                            <Image 
                                style={styles.signatures}
                                source={{
                                    uri: proposalData.technicianSignature.uri
                                }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.paragraphText}>Contractor's Signature</Text>
                    </View>
                    <View style={styles.dates}>
                        <View>
                            <Text style={styles.input}>{`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`}</Text>
                            <Text style={styles.paragraphText}>Date</Text>
                        </View>
                        <View>
                            <Text style={styles.input}>{`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`}</Text>
                            <Text style={styles.paragraphText}>Date</Text>
                        </View>
                    </View>
                </View>
                
            </View>
        </ScrollView>
    )
}




const styles =  StyleSheet.create({
    viewData: {
        margin: 5,
        padding: 5,
        backgroundColor: "#fff",
        width: "95%",
    },
    topSection: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    logo: {
        width: 50,
        height: 50,
    },
    paragraphText: {
        fontSize: 12,
    },
    customerInfo: {
        alignItems: "center",
        marginVertical: 25,
    }, 
    priceLayout: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginVertical: 30,
    },
    priceColumn: {
        marginRight: "20%",
    },
    warrantyLayout: {
        flexDirection: "row",
    },
    agreement: {
        marginVertical: 20,
    },
    customer: {},
    preferredDate: {
        flexDirection: "row",
    },
    input: {
        fontSize: 12,
        //textDecorationLine: "underline",
        marginRight: 10,
        borderColor: "black",
        borderBottomWidth: 1,
    },
    printName: {
        fontSize: 12,
        //marginRight: 10,
        width: "90%",
        borderColor: "black",
        borderBottomWidth: 1,
        marginTop: 10,
    },
    signatures: {
        // images
        height: 30,
        width: "90%",
        borderColor: "black",
        borderBottomWidth: 1,
    },
    signatureAndDates: {
        flexDirection:"row",
        marginVertical: 20,
    },
    names: {
        width: "65%",
    },
    dates: {
        width: "50%",
        justifyContent: "space-between",
    },


})