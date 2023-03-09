<!--
    Die Komponente Details zeigt Details zu jeder Tankstelle an.
    Die Details umfassen:
    - Name der Tankstelle
    - Adresse der Tankstelle
    - Öffnungszeiten der Tankstelle(auf seperater Seite)
    - Preise für die verschiedenen Kraftstoffe

    Die Tankstellen werden aus der zentralen Verwaltungsklasse Stations geladen.

    @author: Tim
-->
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Tankstellendetails</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label>
                        <h1>Sortiere nach</h1>
                        <p>
                            <ion-select v-model="sortPredicate" placeholder="Sortierkriterium" interface="popover" @ionChange="sort()">
                                <ion-select-option value="distance">Entfernung</ion-select-option>
                                <ion-select-option value="dieselPrice">Dieselpreis</ion-select-option>
                                <ion-select-option value="e5Price">E5 Preis</ion-select-option>
                                <ion-select-option value="e10Price">E10 Preis</ion-select-option>
                            </ion-select>
                        </p>
                    </ion-label>
                </ion-item>
                <ion-item v-for="station in stations" :key="station.id">
                    <ion-label>
                        <h1>{{ station.name }}</h1>
                        <p>
                        <span v-if="station.dieselPrice != -1" class="price">
                            Diesel: {{ station.dieselPrice }}€
                        </span>
                        <span v-if="station.e5Price != -1" class="price">
                            E5: {{ station.e5Price }}€
                        </span>
                        <span v-if="station.e10Price != -1" class="price">
                            E10: {{ station.e10Price }}€
                        </span>
                        </p>
                        <p>
                            {{ station.address.toString() }}
                        </p>
                        <p v-if="station.isOpen">
                            <ion-icon :icon="checkmarkCircleOutlineIcon" color="success"></ion-icon>
                            <span> Geöffnet</span>
                        </p>
                        <p v-else>
                            <ion-icon :icon="closeCircleOutlineIcon" color="danger"></ion-icon>
                            <span> Geschlossen</span>
                        </p>
                        <ion-button @click="showOpeningHours(station)">Öffnungszeiten</ion-button>
                        <br>
                        <ion-button @click="toggleFavorite(station)">
                            <ion-icon slot="start" :icon="starIcon"></ion-icon>
                            <div v-if="!station.isFavorite">Zu Favoriten hinzufügen</div>
                            <div v-else>Aus Favoriten entfernen</div>
                        </ion-button>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">

//Einbinden der Ionic Bibliothek
import { IonPage, IonToolbar, IonFooter, IonHeader, IonTitle, IonContent, IonButton, IonActionSheet, IonItem, IonLabel, IonInput, IonList, IonIcon, IonSelect, IonSelectOption } from '@ionic/vue';
import { star, checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { Options, Vue } from 'vue-class-component';
import Station from '@/models/dao/Station';
import StationLoader from '@/models/StationLoader';

@Options({
    components: {
        IonPage,
        IonToolbar,
        IonFooter,
        IonHeader,
        IonTitle,
        IonContent,
        IonButton,
        IonActionSheet,
        IonItem,
        IonLabel,
        IonInput,
        IonList,
        IonIcon,
        IonSelect,
        IonSelectOption
    },
})

export default class StationDetails extends Vue {
    
    public stations : Array<Station> = [];

    private sortPred : string = '';

    public async mounted() : Promise<void> {
        this.stations = await StationLoader.getStationsSortedByPrice('e10');
    }

    public async sort() : Promise<void> {
        if(this.sortPred === '')
            return;
        
        if(this.sortPred === 'distance')
            this.stations = await StationLoader.getStationsSortedByDistance();
        else if(this.sortPred === 'dieselPrice')
            this.stations = await StationLoader.getStationsSortedByPrice('diesel');
        else if(this.sortPred === 'e5Price')
            this.stations = await StationLoader.getStationsSortedByPrice('e5');
        else if(this.sortPred === 'e10Price')
            this.stations = await StationLoader.getStationsSortedByPrice('e10');
        
        // Unschöner Trick, um die Liste neu zu rendern
        // Entfernen und Hinzufügen der letzten Tankstelle, um ein Rerendering zu erzwingen
        const station = this.stations.pop();
        if(station)
            this.stations.push(station);
    }

    public async showOpeningHours(station : Station) : Promise<void> {
        this.$router.push({ name: 'StationOpeningTimes', params: { id: station.id } });
    }

    public toggleFavorite(station : Station) : void {
        if(station.isFavorite)
            StationLoader.removeFavoriteStation(station);
        else
            StationLoader.addFavoriteStation(station);
    }

    public get starIcon() : string {
        return star;
    }

    public get checkmarkCircleOutlineIcon() : string {
        return checkmarkCircleOutline;
    }

    public get closeCircleOutlineIcon() : string {
        return closeCircleOutline;
    }

    get sortPredicate() : string {
        return this.sortPred;
    }

    set sortPredicate(value : string) {
        this.sortPred = value;
    }
}
</script>

<style lang="scss">

.price {
    margin-right: 0.4rem;
}

</style>