import React, {useState} from "react"
import {View, Modal, TextInput, StyleSheet} from "react-native"
import {storage} from "../store/storage"
import PrimaryButton from "./Buttons/Primary"
import {Text} from "./Text/Default"
import {grayPrimary, grayPrimaryDarker} from "../const/Colors";
import {InputText} from "./Input/InputText";

export default function AddNewRoom({palace_id}: {palace_id: number}) {
    const addRoom = storage((state) => state.addRoom);
    const [newTitle, setNewTitle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const rooms = storage((state) => state.rooms);

    const handleAddRoom = () => {
        if (newTitle.trim()) {
            addRoom(
                {
                    id: rooms.length > 0 ? Math.max(...rooms.map(p => p.id)) + 1 : 1,
                    palace_id: palace_id,
                    name: newTitle,
                    snip: null,
                    path_to_image: null,
                    note: null,
                    things: null,
                    pins: [],
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
                        <InputText label="Add new room" get={newTitle} set={setNewTitle}/>

                        <View style={styles.buttonRow}>
                            <PrimaryButton text="Cancel" onPressFunc={() => setModalVisible(false)} />
                            <PrimaryButton text="Add Room" onPressFunc={handleAddRoom} />
                        </View>
                    </View>
                </View>
            </Modal>

            <PrimaryButton text="Add new room" onPressFunc={() => setModalVisible(true)} />
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