export const systemConfig = {
  baseUrl: import.meta.env.VITE_API_URL as string,
  headerBar: {
    height: 65,
  },
  drawer: {
    widthOpen: 270,
    widthClose: 70,
  },
  paginationDefault: {
    skip: 0,
    limit: 20
  }
};
