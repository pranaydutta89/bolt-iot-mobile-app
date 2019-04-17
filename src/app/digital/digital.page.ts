import { IBoards, IPin, IStoreData } from './../interface.d';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Products, StorageData } from '../enums';
import { StorageService } from '../services/storage.service';
import { Enums } from 'bolt-iot-wrapper';
import { PINS } from 'bolt-iot-wrapper/dist/Enums';
@Component(
    {
        selector: 'digital-list',
        templateUrl: 'digital.page.html'
    }
)
export class DigitalListComponent {
    public storeData: IStoreData[];
    public boardId: string = this.route.snapshot.paramMap.get('boardId');
    public pin: PINS = parseInt(this.route.snapshot.paramMap.get('pinId'), 10);
    public board: IBoards;
    public state = Enums.STATE;
    constructor(private route: ActivatedRoute, private storage: StorageService) {
        this.init();
    }

    async init() {
        this.board = this.storage.getData<IBoards[]>(StorageData.boards).
            find(r => r.id === this.boardId);
        this.storeData = this.board.pins[this.pin].storeData;
    }

}