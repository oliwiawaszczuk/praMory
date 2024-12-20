import React, {useState} from "react"
import {View, Modal, TextInput, StyleSheet} from "react-native"
import {storage} from "../store/storage"
import PrimaryButton from "./Buttons/Primary"
import {Text} from "./Text/Default"
import {grayPrimary, grayPrimaryDarker} from "../const/Colors";
import {InputText} from "./Input/InputText";

export default function AddNewPalace() {
    const addPalace = storage((state) => state.addPalace);
    const [newTitle, setNewTitle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const palaces = storage((state) => state.palaces);

    const handleAddPalace = () => {
        if (newTitle.trim()) {
            addPalace(
                {
                    id: palaces.length > 0 ? Math.max(...palaces.map(p => p.id)) + 1 : 1,
                    title: newTitle,
                    path_to_image: null,
                    pins: null,
                    rooms: null,
                    note: null,
                }
            )
            setNewTitle('')
            setModalVisible(false)
        }
    }

    return (
        <View>
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <InputText label="Add new palace" get={newTitle} set={setNewTitle}/>

                        <View style={styles.buttonRow}>
                            <PrimaryButton text="Cancel" onPressFunc={() => setModalVisible(false)} />
                            <PrimaryButton text="Add Palace" onPressFunc={handleAddPalace} />
                        </View>
                    </View>
                </View>
            </Modal>

            <PrimaryButton text="Add new palace" onPressFunc={() => setModalVisible(true)} />
        </View>
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