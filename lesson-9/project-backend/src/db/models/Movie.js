import { Schema, model } from 'mongoose';

import { typeList, minReleaseYear } from '../../constants/movies.js';

import { handleSaveError, setUpdateSettings } from './hooks.js';

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Назва фільма обов'язкова"],
    },
    director: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
      required: true,
    },
    type: {
      type: String,
      enum: typeList,
      default: typeList[0],
      required: true,
    },
    releaseYear: {
      type: Number,
      min: minReleaseYear,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

movieSchema.post('save', handleSaveError);

movieSchema.pre('findOneAndUpdate', setUpdateSettings);

movieSchema.post('findOneAndUpdate', handleSaveError);

export const movieSortFields = [
  'title',
  'director',
  'favorite',
  'type',
  'releaseYear',
];

const MovieCollection = model('movie', movieSchema);

export default MovieCollection;
