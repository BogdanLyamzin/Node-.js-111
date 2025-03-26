import MovieCollection from "../db/models/Movie.js";

export const getMovies = ()=> MovieCollection.find();

export const getMovieById = id => MovieCollection.findOne({_id: id});