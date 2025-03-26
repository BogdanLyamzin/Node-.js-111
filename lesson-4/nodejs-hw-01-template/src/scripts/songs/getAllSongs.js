import { readSongs } from "../../utils/songs/readSongs.js";

const getAllSongs = ()=> readSongs();

console.log(await getAllSongs());