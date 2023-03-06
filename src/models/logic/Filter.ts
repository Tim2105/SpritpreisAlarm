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
            if (open!= false && station.isOpen != false) {
                filteredStations.push(station);
            } else if (diesel != false && station.dieselPrice != -1) {
                filteredStations.push(station);
            }  else if (e5 != false && station.e5Price != -1) {
                filteredStations.push(station);
            } else if (e10 != false && station.e10Price != -1) {
                filteredStations.push(station);
            }
            console.log(station + " immer noch drin");
               
        }

        console.log( " ist drin");

        this.array =  stations;
    }

    public static getFilteredStations() : Station[] {
        return this.array;
    }



}







