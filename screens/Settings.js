import React, { useState } from 'react'
import validator from 'validator';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native'
import { data } from '../proposals/data'
import { Ionicons } from '@expo/vector-icons'

export default Settings = ({ navigation }) => {
    const [email, setEmail] = useState(data.userEmail)
    const [emailError, setEmailError] = useState(false)
    return(
        <View style={styles.container}>
            <View style={styles.topNav}>
                <Pressable
                    onPress={()=>{
                        data.userEmail = email
                        navigation.openDrawer()
                        //console.log(data.userEmail)
                    }}
                >
                    <Ionicons name="ios-menu" size={65} color="#1491f7"/>
                </Pressable>
                <Text style={styles.title}>Settings</Text>
                
            </View>
            <View style={styles.settings}>
                <TextInput 
                    style={styles.input}
                    onChangeText={(e) => {
                        if(validator.isEmail(e)){
                            setEmail(e)
                            setEmailError(false)
                        }else{
                            setEmailError(true)
                        }
                    }}
                    value={email}
                    placeholder="Email"
                />
                <Text style={styles.error}>{emailError && "Invalid Email"}</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff"
    },
    topNav: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    settings: {
        width: "90%"
    },  
    title: {
        fontSize: 20,
        margin: 20,
    } ,
    error: {
        color: "red"
    },
    input: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 4,
        fontSize: 20,
    }
})