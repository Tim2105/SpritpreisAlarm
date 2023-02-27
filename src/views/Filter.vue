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
                    <ion-select :value="_filter" multiple="true" interface="popover" placeholder="Filtern" @update="filter()">
                        <ion-select-option value="Open">Geöffnet</ion-select-option>
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

export default class FilterVue extends Vue {

    public _filter : string[] = [];

    public static async filter()
    {
        for(let i = 0; i <  filter.length ; i++)
        {
            if(_filter[i] == "Diesel")
            {
                //Diesel Filter
            }
            else if(_filter[i] == "E10")
            {
                //E10 Filter
            }
            else if(_filter[i] == "E5")
            {
                //E5 Filter
            }
        }
    }

    public get filter() : string[] {
        return this._filter;
    }

    public set filter(value : string[]) {
        this._filter = value;
    }

}


</script>


