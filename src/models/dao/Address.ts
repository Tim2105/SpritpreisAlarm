/**
 * Die Klasse Address kapselt eine Adresse.
 * Die Klasse ist unveränderlich und stellt eine Methode zur Umwandlung in einen leserlichen String zur Verfügung.
 * 
 * @author Tim
 */
export default class Address {

    private _street: string;
    private _houseNumber: number;
    private _city: string;
    private _postalCode: string;

    constructor(street: string, houseNumber: number, city: string, postalCode: string) {
        this._street = street;
        this._houseNumber = houseNumber;
        this._city = city;
        this._postalCode = postalCode;
    }

    get street(): string {
        return this._street;
    }

    get houseNumber(): number {
        return this._houseNumber;
    }

    get city(): string {
        return this._city;
    }

    get postalCode(): string {
        return this._postalCode;
    }

    public toString(): string {
        return this._street + " " + this._houseNumber + ", " + this._postalCode + " " + this._city;
    }
}