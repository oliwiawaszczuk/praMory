import React, {useEffect, useState} from "react";
import {Button, TextInput, FlatList, View, Text} from "react-native";
import {storage} from "../store/storage";

export default function HomeScreen() {
    const addPalace = storage((state) => state.addPalace);
    const palaces = storage((state) => state.palaces);
    const [newTitle, setNewTitle] = useState('');

    const handleAddPalace = () => {
        addPalace({id: 1, title: newTitle});
        setNewTitle('');
    };

    return (
        <>
            <TextInput
                placeholder="Enter palace title"
                value={newTitle}
                onChangeText={setNewTitle}
                style={{borderWidth: 1, marginBottom: 10, padding: 5}}
            />
            <Button title="Add Palace" onPress={handleAddPalace}/>

            <FlatList
                data={palaces}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item, index}) => (
                    <View>
                        <Text>{item.title}</Text>
                    </View>
                )}
            />
        </>
    )
}