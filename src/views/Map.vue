<template>
    <!--Einbinden der Css Datei von Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin="" />
    <!--Menü Icon -->
    <ion-menu content-id="main-content">
        <ion-header>
            <ion-toolbar>
                <ion-title>Menu Content</ion-title>
            </ion-toolbar>
        </ion-header>
        <!--Menü beinhalt die Detais und den filter  -->
        <ion-content class="ion-padding">
            <ion-menu-toggle>
                 <FilterVue @update="update()"></FilterVue>
                 <ion-button @click="showDetails()">Tankstellendetails</ion-button>
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

import Filter_ts from '@/models/logic/Filter';
import FilterVue from '@/views/Filter.vue';
import Stations from '@/models/Stations';
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
        IonToolbar,
        FilterVue
    }
})

//&Nils Bachmann
export default class Map extends Vue {

    //die Map als Variable deklarieren
    private map: any;
    // den Layer der Tankstellen als Variable deklarieren
    private layer: any;

   
    
    public async mounted(): Promise<void> {

        const apiRequest: APIRequest = await APIRequest.fromCurrentLocation();
        const stations: Station[] = await apiRequest.getStations();

        // Karte initialisieren mit Koordinaten des Users und eigenem Icon
        this.map = L.map('map').setView([apiRequest.coordinate.latitude , apiRequest.coordinate.longitude], 13);


        // Icon für den User
        var myLocation = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/images/marker-icon-2x.png',
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
        });

        // Kartenlayer hinzufügen wo sich der user befindet = layer hinzufügen
        this.layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(this.map);

        // Marker für die Tankstellen hinzufügen mit eigenem Icon
/*      for (let i = 0; i < stations.length; i++) {
            const station: Station = stations[i];
            L.marker([station.coordinate.latitude, station.coordinate.longitude]).addTo(this.map).bindPopup(station.name  + "<br>" + "Diesel: " + station.dieselPrice + "€" + "<br>" + "Super: " + station.e5Price + "€" + "<br>" + "Super Plus: " + station.e10Price + "€").openPopup(); 
         }
*/
        // Marker für den User hinzufügen mit eigenem Icon
        L.marker([apiRequest.coordinate.latitude, apiRequest.coordinate.longitude], { icon: myLocation }).addTo(this.map).bindPopup("You are here").openPopup();
    }

    public showDetails(): void {
        this.$router.push({ name: 'Details' });
    }

    /**
     * update the map with the new filtered stations
     */
    public update(): void {

        const filteredStations: Station[] = Filter_ts.getFilteredStations();
   
        this.map.removeLayer(this.layer);
        this.layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(this.map);

        for (let i = 0; i < filteredStations.length; i++) {
            const station: Station = filteredStations[i];
            L.marker([station.coordinate.latitude, station.coordinate.longitude]).addTo(this.map).bindPopup(station.name  + "<br>" + "Diesel: " + station.dieselPrice + "€" + "<br>" + "Super: " + station.e5Price + "€" + "<br>" + "Super Plus: " + station.e10Price + "€").openPopup(); 
        }

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
