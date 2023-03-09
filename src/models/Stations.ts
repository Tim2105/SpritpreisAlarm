import APIRequest from '@/models/logic/APIRequest';
import Station from '@/models/dao/Station';
import Coordinate from '@/models/dao/Coordinate';


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
            // Fachhochschule Südwestfalen - Standort Iserlohn
            let apiRequest : APIRequest = new APIRequest(new Coordinate(51.36882628398427, 7.687692660214414));

            await APIRequest.fromCurrentLocation()
                .then((request) => apiRequest = request)
                .catch(() => {console.log('Standort konnte nicht ermittelt werden')});
                
            this._stations = await apiRequest.getStations();
            this.madeRequest = true;

            await this.loadFavoriteStations();
        }
        
        return this._stations;
    }

    public static async getStationsSortedByPrice(fuelType: string) : Promise<Station[]> {
        const stations : Station[] = await this.getStations();
        
        // Sortiere nach dem Preis des gewählten Treibstoffs
        stations.sort((a, b) => {
            let aPrice : number = 0;
            let bPrice : number = 0;

            switch(fuelType) {
                case 'diesel':
                    aPrice = a.dieselPrice;
                    bPrice = b.dieselPrice;
                    break;
                case 'e5':
                    aPrice = a.e5Price;
                    bPrice = b.e5Price;
                    break;
                case 'e10':
                    aPrice = a.e10Price;
                    bPrice = b.e10Price;
                    break;
            }

            if(aPrice === -1)
                return 1;
            else if(bPrice === -1)
                return -1;
            else
                return aPrice - bPrice;
        });

        return stations;
    }

    public static async getStationsSortedByDistance() : Promise<Station[]> {
        const stations : Station[] = await this.getStations();

        // Sortiere nach der Entfernung
        stations.sort((a, b) => {
            return a.coordinate.distance - b.coordinate.distance;
        });

        return stations;
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