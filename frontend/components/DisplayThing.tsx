import React, {useEffect} from "react";
import {View, StyleSheet} from "react-native";
import {Thing} from "../types/Thing";
import {Text} from "./Text/Default";
import {yellowPrimaryDarker} from "../const/Colors";

interface DisplayThingProps {
    thing: Thing
}

export default function DisplayThing({thing}: DisplayThingProps) {

    return (
        <View>
            {thing.name && <Text style={styles.borderText}>{thing.name}</Text>}
            {thing.snip && <Text style={styles.borderText}>{thing.snip}</Text>}
            {thing.note && <Text style={styles.borderText}>{thing.note}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    borderText: {
        borderRadius: 6,
        padding: 8,
        margin: 4,
        borderColor: yellowPrimaryDarker,
        borderWidth: 1,
    },
})