<!--
    Die Komponente StationOpeningTimes zeigt die Öffnungszeiten einer Tankstelle an.
    Die Öffnungszeiten werden bei Öffnen der Komponente von der API geladen.
    Zusätzlich wird angezeigt, ob die Tankstelle gerade geöffnet ist.

    @author: Tim
-->
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

            <ion-label v-if="openingTimes?.openingTimes.length == 0">
                Leider sind für diese Tankstelle keine genauen Öffnungszeiten hinterlegt.
            </ion-label>

            <h1 v-if="openingTimes?.overrides.length">Ausnahmen</h1>
            <ion-item v-for="time in openingTimes?.overrides" :key="time">
                {{ time.toString() }}
            </ion-item>

            <p v-if="station?.isOpen">
                <ion-icon :icon="checkmarkCircleOutlineIcon" color="success"></ion-icon>
                <span> Geöffnet</span>
            </p>
            <p v-else>
                <ion-icon :icon="closeCircleOutlineIcon" color="danger"></ion-icon>
                <span> Geschlossen</span>
            </p>

        </ion-content>
    </ion-page>
</template>

<script lang="ts">

//Einbinden der Ionic Bibliothek
import { IonPage, IonToolbar, IonFooter, IonHeader, IonTitle, IonContent, IonButton, IonActionSheet, IonItem, IonLabel, IonInput, IonList, IonIcon } from '@ionic/vue';
import { Options, Vue } from 'vue-class-component';
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import OpeningTimes from '@/models/dao/OpeningTimes';
import Station from '@/models/dao/Station';
import StationLoader from '@/models/StationLoader';
import OpeningTimesLoader from '@/models/OpeningTimesLoader';

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
export default class StationOpeningTimes extends Vue {
    
    public station: Station | null = null;
    public openingTimes : OpeningTimes | null = null;

    public async mounted() : Promise<void> {
        const paramId = this.$route.params.id;

        if (paramId != null && typeof paramId === 'string') {
            const stations : Station[] = await StationLoader.getStations();
            const station : Station | undefined = stations.find((station : Station) => station.id === paramId);

            if (station != null) {
                this.station = station;
            } else {
                throw new Error("Station not found");
            }
        } else {
            throw new Error("Invalid id");
        }

        this.openingTimes = await OpeningTimesLoader.getOpeningTimes(this.station);
    }

    public get checkmarkCircleOutlineIcon() : string {
        return checkmarkCircleOutline;
    }

    public get closeCircleOutlineIcon() : string {
        return closeCircleOutline;
    }
}

</script>

<style>

</style>