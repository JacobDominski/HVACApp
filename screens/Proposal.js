import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Switch } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'react-native-check-box'
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';
import Sign from '../components/Sign'

// TODO:
/*
    1. Add waranty yes or no
    2. Enter Preferred Start Date
    3. Enter actual start date
    4. Get customer signature
    5. Get technician signature
    6. Show electronic document all the data
    7. store that data in a JSON format where it will be displayed
*/

export default Proposal = ({ navigation }) => {    

    const [fname, setFname] = useState('')
    const [fnameError, setFnameError] = useState(false)
    const [lname, setLname] = useState('')
    const [lnameError, setLnameError] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState(false)
    const [unit, setUnit] = useState(null)
    const [unitError, setUnitError] = useState(false)
    const [unitItems, setUnitItems] = useState([
        {label: 'Split Gas', value: 'Split Gas'},
        {label: 'Split Heat Pump', value: 'Split Heat Pump'},
        {label: 'Packaged Gas', value: 'Packaged Gas'},
        {label: 'Packaged Heat Pump', value: 'Packaged Heat Pump'},
    ])
    const [openUnit, setOpenUnit] = useState(false)
    const [size, setSize] = useState(null)
    const [sizeError, setSizeError] = useState(false)
    const [sizeItems, setSizeItems] = useState([
        {label: '1.5 Ton', value: '1.5 Ton'},
        {label: '2 Ton', value: '2 Ton'},
        {label: '2.5 Ton', value: '2.5 Ton'},
        {label: '3.5 Ton', value: '3.5 Ton'},
        {label: '4 Ton', value: '4 Ton'},
        {label: '5 Ton', value: '5 Ton'},
    ])
    const [openSize, setOpenSize] = useState(false)
    const [unitLocation, setUnitLocation] = useState('')
    const [unitLocationError, setUnitLocationError] = useState(false)
    //checkbox options
    const [thermostat, setThermostat] = useState(false)
    const [secondDrainPan, setSecondDrainPan] = useState(false)
    const [transition, setTransition] = useState(false)
    const [safetySwitch, setSafetySwitch] = useState(false)
    const [startCollarAndPlenums, setStartCollarAndPlenums] = useState(false)
    const [fuseDisconnectAndFuses, setFuseDisconnectAndFuses] = useState(false)
    const [electricalWhip, setElectricalWhip] = useState(false)
    const [surgeProtector, setSurgeProtector] = useState(false)
    const [repipeGasLineAndFlueVent, setRepipeGasLineAndFlueVent] = useState(false)
    const [flushRefrigerantLine, setFlushRefrigerantLine] = useState(false)
    const [crane, setCrane] = useState(false)
    const [labor, setLabor] = useState(false)
    const [repipeDrainLine, setRepipeDrainLine] = useState(false)
    const [elbowAndStand, setElbowAndStand] = useState(false)
    const [roofJack, setRoofJack] = useState(false)

    const [warranty, setWarranty] = useState(false)
    const toggleSwitch = () => setWarranty(previousState => !previousState);
    const [date, setDate] = useState(new Date())
    const [showDate, setShowDate] = useState(false);

    const showdate = () => {
        setShowDate(true)
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
        //setShowDate(false)
    }

    const [customerSignature, setCustomerSignature] = useState({})
    const [customerSignatureError, setCustomerSignatureError] = useState(false)
    const [technicianSignature, setTechnicianSignature] = useState({})
    const [technicianSignatureError, setTechnicianSignatureError] = useState(false)

    const customerOptions = () => {
        var options = []
        if (thermostat) options.push("Thermostat")
        if (secondDrainPan) options.push("Second Drain Pan")
        if (transition) options.push("Transition")
        if (safetySwitch) options.push("Safety Switch")
        if (startCollarAndPlenums) options.push("Start Collar and Plenums")
        if (fuseDisconnectAndFuses) options.push("Fuse Disconnect and Fuses")
        if (electricalWhip) options.push("Electrical Whip")
        if (surgeProtector) options.push("Surge Protector")
        if (repipeGasLineAndFlueVent) options.push("Repipe the Gas Line and Flue Vent")
        if (flushRefrigerantLine) options.push("Flush the Refrigerant Line")
        if (crane) options.push("Crane")
        if (labor) options.push("Labor")
        if (repipeDrainLine) options.push("Repipe the Drain Line")
        if (elbowAndStand) options.push("Elbow and Stand")
        if (roofJack) options.push("Roof Jack")

        return options

    }

    const validate = () => {

        //reset all the checks
        setFnameError(false)
        setLnameError(false)
        setEmailError(false)
        setAddressError(false)
        setUnitError(false)
        setSizeError(false)
        setUnitLocationError(false)
        setCustomerSignatureError(false)
        setTechnicianSignatureError(false)

        //check if first name is empty
        if (fname == ''){
            setFnameError(true)
        }

        //check if last name is empty
        if (lname == ''){
            setLnameError(true)
        }

        //check if email is empty
        if (!(validator.isEmail(email))){
            setEmailError(true)
        }

        //check if address is empty
        if (address == ''){
            setAddressError(true)
        }

        //check if unit type is empty
        if (unit == null){
            setUnitError(true)
        }

        //check if size of unit is empty
        if (size == null){
            setSizeError(true)
        }

        //check if the unit location is empty
        if (unitLocation == ''){
            setUnitLocationError(true)
        }

        //check if customer signature has not been filled out
        if (Object.keys(customerSignature).length === 0){
            setCustomerSignatureError(true)
        }

        //check if technician signature has not been filled out
        if (Object.keys(technicianSignature).length === 0){
            setTechnicianSignatureError(true)
        }

        //if there are no errors
        if (!fnameError && 
            !lnameError && 
            !emailError && 
            !addressError && 
            !unitError && 
            !sizeError && 
            !unitLocationError && 
            !customerSignatureError && 
            !technicianSignatureError)
        {
            //validation passed
            return true
        }else{
            //Do not go on!
            return false
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                {/* First name */}
                <TextInput 
                    style={styles.input}
                    onChangeText={(e) => {
                        setFname(e)
                    }}
                    placeholder="First Name"
                />
                <Text style={styles.error}>{fnameError && "Enter customer's first name"}</Text>
            </View>
            <View style={styles.inputGroup}>
                {/* Last Name */}
                <TextInput 
                    style={styles.input}
                    onChangeText={(e) => {
                        setLname(e)
                    }}
                    placeholder="Last Name"
                />
                <Text style={styles.error}>{lnameError && "Enter customer's last name"}</Text>
            </View>
            <View style={styles.inputGroup}>
                {/* Email */}
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
                    placeholder="Email"
                />
                <Text style={styles.error}>{emailError && "Enter a valid Email"}</Text>
            </View>
            <View style={styles.inputGroup}>
                {/* Address */}
                <TextInput 
                    style={styles.input}
                    onChangeText={(e) => {
                        setAddress(e)
                    }}
                    placeholder="Address"
                />
                <Text style={styles.error}>{addressError && "Enter customer's address"}</Text>
            </View>
            <View style={styles.inputGroup}>
                {/* Unit type and size */}
                <View style={{flexDirection: "row"}}>
                    <View style={{width: "59%"}}>
                        <DropDownPicker 
                            style={styles.dropdown}
                            open={openUnit}
                            value={unit}
                            items={unitItems}
                            setOpen={setOpenUnit}
                            setValue={setUnit}
                            setItems={setUnitItems}
                            placeholder="Type of Unit"
                            containerStyle={styles.dropdownContainer}
                            textStyle={{fontSize: 20, color: "grey"}}
                            listMode="SCROLLVIEW"
                            listItemContainerStyle={{
                                height: 45
                            }}
                        
                        />
                        <Text style={styles.error}>{unitError && "Enter type of unit"}</Text>
                    </View>
                    <View style={{width: "58%"}}>
                    
                        <DropDownPicker 
                            style={styles.dropdown}
                            open={openSize}
                            value={size}
                            items={sizeItems}
                            setOpen={setOpenSize}
                            setValue={setSize}
                            setItems={setSizeItems}
                            placeholder="Size of Unit"
                            containerStyle={styles.dropdownContainer}
                            textStyle={{fontSize: 20, color: "grey"}}
                            listMode="SCROLLVIEW"
                            
                        />
                        <Text style={styles.error}>{sizeError && "Enter size of unit"}</Text>
                    
                    </View>
                </View>
            </View>
            <View style={styles.inputGroup}>
                {/* Unit location */}
                <TextInput 
                    style={styles.input}
                    onChangeText={(e) => {
                        setUnitLocation(e)
                    }}
                    placeholder="Unit Location"
                />
                <Text style={styles.error}>{unitLocationError && "Enter the customer's unit location"}</Text>
            </View>
            <View style={styles.inputGroup}>
                {/* check boxes */}
                <CheckBox 
                    onClick={()=>{
                        setThermostat(!thermostat)
                    }}
                    isChecked={thermostat}
                    rightText={"New Thermostat"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setSecondDrainPan(!secondDrainPan)
                    }}
                    isChecked={secondDrainPan}
                    rightText={"New Secondary Drain Pan"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setTransition(!transition)
                    }}
                    isChecked={transition}
                    rightText={"New Transition"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setSafetySwitch(!safetySwitch)
                    }}
                    isChecked={safetySwitch}
                    rightText={"Safety Switch"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setStartCollarAndPlenums(!startCollarAndPlenums)
                    }}
                    isChecked={startCollarAndPlenums}
                    rightText={"Start Collars and Plenums"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setFuseDisconnectAndFuses(!fuseDisconnectAndFuses)
                    }}
                    isChecked={fuseDisconnectAndFuses}
                    rightText={"Fuse disconnect and fuses"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setElectricalWhip(!electricalWhip)
                    }}
                    isChecked={electricalWhip}
                    rightText={"Electrical Whip"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setSurgeProtector(!surgeProtector)
                    }}
                    isChecked={surgeProtector}
                    rightText={"Surge Protector"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setRepipeGasLineAndFlueVent(!repipeGasLineAndFlueVent)
                    }}
                    isChecked={repipeGasLineAndFlueVent}
                    rightText={"Repipe the Gas Line and Flue Vent"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setFlushRefrigerantLine(!flushRefrigerantLine)
                    }}
                    isChecked={flushRefrigerantLine}
                    rightText={"Flush Refrigerant Line"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setCrane(!crane)
                    }}
                    isChecked={crane}
                    rightText={"Crane"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setLabor(!labor)
                    }}
                    isChecked={labor}
                    rightText={"Labor"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setRepipeDrainLine(!repipeDrainLine)
                    }}
                    isChecked={repipeDrainLine}
                    rightText={"Repipe the Drain Line"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setElbowAndStand(!elbowAndStand)
                    }}
                    isChecked={elbowAndStand}
                    rightText={"Elbow and Stand"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
                <CheckBox 
                    onClick={()=>{
                        setRoofJack(!roofJack)
                    }}
                    isChecked={roofJack}
                    rightText={"Roof Jack"}
                    rightTextStyle={{fontSize: 20}}
                    checkedCheckBoxColor={"#1491f7"}
                    uncheckedCheckBoxColor={"black"}
                />
            </View>
            <View style={styles.inputGroup}>
                {/* Warranty */}
                <View style={styles.warranty}>
                    <Text style={styles.text}>Would you like to add the extended warranty?</Text>
                    <Switch 
                        style={{marginVertical: 10}}
                        trackColor={{false: "#767577", true: "#1491f7"}}
                        thumbColor={warranty ? "#fff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={warranty}
                    />
                </View>
            </View>
            <View style={styles.inputGroup}>
                {/* Preferred Start date */}
                <Text style={styles.text}>Preferred start date:</Text>
                <Pressable
                    style={{
                        backgroundColor: "#1491f7",
                        padding: 10,
                        borderRadius: 5
                    }}
                    onPress={showdate}
                >
                    <Text style={{color: "#fff", fontSize: 20}}>Change Date: {date.getMonth()+1} / {date.getDate()} / {date.getFullYear()}</Text>
                </Pressable>
                {showDate && (<DateTimePicker 
                    mode="date"
                    value={date}
                    onChange={onChange}
                />)}
            </View>
            <View style={styles.inputGroup}>
                {/* Customer Signature */}
                <Sign
                    text={"Customer Signature"}
                    signatureImg={(signatureObj)=>{
                        //console.log(signatureObj)
                        setCustomerSignature(signatureObj)
                    }}
                />
                <Text style={styles.error}>{customerSignatureError && "Enter the customer's signature"}</Text>
            </View>
            <View style={styles.inputGroup}>
                {/* Technician Signature */}
                <Sign
                    text={"Technician Signature"}
                    signatureImg={(signatureObj)=>{
                        console.log(signatureObj)
                        setTechnicianSignature(signatureObj)
                    }}
                />
                <Text style={styles.error}>{technicianSignatureError && "Enter the technician's signature"}</Text>
            </View>
            <View style={styles.inputGroup}>
                <Pressable
                    style={styles.generate}
                    onPress={() => {
                        //if passed validation
                        if(validate()){
                            //create customer proposal object   
                            //go to check screen
                            const uuid = uuidv4()
                            const options = customerOptions()
                            const customerProposal = {
                                id: uuid,
                                name: `${fname} ${lname}`,
                                email: `${email}`,
                                address: `${address}`,
                                unitType: `${unit}`,
                                unitSize: `${size}`,
                                unitLoc: `${unitLocation}`,
                                addOns: options,
                                warrantySelected: warranty,
                                startDate: `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`,
                                customerSignature: customerSignature,
                                technicianSignature: technicianSignature
                            }
                            navigation.navigate("Check Proposal", {customerProposal: customerProposal})
                        }
                    }}
                >
                    <Text style={styles.generateText}>Generate Proposal</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        padding: 20,
    }, 
    inputGroup: {
        marginVertical: 10,
    },
    input: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 4,
        fontSize: 20
    }, 
    text: {
        fontSize: 20
    },
    error: {
        color: "red"
    },
    dropdown: {
        
    },
    dropdownContainer: {
        height: 60,
        width: "70%"
    },
    warranty: {
        alignItems: "flex-start",

    },
    generate: {
        backgroundColor: "#1491f7",
        padding: 10,
        borderRadius: 10,
        elevation: 15,
        marginBottom: 30
    }, 
    generateText: {
        color: "white",
        fontSize: 20,
        textAlign: "center"
    }
})