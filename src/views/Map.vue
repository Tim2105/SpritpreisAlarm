<template>
    <!--Einbinden der Css Datei von Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
     integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
     crossorigin=""/>
     <!--Menü Icon -->
    <ion-menu content-id="main-content">
        <ion-header>
            <ion-toolbar>
                <ion-title>Menu Content</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-button @click="showDetails()">Tankstellendetails</ion-button>
            <ion-menu-toggle>
                <ion-button>Click to close the menu</ion-button>
            </ion-menu-toggle>
        </ion-content>
    </ion-menu>

    <ion-page id="main-content">
        <ion-content class="ion-padding">
            <div id="map"></div>
            <ion-menu-toggle>
                <ion-button class="Menu_button">Menu</ion-button>
            </ion-menu-toggle>
        </ion-content>

    </ion-page>
</template>

<script lang="ts">

//Einbinden der Ionic Bibliothek
import {
    IonButton,
    IonContent,
    IonHeader,
    IonMenu,
    IonMenuToggle,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/vue';

//Einbinden der Vue Bibliothek
import { defineComponent } from 'vue';
import { Options, Vue } from 'vue-class-component';
import APIRequest from '@/models/logic/APIRequest';
import Station from '@/models/dao/Station';



//Einbinden der Leaflet Bibliothek
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';

@Options({
    components:
    {
        IonButton,
        IonContent,
        IonHeader,
        IonMenu,
        IonMenuToggle,
        IonPage,
        IonTitle,
        IonToolbar
    }
})

export default class Map extends Vue {

    public async mounted(): Promise<void> {

        const apiRequest: APIRequest = await APIRequest.fromCurrentLocation();
        const stations: Station[] = await apiRequest.getStations();
        console.log(stations);


        // Karte initialisieren mit Koordinaten des Users und eigenem Icon
        const map = L.map('map').setView([apiRequest.coordinate.latitude, apiRequest.coordinate.longitude], 13);

        // Icon für den User
        var myLocation = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/images/marker-icon-2x.png',
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],            
        });

        // Kartenlayer hinzufügen wo sich der user befindet
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Marker für die Tankstellen hinzufügen mit eigenem Icon
        for (let i = 0; i < stations.length; i++) {
            const station: Station = stations[i];
            L.marker([station.coordinate.latitude, station.coordinate.longitude]).addTo(map).bindPopup(station.name + "<br>" + station.address).openPopup();
        }

        // Marker für den User hinzufügen mit eigenem Icon
        L.marker([apiRequest.coordinate.latitude, apiRequest.coordinate.longitude], {icon: myLocation}).addTo(map).bindPopup("You are here").openPopup();
    }

    public showDetails(): void {
        this.$router.push({ name: 'Details' });
    }
}

</script>

<style lang="scss">
#map {
    width: 100%;
    height: 100%;
}

//soll über der Karte angezeigt werden
.Menu_button {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
}
</style>
