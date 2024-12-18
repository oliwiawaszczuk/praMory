import { View } from "react-native"
import React, { useEffect, useState } from "react"
import { useRoute } from "@react-navigation/native"
import { Text } from "../components/Text/Default"
import { Palace } from "../types/Palace"
import { Loading } from "../components/Loading"
import { storage } from "../store/storage"

export default function PalaceDetail({ navigation }: {navigation: any}) {
    const route = useRoute()
    const { id } = route.params as { id: number }

    const [palace, setPalace] = useState<Palace | null>(null)
    const palaces = storage((state) => state.palaces)

    useEffect(() => {
        const foundPalace = palaces.find((item) => item.id === id)
        setPalace(foundPalace || null)
    }, [id, palaces])

    useEffect(() => {
        if (palace)
            navigation.setOptions({ title: `Palace: ${palace.title}` })
    }, [palace, navigation])

    if (!palace) return <Loading />

    return (
        <View>
            <Text>Palace ID: {id}</Text>
            <Text>Palace Title: {palace.title}</Text>
        </View>
    )
}
