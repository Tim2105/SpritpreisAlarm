<template>
    <ion-page>
        <Map></Map>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonToolbar, IonFooter, IonHeader, IonTitle, IonContent, IonButton, IonActionSheet, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { Options, Vue } from 'vue-class-component';
import APIRequest from '@/models/logic/APIRequest';
import Station from '@/models/dao/Station';
import Map from '@/views/Map.vue';

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
        Map
    }
})

export default class Home extends Vue {

    private _output : string = '';

    public async mounted() : Promise<void> {
        const apiRequest : APIRequest = await APIRequest.fromCurrentLocation();
        const stations : Station[] = await apiRequest.getStations();
        console.log(stations);

        this._output = JSON.stringify(stations);
    }

    public get output() : string {
        return this._output;
    }
}
</script>

<style lang="scss">

</style>