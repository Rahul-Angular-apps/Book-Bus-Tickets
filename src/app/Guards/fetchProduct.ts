import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { ProductById } from "../Models/commonModels";
import { inject } from "@angular/core";
import { CommonService } from "../services/common.service";

export const fetchProduct: ResolveFn<ProductById> = (
    route: ActivatedRouteSnapshot,
) => {
    const service = inject(CommonService);
    const id = route.paramMap.get('id');
    return service.getProductsById(id as string)
}