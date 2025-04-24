import { typeList } from "../../constants/movies.js";

const parseNumber = value => {
    if(typeof value !== "string") return;

    const parsedNumber = parseInt(value);
    if(Number.isNaN(parsedNumber)) return;

    return parsedNumber;
}

export const parseMovieFilterParams = ({minReleaseYear, maxReleaseYear, type})=> {
    const parsedMinReleaseYear = parseNumber(minReleaseYear);
    const parsedMaxReleaseYear = parseNumber(maxReleaseYear);

    const parsedType = typeList.includes(type) ? type : undefined;

    return {
        minReleaseYear: parsedMinReleaseYear,
        maxReleaseYear: parsedMaxReleaseYear,
        type: parsedType,
    };
};