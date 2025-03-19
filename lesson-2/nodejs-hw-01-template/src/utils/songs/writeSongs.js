import fs from 'node:fs/promises';

import { SONG_DB_PATH } from '../../constants/songs.js';

export const writeSongs = (updateSongs) =>
  fs.writeFile(SONG_DB_PATH, JSON.stringify(updateSongs, null, 2));
