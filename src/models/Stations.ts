import APIRequest from '@/models/logic/APIRequest';
import Station from '@/models/dao/Station';

/**
 * Eine Klasse, die alle Tankstellen in der Umgebung bereitstellt.
 * Wenn die Tankstellen bereits einmal geladen wurden, werden sie nicht erneut geladen.
 * Außerdem werden die Favoriten-Tankstellen gespeichert und geladen.
 * 
 * @author Tim
 */
export default class Stations {

    private static _stations : Station[] = [];
    private static madeRequest : boolean = false;

    private static _favoriteStationsId : string[] = [];

    public static async getStations() : Promise<Station[]> {
        if(!this.madeRequest) {
            this.madeRequest = true;
            const apiRequest : APIRequest = await APIRequest.fromCurrentLocation();
            this._stations = await apiRequest.getStations();
        }
        
        return this._stations;
    }

    public static addFavoriteStation(station : Station) : void {
        if(!station.isFavorite) {
            station.isFavorite = true;
            this._favoriteStationsId.push(station.id);

            this.saveFavoriteStations();
        }
    }

    public static removeFavoriteStation(station : Station) : void {
        if(station.isFavorite) {
            station.isFavorite = false;
            this._favoriteStationsId = this._favoriteStationsId.filter((id) => id !== station.id);

            this.saveFavoriteStations();
        }
    }

    public static getFavoriteStations() : Station[] {
        return this._stations.filter((station) => station.isFavorite);
    }

    public static saveFavoriteStations() : void {
        localStorage.setItem('favoriteStations', JSON.stringify(this._favoriteStationsId));
    }

    public static async loadFavoriteStations() : Promise<void> {
        // Die Methode funktioniert nur, wenn die Tankstellen bereits geladen wurden(In der LocalStorage werden nur die IDs gespeichert).
        // Deshalb werden die Tankstellen geladen, wenn das noch nicht passiert ist.
        if(!this.madeRequest)
            await this.getStations();

        const localStorageEntry : string | null = localStorage.getItem('favoriteStations');

        this._favoriteStationsId = localStorageEntry ? JSON.parse(localStorageEntry) : [];

        this._stations.forEach((station) => {
            station.isFavorite = this._favoriteStationsId.includes(station.id);
        });
    }
}