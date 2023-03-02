import OpeningTime from '../dao/OpeningTime';
import OpeningTimes from '@/models/dao/OpeningTimes';

export default class OpeningTimesAPIRequest {
    
    private static url = "https://creativecommons.tankerkoenig.de/json/detail.php";
    private static apiKey = "7df3754b-b278-4dd8-ea9d-f078979e8cee";

    private _id: string;

    constructor(id: string) {
        this._id = id;
    }

    private buildUrl(): string {
        return OpeningTimesAPIRequest.url +
                "?id=" + this._id +
                "&apikey=" + OpeningTimesAPIRequest.apiKey;
    }

    public async getOpeningTimes(): Promise<OpeningTimes> {
        const response = await fetch(this.buildUrl());
        const json = await response.json();

        if(json.ok == false)
            throw new Error("API Request failed: " + json.status);

        const openingTimes: Array<OpeningTime> = [];
        const overrides: Array<string> = [];

        for (const rule of json.station.openingTimes) {
            openingTimes.push(new OpeningTime(rule.text, rule.start, rule.end));
        }

        for (const override of json.station.overrides) {
            overrides.push(override);
        }

        console.log(openingTimes);
        console.log(overrides);

        return new OpeningTimes(openingTimes, overrides);
    }
}