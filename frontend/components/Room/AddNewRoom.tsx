import React, {useState} from "react"
import {View, Modal, TextInput, StyleSheet} from "react-native"
import {storage} from "../../store/storage"
import PrimaryButton from "../Buttons/Primary"
import AddNewModal from "../Modals/AddNewModal";

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
                    pins: [],
                }
            )
            setNewTitle('')
        }
    }

    return (
        <View>
            <AddNewModal label="Add new room" modalVisible={modalVisible} setModalVisible={setModalVisible} newText={newTitle} setNewText={setNewTitle} handleAddRoom={handleAddRoom}/>
            <PrimaryButton text="Add new room" onPressFunc={() => setModalVisible(true)} />
        </View>
    )
}