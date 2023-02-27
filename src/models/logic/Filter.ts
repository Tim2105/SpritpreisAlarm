/**
 * @file Filter.ts 
 * die Klasse Filter ist für die Filterung der Tankstellen zuständig 
 * die Filterkreterien werden von Filter.vue übergeben
 * anschließend werden die Tankstellen von Map.vue benutzt
 */

import Station from '@/models/dao/Station';
import FilterVue from '@/views/Filter.vue';
import Stations from '@/models/Stations';

export default class Filter_ts {

    public static async filterStations(open: boolean, diesel: boolean, e5: boolean, e10: boolean)
    {

        const filteredStations: Station[] = [];
        const stations: Station[] = await Stations.getStations();

        for (let station of stations) 
        {

            if (open && station.isOpen) {
                continue;
            } else if (diesel && station.dieselPrice != -1) {
                filteredStations.push(station);
            }  else if (e5 && station.e5Price != -1) {
                filteredStations.push(station);
            } else if (e10 && station.e10Price != -1) {
                filteredStations.push(station);
            }
        }
        return filteredStations;
    }


}







