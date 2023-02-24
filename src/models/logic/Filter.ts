/**
 * @file Filter.ts 
 * die Klasse Filter ist für die Filterung der Tankstellen zuständig 
 * die Filterkreterien werden von Filter.vue übergeben
 * anschließend werden die Tankstellen von Map.vue benutzt
 */

import Station from '@/models/dao/Station';
import Filter from '@/views/Filter.vue';

export default class Filter_ts {

    private _station: Station;
    private _open: boolean;
    private _diesel: boolean;
    private _e5: boolean;
    private _e10: boolean;


    constructor(station: Station, filter : Filter) {
        this._station = station;
        this._open = open;
        this._diesel = diesel;
        this._e5 = e5;
        this._e10 = e10;

    }

    public filterStations(stations: Station[]): Station[] {
        const filteredStations: Station[] = [];
        for (const station of stations) {
            if (this._open && station.isOpen) {
                filteredStations.push(station);
            } else if (this._diesel && station.dieselPrice != -1) {
                filteredStations.push(station);
            }  else if (this._e5 && station.e5Price != -1) {
                filteredStations.push(station);
            } else if (this._e10 && station.e10Price != -1) {
                filteredStations.push(station);
            }
        }
        return filteredStations;
    }


}







