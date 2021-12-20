import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, Linking, Image, Platform} from 'react-native';
import { data } from '../proposals/data';
//import { openComposer  } from "react-native-email-link";
import ShowProposal from '../components/ShowProposal'
//import * as MailComposer from 'expo-mail-composer';
import testImg from '../assets/Ultimate-Air-LogoSmall.jpg'
import * as Print from 'expo-print';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as FileSystem from 'expo-file-system';


export default CheckProposal = ({route, navigation}) => {
    const { customerProposal } = route.params
    const date = new Date()
//    const API_KEY = "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"

    const options = () => {
        let addons = ""
        for (const addon of customerProposal.addOns) {
            addons += addon + "; "
        }
        addons += "hook up to existing duct system (and sael any gaps); evacuate and start system. Old equipment will be removes upon clean up."
        return addons
    }

    const createAndSavePDF = async (html) => {
        try {
            const { uri } = await Print.printToFileAsync({ html })

            if (Platform.OS === "ios"){
                console.log("ios")
                await Sharing.shareAsync(uri)
            }else{
                console.log("Android")
                const permission = await MediaLibrary.requestPermissionsAsync()
                console.log("Permission", permission)
                if (permission.granted) {
                    console.log("I'm in")
                    ///the problem ->
                    const file = await MediaLibrary.createAssetAsync(uri)
                    const album = await MediaLibrary.getAlbumAsync('Expo')
                    console.log(album)
                    if (album == null) {
                        console.log("Create album")
                        await MediaLibrary.createAlbumAsync('Expo', file, true)
                    }else{
                        console.log("Add to album")
                        await MediaLibrary.addAssetsToAlbumAsync([file], album, false)
                    }
                }
                else{
                    console.log("Permission denied")
                }
            }
            console.log(uri)
            return uri
        } catch (error) {
            console.log(error)
        }
    }

    const fetchImageData = async (uri) => {
        console.log("uri: ", uri)
        const data = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64
        })
        const fileType = uri.slice(uri.length-3, uri.length)
        console.log(fileType)
        const imageData = `data:image/${fileType};base64,${data}`
        //console.log(imageData)
        return imageData
    }
    fetchImageData(customerProposal.technicianSignature.uri)

    return (
        <View style={styles.container}>
            <ShowProposal proposalData={customerProposal}/>
            <Pressable 
                style={styles.generate}
                onPress={()=>{
                    data.push(customerProposal)

                    const pdf = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Pdf Content</title>
                        <style>
                            html{
                                font-size: 12px;
                            }
                        </style>
                    </head>
                    <body style="display: flex; justify-content: center;">
                        <div style="padding: 0.5in;">
                            <div id="topSection" style="display: flex; flex-direction: row;">
                                <img src="https://stevesultimateair.com/images/img-ac_guy.png" width="80" height="80">
                                <div style="text-align: right; margin-left: 2.5in;">
                                    <p>Steve's Ultimate Air Heating & Cooling Services LLC</p>
                                    <p>Chandler, AZ <b style="margin-left: 3rem;">480-458-7287</b></p>
                                    <p>www.stevesultimateair.com <span style="margin-left: 3rem;">ROC#267871</span></p>
                                </div>
                            </div>
                            <div id="customerInfo" style="text-align: center; margin: 4rem 0rem">
                                <p><b>${customerProposal.name}</b></p>
                                <p>${customerProposal.address}</p>
                                <p>${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
                            </div>
                            <div id="options">
                                <p><u>Remove and replace ${customerProposal.unitSize} ${customerProposal.unitType}.</u></p>
                                <p>Includes: ${options()} </p>
                            </div>
                            <div id="prices" style="display: flex; flex-direction: row; align-items: flex-end;">
                                <div id="column" style="margin-right: 10rem;">
                                    <p>____ Bryant 14 SEER</p>
                                </div>
                                <div id="column">
                                    <p>Price **</p>
                                    <p>$8375.00</p>
                                </div>
                            </div>
                            <div id="warranty" style="margin: 2rem 0rem">
                                <p>WARRANTY:</p>
                                <ul>
                                    <li>10 years functional parts warranty from the manufacturer for the original purchaser.  Subsequent owners receive 5 years from the date of installation. </li>
                                    <li>**2 year labor warranty from Steve’s Ultimate Air. ${customerProposal.warrantySelected && "If you are interested in a 10 year contractor provided labor and refrigeration allowance (transferrable to a subsequent owner), add $900 to the total above and initial here _____ . "} </li>
                                    <li>1 Spring and 1 Fall maintenance from Steve's Ultimate Air after the first year</li>
                                </ul>
                            </div>
                            <div id="agreement">
                                <p>I, the customer, have the authority to order the work 
                                    outlined above and understand that the terms of agreement 
                                    on page two are part of this proposal and incorporated 
                                    herein.  I further understand that payment is due at the 
                                    time of installation.  If accepted, please make your selection, 
                                    choose a preferred start date, sign page one, read and initial 
                                    page two, then return both pages via fax to 480-240-5468 or 
                                    e-mail stevesultimateair@gmail.com.  Once confirmed, you will 
                                    receive a signed copy back.</p>
                            </div>
                            <div id="startDate">
                                <div id="preferredStartDate">
                                    <span style="margin-right: 3rem;">
                                        Preferred Start Date <span style="border-bottom: 1px solid black; width: 20px">&emsp;&emsp;&emsp;&emsp;${customerProposal.startDate}&emsp;&emsp;&emsp;&emsp;</span>
                                    </span>
                                    <span>Actual Start Date <span style="border-bottom: 1px solid black; width: 20px">&emsp;&emsp;&emsp;&emsp;${customerProposal.startDate}&emsp;&emsp;&emsp;&emsp;</span></span>
                                </div>
                                <div id="signatures" style="display: flex; flex-direction: row;">
                                    <div id="column" style="line-height: 0.5; margin-right: 3rem;">
                                        <div style="margin: 30px 0px">
                                            <div id="img" style="border-bottom: 1px solid black; width: 400px">
                                                <img src="${customerProposal.customerSignature.uri}" alt="customer Signature" width="70" height="70">
                                            </div>
                                            <p>Customer's Signature</p>
                                        </div>
                                        <div style="margin: 30px 0px">
                                            <div id="img" style="border-bottom: 1px solid black; width: 400px">
                                                <p>${customerProposal.name}</p>
                                            </div>
                                            <p>Print Name</p>
                                        </div>
                                        <div style="margin: 30px 0px">
                                            <div id="img" style="border-bottom: 1px solid black; width: 400px">
                                                <img src="${customerProposal.technicianSignature.uri}" alt="customer Signature"  width="70" height="70">
                                            </div>
                                            <p>Contractor's Signature</p>
                                        </div>
                                    </div>
                                    <div id="column" style="line-height: 1; display:flex; flex-direction: column; justify-content: space-between; margin: 3rem 0rem 1rem ">
                                        <div>
                                            <div id="date" style="border-bottom: 1px solid black; width: 200px;">
                                                <p style="margin: 0">${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
                                            </div>
                                            <p>date</p>
                                        </div>
                                        <div>
                                            <div id="date" style="border-bottom: 1px solid black; width: 200px;">
                                                <p style="margin: 0">${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
                                            </div>
                                            <p>date</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </body>
                    </html>
                    `
                    const pdfFile = createAndSavePDF(pdf)
                    //console.log("PDF", pdfFile)
                    Linking.openURL(`mailto:${customerProposal.email}?subject=Your Proposal&body=Here is your copy of the proposal from Steve's Ultimate Air Heating and Cooling Services.`)
                    
                    navigation.popToTop()
                }}
            >
                <Text style={styles.generateText}>Complete Proposal</Text>
            </Pressable>
        </View>
    )
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },

    generate: {
        backgroundColor: "#1491f7",
        padding: 10,
        borderRadius: 10,
        elevation: 15,
        marginTop: 10,
        marginBottom: 30,
        width: "95%",
    }, 
    generateText: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
    }

})

