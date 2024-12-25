import React, {useState} from "react"
import {View, Modal, TextInput, StyleSheet} from "react-native"
import {storage} from "../../store/storage"
import PrimaryButton from "../Buttons/Primary"
import AddNewModal from "../Modals/AddNewModal";

export default function AddNewThing({room_id}: {room_id: number}) {
    const addThing = storage((state) => state.addThing)
    const [newName, setNewName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const things = storage((state) => state.things)

    const handleAddRoom = () => {
        if (newName.trim()) {
            addThing(
                {
                    id: things.length > 0 ? Math.max(...things.map(p => p.id)) + 1 : 1,
                    room_id: room_id,
                    name: newName,
                    snip: null,
                    path_to_images: null,
                    note: null,
                }
            )
            setNewName('')
        }
    }

    return (
        <View>
            <AddNewModal label="Add new thing" modalVisible={modalVisible} setModalVisible={setModalVisible} newText={newName} setNewText={setNewName} handleAddRoom={handleAddRoom}/>
            <PrimaryButton text="Add new thing" onPressFunc={() => setModalVisible(true)} />
        </View>
    )
}