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
                <ion-item v-for="station in getStations()" :key="station.id">
                    <ion-label>
                        <h1>{{ station.name }}</h1>
                        <p>
                        <span v-if="station.dieselPrice" class="price">
                            Diesel: {{ station.dieselPrice }}€
                        </span>
                        <span v-if="station.e5Price" class="price">
                            E5: {{ station.e5Price }}€
                        </span>
                        <span v-if="station.e10Price" class="price">
                            E10: {{ station.e10Price }}€
                        </span>
                        </p>
                        <p>
                            {{ station.address.toString() }}
                        </p>
                        <ion-button @click="showOpeningHours(station)">Öffnungszeiten</ion-button>
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
import { IonPage, IonToolbar, IonFooter, IonHeader, IonTitle, IonContent, IonButton, IonActionSheet, IonItem, IonLabel, IonInput, IonList, IonIcon } from '@ionic/vue';
import { star } from 'ionicons/icons';
import { Options, Vue } from 'vue-class-component';
import Station from '@/models/dao/Station';
import Stations from '@/models/Stations';

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
        IonIcon
    },
})
export default class StationDetails extends Vue {
    
    private stations : Array<Station> = [];

    public async mounted() : Promise<void> {
        this.stations = await Stations.getStations();
    }

    public getStations() : Array<Station> {
        return this.stations;
    }

    public async showOpeningHours(station : Station) : Promise<void> {
        this.$router.push({ name: 'StationOpeningTimes', params: { id: station.id } });
    }

    public toggleFavorite(station : Station) : void {
        if(station.isFavorite)
            Stations.removeFavoriteStation(station);
        else
            Stations.addFavoriteStation(station);
    }

    public get starIcon() : string {
        return star;
    }
}
</script>

<style lang="scss">

.price {
    margin-right: 0.4rem;
}

</style>