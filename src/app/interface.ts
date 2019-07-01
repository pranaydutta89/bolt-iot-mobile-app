import { Products, Boards, PinType } from './enums';
import { Analog, Digital, Utility, Enums } from 'bolt-iot-wrapper';
import { PINS, STATE } from 'bolt-iot-wrapper/dist/Enums';


export interface IDevice {
    productName: string;
    instance: IDeviceInstance;
}

export interface IDeviceInstance {
    Analog: Analog;
    Digital: Digital;
    Utility: Utility;
}

export interface IPinState {
    name: string;
    pin: PINS;
    state: boolean;
}

export interface IBoard {
    id: string;
    name: string;
    boltProductName: string;
    apiKey: string;
    pins: Array<IPin>;
    description: string;
    isOnline?: boolean;
}

export interface IPin {
    name: string;
    number: PINS;
    type: PinType;
    value: STATE | number;

}
