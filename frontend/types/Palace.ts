import {Room} from "./Room";
import {ImagePalacePin} from "./ImagePin";

export type Palace = {
    id: number
    title: string
    path_to_image: string | null
    pins: ImagePalacePin[] | null
    rooms: Room[] | null
}
