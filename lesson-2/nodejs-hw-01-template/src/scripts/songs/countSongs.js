import { readSongs } from "../../utils/songs/readSongs.js";

const countSongs = async()=> {
    const songs = await readSongs();
    return songs.length;
}

console.log(await countSongs());