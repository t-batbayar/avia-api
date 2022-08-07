export const createNotFoundMessage = (
    resourceName: string,
    id: number | string,
) => `${resourceName} with the id: ${id} is not found`;
