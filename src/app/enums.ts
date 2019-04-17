import { Digital } from 'bolt-iot-wrapper';
export enum Products {
    motionSensor
}


export enum StorageData {
    boards
}

export enum Boards {
    hall,
}

export enum LoopAction {
    store,
    notification,
    storeAndNotification
}

export enum PinType {
    digital,
    analog
}
