import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    constructor(private localNotifications: LocalNotifications) {
    }

    show(message) {
        this.localNotifications.schedule({
            id: 1,
            text: message,
        });
    }
}
