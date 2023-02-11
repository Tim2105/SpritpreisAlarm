/**
 * Die Klasse Coordinate kapselt eine Koordinate.
 * Die Klasse ist unveränderlich und stellt eine Methode zur Umwandlung in einen leserlichen String zur Verfügung.
 * 
 * @author Tim
 */
export default class Coordinate {

    private _latitude: number;
    private _longitude: number;

    private _distance: number;

    constructor(latitude: number, longitude: number, distance: number = 0) {
        this._latitude = latitude;
        this._longitude = longitude;
        this._distance = distance;
    }

    get latitude(): number {
        return this._latitude;
    }

    get longitude(): number {
        return this._longitude;
    }

    get distance(): number {
        return this._distance;
    }

    public toString(): string {
        return this._latitude + ", " + this._longitude;
    }
}