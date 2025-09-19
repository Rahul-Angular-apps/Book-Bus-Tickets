const realWorld = "https://api.realworld.build/api";
const dummyJson = "https://dummyjson.com"

// function endPoint(path: string): string {
//   return `${environment.api}${path}`;
// }

export const ApiUrls = {
  register: `${realWorld}/users`,
  search: `${dummyJson}/products/search`,
  productById: `${dummyJson}/products`,
};
