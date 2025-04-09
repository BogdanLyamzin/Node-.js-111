export const calcPaginationData = ({page, perPage, totalItems})=> {
    const totalPages = Math.ceil(totalItems / perPage);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    return {
        totalPages,
        hasPrevPage,
        hasNextPage,
    };
};