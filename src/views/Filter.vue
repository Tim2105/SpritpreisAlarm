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
  public _filter: string[] = [];
  private _isOpen: boolean = true;
  private _isDiesel: boolean = true;
  private _isE10: boolean = true;
  private _isE5: boolean = true;

  public filter(): void {
    this._isOpen = this._filter.includes('Open');
    this._isDiesel = this._filter.includes('Diesel');
    this._isE10 = this._filter.includes('E10');
    this._isE5 = this._filter.includes('E5');
  }

  public getFilters(): {
    isOpen: boolean;
    isDiesel: boolean;
    isE10: boolean;
    isE5: boolean;
  } {
    return {
      isOpen: this._isOpen,
      isDiesel: this._isDiesel,
      isE10: this._isE10,
      isE5: this._isE5,
    };
  }
}


</script>


