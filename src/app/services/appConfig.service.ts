import { Injectable } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    constructor(private backgroundMode: BackgroundMode) {
    }

    public async initialize() {
        this.backgroundMode.enable();
    }
}
