<template>
        <ion-item>
            <ion-label>Filter</ion-label>
            <!-- Hier wird die Auswahl der Spritart gemacht  mehrfache Auswahl möglich-->
            <ion-select v-model="filterPredicate" multiple="true" interface="popover" placeholder="Filtern" @ionChange ="filter()">
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
 
  public _filterPredicate: any = [];
  private _isOpen: boolean = true;
  private _isDiesel: boolean = true;
  private _isE10: boolean = true;
  private _isE5: boolean = true;


  public async filter(): Promise<void> {
    //Prüfen ob die Checkboxen angeklickt sind und die Variable entsprechend setzen
    await Filter_ts.filterStations(this._isDiesel, this._isE5, this._isE10 ,this._isOpen);
    this.$emit ('update');
  }

  public get filterPredicate(): any {
    return this._filterPredicate;
  }

  public set filterPredicate(value: any) {
    this._filterPredicate = value;
    this._isOpen = this._filterPredicate.includes('Open');
    this._isDiesel = this._filterPredicate.includes('Diesel');
    this._isE10 = this._filterPredicate.includes('E10');
    this._isE5 = this._filterPredicate.includes('E5');
  }
}


</script>


