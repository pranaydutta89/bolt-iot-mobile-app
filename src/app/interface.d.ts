import { Products } from "./enums";
import { Analog, Digital, Utility } from "bolt-iot-wrapper";

export interface IDevice {
    key: Products;
    instance: {
        Analog: Analog,
        Digital: Digital,
        Utility: Utility
    }
}