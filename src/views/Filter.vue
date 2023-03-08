<template>
        <ion-item>
            <ion-label>Filter</ion-label>
            <!-- Hier wird die Auswahl der Spritart gemacht  mehrfache Auswahl möglich-->
            <ion-select multiple="true" interface="popover" placeholder="Filtern" @ionChange ="filter()">
                <ion-select-option value="Open">Geöffnet</ion-select-option>
                <ion-select-option value="Diesel">Diesel</ion-select-option>
                <ion-select-option value="E10">E10</ion-select-option>
                <ion-select-option value="E5">E5</ion-select-option>
            </ion-select>
        </ion-item>

</template>

<script lang="ts">

import Filter_ts from '@/models/logic/Filter';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
import { Options, Vue } from 'vue-class-component';


@Options({
    components : {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonItem,
        IonLabel,
        IonSelect,
        IonSelectOption
    } ,emits: ['update']
})

export default class FilterVue extends Vue {
 
  public _filter: any = [];
  private _isOpen: boolean = true;
  private _isDiesel: boolean = true;
  private _isE10: boolean = true;
  private _isE5: boolean = true;


  public filter(): void {

    //Prüfen ob die Checkboxen angeklickt sind und die Variable entsprechend setzen
    console.log(this._filter);

    console.log("01 "+ this._isOpen + this._isDiesel + this._isE10 + this._isE5);
    Filter_ts.filterStations(this._isDiesel, this._isE5, this._isE10 ,true);
    console.log("02");
    this.$emit ('update');
  }

 
}


</script>


