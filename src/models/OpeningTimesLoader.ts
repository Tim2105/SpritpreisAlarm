import OpeningTimesAPIRequest from "@/models/logic/OpeningTimesAPIRequest";
import OpeningTimes from "@/models/dao/OpeningTimes";
import Station from "@/models/dao/Station";

/**
 * Eine Klasse, die Öffnungszeiten für alle Tankstellen bereitstellt.
 * Wenn die Öffnungszeiten einer Tankstelle bereits einmal geladen wurden, werden sie nicht erneut geladen.
 * 
 * @author Tim
 */
export default class OpeningTimesLoader {
    private static openingTimes: Map<string, OpeningTimes> = new Map<string, OpeningTimes>();

    public static async getOpeningTimes(station: Station): Promise<OpeningTimes> {
        if (!this.openingTimes.has(station.id)) {
            const apiRequest: OpeningTimesAPIRequest = new OpeningTimesAPIRequest(station.id);
            this.openingTimes.set(station.id, await apiRequest.getOpeningTimes());
        }

        const result = this.openingTimes.get(station.id);

        if (result === undefined) {
            throw new Error("Ein unerwarteter Fehler ist aufgetreten: Die Öffnungszeiten konnten nicht geladen werden.");
        }

        return result;
    }
}