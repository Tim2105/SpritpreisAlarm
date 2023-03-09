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
            if (!open && station.isOpen ) {
                continue;
            } else if (diesel && station.dieselPrice == -1) {
                continue;
            }  else if (e5 && station.e5Price == -1) {
                continue;
            } else if (e10 && station.e10Price == -1) {
                continue;
            }   

            filteredStations.push(station);          
        }

        this.array =  filteredStations;

        // sortiert das Array nach dem Preis @author Nils Bachmann
        this.array.sort((a,b ) => {
            let aPrice = 0;
            let bPrice = 0;

            if(!diesel && !e5 && !e10) {
                aPrice = a.dieselPrice + a.e5Price + a.e10Price;
                bPrice = b.dieselPrice + b.e5Price + b.e10Price;

            } else{
                if (diesel) {
                    aPrice += a.dieselPrice;
                    bPrice += b.dieselPrice;
                }
                if (e5) {
                    aPrice += a.e5Price;
                    bPrice += b.e5Price;
                }
                if (e10) {
                    aPrice += a.e10Price;
                    bPrice += b.e10Price;
                }
        }
            return aPrice - bPrice;
        });
        console.log(this.array);
    }

    public static getFilteredStations() : Station[] {
        return this.array;
    }
}
