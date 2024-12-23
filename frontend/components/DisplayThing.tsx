import React from "react";
import {View} from "react-native";
import {Thing} from "../types/Thing";
import {Text} from "./Text/Default";

interface DisplayThingProps {
    thing: Thing
}

export default function DisplayThing({thing}: DisplayThingProps) {
    return (
        <View>
            <Text>{thing.room_id}</Text>
        </View>
    )
}