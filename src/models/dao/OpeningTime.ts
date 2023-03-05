/**
 * Die Klasse OpeningTime repräsentiert eine Öffnungszeit eines Standorts.
 * Eine Öffnungszeit besteht aus einem/mehreren Wochentag(en) und der dazu gehörigen Öffnungs- und Schließzeit.
 * Abkürzungen für Wochentage werden automatisch in den vollständigen Namen umgewandelt.
 * 
 * @author Tim
 */
export default class OpeningTime {
    // eslint-disable-next-line
    private static dayAbbreviations : any = {
        "Mo": "Montag",
        "Di": "Dienstag",
        "Mi": "Mittwoch",
        "Do": "Donnerstag",
        "Fr": "Freitag",
        "Sa": "Samstag",
        "So": "Sonntag"
    };

    private _days: string;
    private _start: string;
    private _end: string;

    constructor(days: string, start: string, end: string) {
        // Tag formatieren
        // Alle Wochentagskürzel durch den vollständigen Namen ersetzen
        for(const key in OpeningTime.dayAbbreviations)
            if(!days.includes(OpeningTime.dayAbbreviations[key]))
                days = days.replaceAll(key, OpeningTime.dayAbbreviations[key]);
        
        this._days = days;

        // Uhrzeit formatieren
        // Uhrzeit auf 5 Zeichen kürzen (z.B. 08:00:00 -> 08:00)
        this._start = start.substring(0, 5);
        this._end = end.substring(0, 5);
    }

    public get days(): string {
        return this._days;
    }

    public get start(): string {
        return this._start;
    }

    public get end(): string {
        return this._end;
    }

    public toString(): string {
        return this._days + ": " + this._start + " - " + this._end;
    }
}