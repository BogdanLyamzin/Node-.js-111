import { createFakeSong } from "../../utils/songs/createFakeSong.js";
import { readSongs } from "../../utils/songs/readSongs.js";
import { writeSongs } from "../../utils/songs/writeSongs.js";

const addOneSong = async ()=> {
    const songList = await readSongs();
    const newSong = createFakeSong();
    writeSongs([...songList, newSong]);
};

addOneSong();