import Coordinate from '@/models/dao/Coordinate';
import Station from '@/models/dao/Station';
import Address from '@/models/dao/Address';

/**
 * Die Klasse APIRequest stellt eine Schnittstelle zur Tankerkönig API dar.
 * Die Klasse ist unveränderlich.
 * Die statische Methode fromCurrentLocation() erzeugt eine Instanz der Klasse APIRequest mit den aktuellen Koordinaten des Nutzers.
 * 
 * @author Tim
 */
export default class APIRequest {

    private static url = "https://creativecommons.tankerkoenig.de/json/list.php";
    private static apiKey = "7df3754b-b278-4dd8-ea9d-f078979e8cee";

    private _coordinate: Coordinate;
    private _radius: number;

    constructor(coordinate: Coordinate, radius: number = 5) {
        this._coordinate = coordinate;
        this._radius = radius;
    }

    /**
     * Erzeugt eine Instanz der Klasse APIRequest mit den aktuellen Koordinaten des Nutzers.
     * Wenn die Koordinaten nicht ermittelt werden können, schlägt das Promise-Objekt fehl.
     * 
     * @param radius Der Radius in Kilometern, in dem die Tankstellen gesucht werden sollen.
     * @returns Ein Promise-Objekt, das eine Instanz der Klasse APIRequest enthält.
     */
    public static fromCurrentLocation(radius: number = 5): Promise<APIRequest> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(new APIRequest(new Coordinate(position.coords.latitude, position.coords.longitude), radius));
            }, (error) => {
                reject(error);
            });
        });
    }

    private buildUrl(): string {
        return APIRequest.url +
                "?lat=" + this._coordinate.latitude +
                "&lng=" + this._coordinate.longitude +
                "&rad=" + this._radius +
                "&sort=dist&type=all" +
                "&apikey=" + APIRequest.apiKey;
    }

    /**
     * Liefert eine Liste aller Tankstellen, die sich innerhalb des Radius befinden.
     * Wenn die API-Abfrage fehlschlägt, schlägt das Promise-Objekt fehl.
     * 
     * @returns Ein Promise-Objekt, das eine Liste aller Tankstellen im Radius enthält.
     */
    public async getStations(): Promise<Station[]> {
        const stations: Station[] = [];
        const response = await fetch(this.buildUrl());
        const json = await response.json();

        if(json.ok == false)
            throw new Error("API Request failed: " + json.status);

        for (const station of json.stations) {
            stations.push(new Station(
                station.id,
                station.name,
                station.brand,
                new Address(
                    station.street,
                    station.houseNumber,
                    station.place,
                    station.postCode
                ),
                new Coordinate(
                    station.lat,
                    station.lng,
                    station.dist
                ),
                station.isOpen,
                station.diesel,
                station.e5,
                station.e10
            ));
        }

        return stations;
    }

    get coordinate(): Coordinate {
        return this._coordinate;
    }

    get radius(): number {
        return this._radius;
    }
}