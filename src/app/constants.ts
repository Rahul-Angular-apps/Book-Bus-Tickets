// const realWorld = "https://api.realworld.build/api";
const dummyJson = "https://dummyjson.com"
const projectApi = "https://projectapi.gerasim.in/api/UserApp"

// function endPoint(path: string): string {
//   return `${environment.api}${path}`;
// }

export const ApiUrls = {
  register: `${projectApi}/CreateNewUser`,
  search: `${dummyJson}/products/search`,
  productById: `${dummyJson}/products`,
};
