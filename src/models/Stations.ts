import APIRequest from '@/models/logic/APIRequest';
import Station from '@/models/dao/Station';

/**
 * Eine Klasse, die alle Tankstellen in der Umgebung bereitstellt.
 * Wenn die Tankstellen bereits einmal geladen wurden, werden sie nicht erneut geladen.
 * 
 * @author Tim
 */
export default class Stations {

    private static _stations : Station[] = [];
    private static madeRequest : boolean = false;

    public static async getStations() : Promise<Station[]> {
        if(!this.madeRequest) {
            this.madeRequest = true;
            const apiRequest : APIRequest = await APIRequest.fromCurrentLocation();
            this._stations = await apiRequest.getStations();
        }
        
        return this._stations;
    }
}