import {Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {InputText} from "../Input/InputText";
import PrimaryButton from "../Buttons/Primary";
import {Text} from "../Text/Default";
import React, {useEffect, useState} from "react";
import {grayPrimary, greenPrimary, greenPrimaryDarker, yellowPrimary} from "../../const/Colors";

interface TextEditAndDeleteModalProps {
    newTitle: string
    setNewTitle: (newTitle: string) => void
    handleSave: any
    visibleEditModal: boolean
    setVisibleEditModal: (visibleEditModal: boolean) => void
    handleRemove: any
}

export default function TextEditAndDeleteModal({newTitle, setNewTitle, handleSave, handleRemove, visibleEditModal, setVisibleEditModal}: TextEditAndDeleteModalProps) {
    const [visibleConfirmDeleteModal, setVisibleConfirmDeleteModal] = useState(false)

    return (
        <>
            <Modal
                transparent={true}
                visible={visibleEditModal}
                onRequestClose={() => setVisibleEditModal(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <InputText label="Enter new title / name" get={newTitle} set={setNewTitle}/>
                        <View style={styles.modalActions}>
                            <PrimaryButton style={{backgroundColor: "#dd3737", borderColor: "#9f1616"}} text="Delete" onPressFunc={() => setVisibleConfirmDeleteModal(true)} />
                            <PrimaryButton text="Save Changes" onPressFunc={() => {handleSave(); setVisibleEditModal(false)}} />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={visibleConfirmDeleteModal}
                onRequestClose={() => setVisibleConfirmDeleteModal(false)}
            >
                <TouchableOpacity activeOpacity={1} style={styles.modalBackground} onPress={() => setVisibleConfirmDeleteModal(false)}>
                    <View style={styles.modalContent}>
                        <Text style={{fontSize: 16, marginBottom: 10}}>Are you sure you want to delete this palace?</Text>
                        <View style={styles.modalActions}>
                            <PrimaryButton text="Cancel" onPressFunc={() => {
                                setVisibleConfirmDeleteModal(false)
                                setVisibleEditModal(false)
                            }} />
                            <PrimaryButton text="Confirm" onPressFunc={handleRemove} />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    )
}

const styles= StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: 300,
        backgroundColor: grayPrimary,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
})