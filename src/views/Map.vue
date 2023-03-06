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
        this.zeichneFavoriten(stations, map);
        this.zeichneAlleTankstellen(stations, map);

        // Marker für den User hinzufügen mit eigenem Icon
        this.zeichneMyLocation(apiRequest, map);
    }
    
    private zeichneAlleTankstellen(stations: Station[], map: L.Map): void {
        // Icon für die Tankstellen
        var tankestelle = L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/483/483497.png',iconSize: [25, 30], popupAnchor: [0, -13]});

        var aral = L.icon({iconUrl: 'https://seeklogo.com/images/A/Aral-logo-E1036405B9-seeklogo.com.png',iconSize: [38, 45], iconAnchor: [22, 94], popupAnchor: [-3, -76]});

        var shell = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/de/thumb/7/74/Royal_Dutch_Shell.svg/2194px-Royal_Dutch_Shell.svg.png',iconSize: [38, 35], iconAnchor: [22, 94], popupAnchor: [-3, -76]});

        var esso = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Esso-Logo.svg/2560px-Esso-Logo.svg.png',iconSize: [40, 40], iconAnchor: [22, 94], popupAnchor: [-3, -76]});

        var bft = L.icon({iconUrl: 'https://www.bft.de/application/files/4816/6210/6322/bft-logo.svg',iconSize: [38, 95], iconAnchor: [22, 94], popupAnchor: [-3, -50]});

        var star = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Star_Tankstelle_Logo_2020.svg/2560px-Star_Tankstelle_Logo_2020.svg.png',iconSize: [30, 30], iconAnchor: [22, 94], popupAnchor: [-3, -90]});

        var jet = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/de/thumb/e/e5/JET.svg/1280px-JET.svg.png',iconSize: [35, 30], iconAnchor: [22, 94], popupAnchor: [-8, -95]});



        for (let i = 0; i < stations.length; i++) {
            const station: Station = stations[i];
            switch(true){
            case (/Aral/i.test(station.name)):
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: aral }).addTo(map).bindPopup(station.name).openPopup();
                break;
            case (/Shell/i.test(station.name)):
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: shell}).addTo(map).bindPopup(station.name + "<br>" + station.address).openPopup();
                break;
            case (/Esso/i.test(station.name)):
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: esso}).addTo(map).bindPopup(station.name).openPopup();
                break;
            case (/JET/i.test(station.name)):
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: jet}).addTo(map).bindPopup(station.name).openPopup();
                break;
            case (/bft/i.test(station.name)):
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: bft}).addTo(map).bindPopup(station.name).openPopup();
                break;
            case (/star Tankstelle/i.test(station.name)):
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: star}).addTo(map).bindPopup(station.name).openPopup();
                break;
            default:
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: tankestelle}).addTo(map).bindPopup(station.name).openPopup();
                break;
            }

        }
    }

    private zeichneFavoriten(stations: Station[], map: L.Map): void {
        // Icon für die Favoriten
        var favorit = L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/121/121724.png',iconSize: [25, 30], popupAnchor: [0, -13]});

        for (let i = 0; i < stations.length; i++) {
            const station: Station = stations[i];
            L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: favorit}).addTo(map).bindPopup(station.name).openPopup();
        }
    }

    private zeichneMyLocation(apiRequest: APIRequest, map: L.Map): void {
        // Icon für den User
        var myLocation = L.icon({
            iconUrl: 'https://www.freeiconspng.com/thumbs/location-icon-png/location-icon-map-png--1.png',iconSize: [50, 60],
            iconAnchor: [22, 94],
            popupAnchor: [3, -92],            
        });
        L.marker([apiRequest.coordinate.latitude, apiRequest.coordinate.longitude], {icon: myLocation}).addTo(map).bindPopup("Du bist hier").openPopup();
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
