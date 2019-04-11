import { Products, Boards, PinType } from "./enums";
import { Analog, Digital, Utility, Enums } from "bolt-iot-wrapper";
import { InterpolationConfig } from "@angular/compiler";
import { PINS } from "bolt-iot-wrapper/dist/Enums";

export interface IDevice {
    productName: string,
    instance: IDeviceInstance
}

export interface IDeviceInstance {
    Analog: Analog,
    Digital: Digital,
    Utility: Utility
}

export interface IBoards {
    id: string
    name: string,
    boltProductName: string,
    apiKey: string,
    pins: Array<IPin>
}

export interface IPin {
    name: string,
    number: PINS,
    type: PinType,
    loopEnabled: boolean
}