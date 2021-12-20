import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Pressable, Modal, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { data } from '../proposals/data';
import { v4 as uuidv4 } from 'uuid';
import SignatureScreen from 'react-native-signature-canvas';

const Signature = ({ text, onOK }) => {

    const ref = useRef();
    
    const handleOK = (sign) => {
        const uuid = uuidv4()
        const path = FileSystem.cacheDirectory + `${uuid}.png`;
        FileSystem.writeAsStringAsync(
            path,
            sign.replace("data:image/png;base64,", ""),
            { encoding: FileSystem.EncodingType.Base64 }
        )
            .then(()=>FileSystem.getInfoAsync(path))
            .then((e)=>{
                //console.log(e)
                onOK(e)
            })
            .catch(console.error);
    }

    const handleEmpty = () => console.log('empty')
    const handleClear = () => console.log('clear success!')
    //runs when I click the confirm
    const handleData = (data) => {
        //ref.current.readSignature();
        //console.log('Handle Data: ', data)
    }
    //runs when I stop signing
    const handleEnd = () => {
        console.log('Handle End')
    }

    const signStyle = `
        .m-signature-pad {
            margin-left: 0px;
            margin-top: 0px;
        }
        
    `;

    return (
        <SignatureScreen 
            ref={ref}
            onEnd={handleEnd}
            onOK={handleOK}
            onEmpty={handleEmpty}
            onClear={handleClear}
            onGetData={handleData}
            autoClear={false}
            descriptionText={text}
            webStyle={signStyle}
        />
    )
}

export default Sign = ({ text, signatureImg }) => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View>
            <Pressable
                onPress={()=>{setModalVisible(true)}}
                style={styles.btn}
            >
                <Text style={styles.btnTitle}>{text}</Text>
            </Pressable>
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={()=>setModalVisible(false)}
                >
                    <View style={styles.centerModal}>
                        <View style={styles.signatureView}>
                            <Signature 
                                style={styles.signature}
                                onOK={(signature)=>{
                                    signatureImg(signature)
                                    setModalVisible(false)
                                }}
                                text={text}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#2196F3",
        borderRadius: 5,
        padding: 10
    },
    btnTitle: {
        color: "#fff",
        fontSize: 20
    },
    centerModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    signatureView: {
        backgroundColor: "white",
        borderRadius: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "98%",
        height: "98%",
    },
    signature: {
        
    }
})