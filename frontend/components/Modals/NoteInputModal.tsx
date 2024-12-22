import {Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import NoteInput from "../Input/Note";
import PrimaryButton from "../Buttons/Primary";
import React from "react";

interface NoteInputModalProps {
    modalVisible: boolean;
    setModalVisible: any,
    noteEditText: string,
    setNoteEditText: any,
    saveFunc: any,
}

export default function NoteInputModal({modalVisible, setModalVisible, noteEditText, setNoteEditText, saveFunc}: NoteInputModalProps) {
    return (
        <Modal visible={modalVisible} transparent onRequestClose={() => setModalVisible(false)}>
            <TouchableOpacity activeOpacity={0.9} style={styles.overlay}
                              onPress={() => setModalVisible(false)}>
                <View style={styles.modalContent}>
                    <NoteInput startValue={noteEditText} onChange={setNoteEditText}/>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            style={styles.button}
                            text="Save"
                            onPressFunc={saveFunc}
                        />
                        <PrimaryButton
                            style={styles.button}
                            text="Cancel"
                            onPressFunc={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
        height: "80%",
        borderRadius: 10,
        padding: 20,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        flexDirection: "column",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
    },
});