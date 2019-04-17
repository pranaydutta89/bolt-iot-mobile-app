import { Products, Boards, PinType, LoopAction } from "./enums";
import { Analog, Digital, Utility, Enums } from "bolt-iot-wrapper";
import { InterpolationConfig } from "@angular/compiler";
import { PINS, STATE } from "bolt-iot-wrapper/dist/Enums";
import { IDigitalParam } from "bolt-iot-wrapper/dist/Interfaces";

export interface IDevice {
    productName: string,
    instance: IDeviceInstance
}

export interface IDeviceInstance {
    Analog: Analog,
    Digital: Digital,
    Utility: Utility
}

export interface IPinState {
    name: string;
    pin: PINS,
    state: boolean
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
    loopEnabled: boolean,
    triggerOn: STATE
    storeData: IStoreData[],
    loopAction: LoopAction
}


export interface IStoreData {
    timeStamp: number,
    state: STATE
}