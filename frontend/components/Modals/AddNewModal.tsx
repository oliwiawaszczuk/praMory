import {Modal, StyleSheet, View} from "react-native";
import {InputText} from "../Input/InputText";
import PrimaryButton from "../Buttons/Primary";
import React from "react";
import {grayPrimary} from "../../const/Colors";

interface AddNewModalProps {
    label: string
    modalVisible: boolean
    setModalVisible: any
    newText: string
    setNewText: (newText: string) => void
    handleAddRoom: any
}

export default function AddNewModal({label, modalVisible, setModalVisible, newText, setNewText, handleAddRoom}: AddNewModalProps) {
    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <InputText label={label} get={newText} set={setNewText}/>

                    <View style={styles.buttonRow}>
                        <PrimaryButton text="Cancel" onPressFunc={() => setModalVisible(false)} />
                        <PrimaryButton text="Add" onPressFunc={() => {handleAddRoom(); setModalVisible(false)}} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        backgroundColor: grayPrimary,
        padding: 20,
        borderRadius: 10,
        width: '80%',
        elevation: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})