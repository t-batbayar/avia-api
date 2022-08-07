export const editFilePath = (path: string) =>
    path.startsWith('public') ||
    path.startsWith('/public') ||
    path.startsWith('/public/')
        ? path.split('/').slice(1).join('/')
        : path;
