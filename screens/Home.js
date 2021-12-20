import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Divider } from 'react-native-paper';
import { data } from '../proposals/data'
import { Item } from '../components/Item'
import { useIsFocused } from '@react-navigation/native';
//import Settings from './screens/Settings'

export default Home = ({ navigation }) => {
    const [array, setArray] = useState(data)
    const isFocused = useIsFocused()
    
    const addElement = () => {
        if(isFocused){
            console.log(true)
        }else{
            console.log(false)
        }
    }

    useEffect(()=>{
        const newData = navigation.addListener('focus', (e)=>{
            console.log("Back to Home Screen", e)
            addElement()
        })
    }, [data])

    return (
        <View style={styles.container}>
            <View style={styles.topNav}>
                <View style={styles.icons}>
                    <Pressable
                        onPress={()=>{
                            //addElement()
                            navigation.openDrawer()
                        }}
                    >
                        <Ionicons name="ios-menu" size={65} color="#1491f7" />
                    </Pressable>
                    <Pressable
                        onPress={()=> {
                            navigation.navigate("New Proposal")
                        }}
                    >
                        <FontAwesome name="plus-circle" size={65} color="#1491f7" />
                    </Pressable>
                </View>
            </View>
            <Divider />
            <View style={styles.bottomNav}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={array}
                    renderItem={({ item }) => (
                        <Item data={item} />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }, 
    topNav: {
        margin: 15,
        marginHorizontal: 30
    },
    bottomNav: {

    },
    icons: {
        flexDirection: "row", 
        justifyContent: "space-between"
    },
    item: {
        backgroundColor: '#eee',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between"
      },
    title: {
        fontSize: 17,
    },
    data: {

    },
    circle: {
        backgroundColor: "green",
        width: 65,
        height: 65,
        borderRadius: 40,
    }
})