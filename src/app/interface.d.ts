import { Products } from "./enums";
import { Analog, Digital, Utility, Enums } from "bolt-iot-wrapper";
import { InterpolationConfig } from "@angular/compiler";

export interface IDevice {
    key: Products;
    instance: {
        Analog: Analog,
        Digital: Digital,
        Utility: Utility
    }
}

export interface IProductStatus {
    [product: number]: boolean
}

export interface IProductData {
    [product: number]: [{
        timestamp: number,
        state: Enums.STATE
    }]
}