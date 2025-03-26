import { createFakeSong } from "../../utils/songs/createFakeSong.js";
import { readSongs } from "../../utils/songs/readSongs.js";
import { writeSongs } from "../../utils/songs/writeSongs.js";

export const generateSongs = async(number)=> {
    const songList = await readSongs();
    const newSongs = Array(number).fill(0).map(createFakeSong);
    await writeSongs([...songList, ...newSongs]);
};

generateSongs(5);