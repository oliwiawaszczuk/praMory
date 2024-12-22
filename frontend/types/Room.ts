import {Thing} from "./Thing";
import {ImagePalacePin, ImageRoomPin} from "./ImagePin";

export type Room = {
    id: number
    palace_id: number
    name: string
    snip: string | null
    path_to_image: string | null
    note: string | null
    things: Thing[] | null
    pins: ImageRoomPin[]
}