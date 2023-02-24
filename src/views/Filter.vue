<template>
    <!-- Einen filter der eine auswahl von Sprit zulässt über eine -->
        <ion-header>
            <ion-toolbar>
                <ion-title>Filter</ion-title>
            </ion-toolbar>
        </ion-header>
            <ion-content>
                <ion-item>
                    <ion-label>Filter</ion-label> 
                    <!-- Hier wird die Auswahl der Spritart gemacht  mehrfache Auswahl möglich-->
                    <ion-select :value="_filter" multiple="true" interface="popover" placeholder="Mehrere Spritarten auswählen">
                        <ion-select-option value="Diesel">Diesel</ion-select-option>
                        <ion-select-option value="E10">E10</ion-select-option>
                        <ion-select-option value="E5">E5</ion-select-option>
                    </ion-select>

                </ion-item>
            </ion-content>
</template>

<script lang="ts">

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
import { Options, Vue } from 'vue-class-component';
import APIRequest from '@/models/logic/APIRequest';
import Station from '@/models/dao/Station';




@Options({
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonItem,
        IonLabel,
        IonSelect,
        IonSelectOption
    }
})

/**
 * Prüfen was im Filter ausgewählt wurde
 * 
 */
export default class Filter extends Vue {

    public  _filter : string = "";

    private _stations : Array<Station> = [];
    
    public setStations (stations : Station[]) : void {
        this._stations = stations;
    }

    /**
     * Filtern der Tankstellen
     */
    public filterStations (stations : Station[]) : Station[] {     
        
        let filteredStations : Station[] = [];

        for (let station of stations) 
        {
            if (station.dieselPrice != -1 && this._filter.includes("Diesel")) {
                filteredStations.push(station);
            }
            else if (station.e5Price -1  && this._filter.includes("E5")) {
                filteredStations.push(station);
            }
            else if (station.e10Price -1  && this._filter.includes("E10")) {
                filteredStations.push(station);
            }
            else if (this ._filter == "") {
                filteredStations.push(station);
            }
        }

        return filteredStations;

    }

}

</script>


