import {Text, View} from "react-native";
import {yellowPrimaryDarker} from "../const/Colors";

export function Loading() {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 24, color: yellowPrimaryDarker, fontWeight: 800}}>Loading...</Text>
        </View>
    )
}
