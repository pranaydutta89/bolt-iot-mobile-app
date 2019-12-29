import { IPin } from './interface';
import { PINS } from 'bolt-iot-wrapper/dist/Enums';
import { PinType } from '../enums';

interface ICommon {
  id: string;
  createdAt: Date;
  updateAt: Date;
}

export interface IHome extends ICommon {
  name: string;
}

export interface IRoom extends ICommon {
  name: string;
}

export interface IBolt extends ICommon {
  productName: string;
  apiKey: string;
}

export interface IAppliance extends ICommon {
  name: string;
  currentState: string;
  triggerState: string;
  pin: PINS;
  pintType: PinType;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}
