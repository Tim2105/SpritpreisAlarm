/**
 * @file Filter.ts 
 * die Klasse Filter ist für die Filterung der Tankstellen zuständig 
 * die Filterkreterien werden von Filter.vue übergeben
 * anschließend werden die Tankstellen von Map.vue benutzt
 */

import Station from '@/models/dao/Station';
import Stations from '@/models/Stations';

export default class Filter_ts {

    private static array: Station[] = [];

    public static async filterStations( diesel : boolean, e5 : boolean, e10 : boolean, open : boolean) : Promise<void> 
    {

        const filteredStations: Station[] = [];
        const stations: Station[] = await Stations.getStations();

        for (const station of stations) 
        {

            // prüft die Filterkriterien und fügt die Tankstellen in das Array filteredStations ein
            if (open && !station.isOpen ) {
                continue;
            } else if (diesel == true && station.dieselPrice == -1) {
                continue;
            }  else if (e5 == true && station.e5Price == -1) {
                continue;
            } else if (e10 == true && station.e10Price == -1) {
                continue;
            }   

            filteredStations.push(station);          
        }

        this.array =  filteredStations;
    }

    public static getFilteredStations() : Station[] {
        return this.array;
    }
}
