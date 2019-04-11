import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Products, StorageData } from '../enums';
import { StorageService } from '../services/storage.service';
import { Enums } from 'bolt-iot-wrapper';
@Component(
    {
        selector: 'digital-list',
        templateUrl: 'digital.page.html'
    }
)
export class DigitalListComponent {
    public deviceName = '';
    public state = Enums.STATE;
    constructor(private route: ActivatedRoute, private storage: StorageService) {
    }

}