export type Thing = {
    id: number
    room_id: number
    name: string
    snip: string | null
    note: string | null
    path_to_images: { path: string; order: number }[] | null
}