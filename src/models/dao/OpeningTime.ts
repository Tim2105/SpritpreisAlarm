export default class OpeningTime {
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
        // Tag formattieren
        this._days = "";
        for (const day of days.split(/(,|-)/)) {
            day.replace(/[\u0250-\ue007]/g, '')

            if (day.length == 2)
                this._days += OpeningTime.dayAbbreviations[day] + ", ";
            else
                this._days += day + ", ";
        }
        this._days = this._days.substring(0, this._days.length - 2);

        // Uhrzeit formattieren
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