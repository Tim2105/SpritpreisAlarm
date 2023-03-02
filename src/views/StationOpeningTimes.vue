<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Öffnungszeiten für {{ station?.name }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>

            <h1>Reguläre Öffnungszeiten</h1>
            <ion-list>
                <ion-item v-for="time in openingTimes?.openingTimes" :key="time.days">
                    {{ time.toString() }}
                </ion-item>
            </ion-list>

            <h1 v-if="openingTimes?.overrides.length">Ausnahmen</h1>
            <ion-item v-for="time in openingTimes?.overrides" :key="time">
                {{ time.toString() }}
            </ion-item>

            <p v-if="station?.isOpen">
                <ion-button color="success" expand="block">Geöffnet</ion-button>
            </p>
            <p v-else>
                <ion-button color="danger" expand="block">Geschlossen</ion-button>
            </p>

        </ion-content>
    </ion-page>
</template>

<script lang="ts">

//Einbinden der Ionic Bibliothek
import { IonPage, IonToolbar, IonFooter, IonHeader, IonTitle, IonContent, IonButton, IonActionSheet, IonItem, IonLabel, IonInput, IonList } from '@ionic/vue';
import { Options, Vue } from 'vue-class-component';
import OpeningTimes from '@/models/dao/OpeningTimes';
import OpeningTimesAPIRequest from '@/models/logic/OpeningTimesAPIRequest';
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
        IonList
    },
})
export default class StationOpeningTimes extends Vue {
    
    public station: Station | null = null;
    public openingTimes : OpeningTimes | null = null;

    public async mounted() : Promise<void> {
        const paramId = this.$route.params.id;

        if (paramId != null && typeof paramId === 'string') {
            const stations : Station[] = await Stations.getStations();
            const station : Station | undefined = stations.find((station : Station) => station.id === paramId);

            if (station != null) {
                this.station = station;
            } else {
                throw new Error("Station not found");
            }
        } else {
            throw new Error("Invalid id");
        }

        const openingTimesAPIRequest : OpeningTimesAPIRequest = new OpeningTimesAPIRequest(paramId);
        const openingTimes : OpeningTimes = await openingTimesAPIRequest.getOpeningTimes();
        this.openingTimes = openingTimes;
    }
}

</script>

<style>

</style>