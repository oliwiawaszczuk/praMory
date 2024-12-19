import {ScrollView, View} from "react-native";
import React from "react";

export default function HorizontalLine({color, lineHeight}: {color: string, lineHeight: number}) {
    return <View style={{height: lineHeight, width: "100%", backgroundColor: color}}>1</View>
}