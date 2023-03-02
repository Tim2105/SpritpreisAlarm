import OpeningTime from "@/models/dao/OpeningTime";

/**
 * Die Klasse OpeningTimes repräsentiert die Öffnungszeiten eines Standorts.
 * Öffnungszeiten werden als Array von OpeningTime-Objekten gespeichert.
 * 
 * @author Tim
 */
export default class OpeningTimes {
    private _openingTimes: Array<OpeningTime>;
    private _overrides: Array<string>;

    constructor(openingTimes: Array<OpeningTime>, overrides: Array<string>) {
        this._openingTimes = openingTimes;
        this._overrides = overrides;
    }

    public get openingTimes(): Array<OpeningTime> {
        return this._openingTimes;
    }

    public get overrides(): Array<string> {
        return this._overrides;
    }
}