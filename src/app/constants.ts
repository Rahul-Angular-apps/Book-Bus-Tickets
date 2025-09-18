import { environment } from './environments/environment';

function realWorld(path: string): string {
  return `${environment.api}${path}`;
}

export const ApiUrls = {
  register: realWorld('/users'),
  search: `${environment.products}/search`,
  productById: environment.products,
};
