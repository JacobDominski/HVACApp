import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Modal } from 'react-native';
import ShowProposal from '../components/ShowProposal'

export const Item = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false)
  return(
    <View style={styles.item}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ShowProposal proposalData={data}/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={()=>{
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Hide Proposal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.data}
        onPress={() => {
          setModalVisible(true)
          console.log(modalVisible)
        }}
      >
        <View>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.title}>{data.address}</Text>
            <Text style={styles.title}>{data.unitLoc}</Text>
        </View>
        <View style={styles.circle}><Text></Text></View>
      </Pressable>
    </View>
  )};


const styles = StyleSheet.create({
  item: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
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
    width: "95%",
    height: "98%",
  },
  button: {
    width: "100%",
    padding: 10
  },
  buttonOpen: {

  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  circle: {
    backgroundColor: "green",
    width: 65,
    height: 65,
    borderRadius: 40,
    },
  data: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});