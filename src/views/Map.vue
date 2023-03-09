<template>
    <!--Einbinden der Css Datei von Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin="" />
    <!--Menü Icon -->
    <ion-menu content-id="main-content" side="end">
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
import { Options, Vue } from 'vue-class-component';
import APIRequest from '@/models/logic/APIRequest';

import Filter_ts from '@/models/logic/Filter';
import FilterVue from '@/views/Filter.vue';
import Station from '@/models/dao/Station';


//Einbinden der Leaflet Bibliothek
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import Stations from '@/models/Stations';
import Coordinate from '@/models/dao/Coordinate';


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

    private layergroup: any;
   
   /**
    * initialize the map with the stations
    */

    public async mounted(): Promise<void> {

        const stations = await Stations.getStations();

        // Koordinaten des Users
        // Standardkoordinaten falls die Standortbestimmung nicht funktioniert
        let coordinate = new Coordinate(51.36882628398427, 7.687692660214414); // Fachhochschule Südwestfalen - Standort Iserlohn

        // Standortbestimmung
        if(navigator.geolocation) {
            // Warten auf die Standortbestimmung
            await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition((position) => {
                    coordinate = new Coordinate(position.coords.latitude, position.coords.longitude);
                    resolve(position);
                }, (error) => {
                    reject(error);
                });
            }).catch((error) => {
                console.log(error);
            });
        }
        
        // Karte initialisieren mit Koordinaten des Users und eigenem Icon
        this.map = L.map('map').setView([coordinate.latitude , coordinate.longitude], 13);

        // Karte mit OpenStreetMap befüllen
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(this.map);
        this.update();
        // // Marker für die Tankstellen und User Nils Bachmann
        // this.zeichneNurFavoriten(stations, this.map);
        //this.zeichneAlleTankstellen(stations, this.map);
        // this.zeichneMyLocation(apiRequest, this.map);
    }
    

    //Nils Bachmann
    private zeichneAlleTankstellen(stations: Station[], map: L.Map): void {
        // Icon für die Tankstellen
        var tankestelle = L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/483/483497.png',iconSize: [25, 30], popupAnchor: [0, -13]});

        var aral = L.icon({iconUrl: 'https://seeklogo.com/images/A/Aral-logo-E1036405B9-seeklogo.com.png',iconSize: [38, 45], iconAnchor: [22, 94], popupAnchor: [-3, -76]});

        var shell = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/de/thumb/7/74/Royal_Dutch_Shell.svg/2194px-Royal_Dutch_Shell.svg.png',iconSize: [38, 35], iconAnchor: [22, 94], popupAnchor: [-3, -76]});

        var esso = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Esso-Logo.svg/2560px-Esso-Logo.svg.png',iconSize: [40, 40], iconAnchor: [22, 94], popupAnchor: [-3, -76]});

        var bft = L.icon({iconUrl: 'https://www.bft.de/application/files/4816/6210/6322/bft-logo.svg',iconSize: [38, 95], iconAnchor: [22, 94], popupAnchor: [-3, -50]});

        var star = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Star_Tankstelle_Logo_2020.svg/2560px-Star_Tankstelle_Logo_2020.svg.png',iconSize: [30, 30], iconAnchor: [22, 94], popupAnchor: [-3, -90]});

        var jet = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/de/thumb/e/e5/JET.svg/1280px-JET.svg.png',iconSize: [35, 30], iconAnchor: [22, 94], popupAnchor: [-8, -95]});

        var favorit = L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/121/121724.png',iconSize: [25, 30], popupAnchor: [0, -13]});

        for (let i = 0; i < stations.length; i++) {
            const station: Station = stations[i];
            var infos = station.name + "<br>"+"E5: " + station.e5Price + "€" + "<br>"+ "E10: " + station.dieselPrice+ "€" +"<br>" +"Diesel: "+ station.e10Price+ "€";
            var popupOptionens  = L.popup({closeOnClick: false, autoClose: false}).setContent(infos);
            if (station.isFavorite == true)
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: favorit}).addTo(map).bindPopup(popupOptionens).openPopup();
            else if (/Aral/i.test(station.name))
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: aral }).addTo(map).bindPopup(popupOptionens).openPopup();
            else if (/Shell/i.test(station.name))
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: shell}).addTo(map).bindPopup(popupOptionens).openPopup();
            else if (/Esso/i.test(station.name))
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: esso}).addTo(map).bindPopup(popupOptionens).openPopup();
            else if (/JET/i.test(station.name))
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: jet}).addTo(map).bindPopup(popupOptionens).openPopup();
            else if (/bft/i.test(station.name))
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: bft}).addTo(map).bindPopup(popupOptionens).openPopup();
            else if (/star Tankstelle/i.test(station.name))
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: star}).addTo(map).bindPopup(popupOptionens).openPopup();
            else
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: tankestelle}).addTo(map).bindPopup(popupOptionens).openPopup();
        }
    }

    //Nils Bachmann
    private zeichneNurFavoriten(stations: Station[], map: L.Map): void {
        // Icon für die Favoriten
        var favorit = L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/121/121724.png',iconSize: [25, 30], popupAnchor: [0, -13]});

        for (let i = 0; i < stations.length; i++) {
            const station: Station = stations[i];
            if (station.isFavorite == true)
                L.marker([station.coordinate.latitude, station.coordinate.longitude], {icon: favorit}).addTo(map).bindPopup(station.name).openPopup();
        }
    }

    //Nils Bachmann
    private zeichneMyLocation(apiRequest: APIRequest, map: L.Map): void {
        // Icon für den User
        var popupOptionen  = L.popup({closeOnClick: false, autoClose: false}).setContent("Du bist hier");
        var myLocation = L.icon({iconUrl: 'https://www.freeiconspng.com/thumbs/location-icon-png/location-icon-map-png--1.png', iconSize: [60, 60], iconAnchor: [22, 94], popupAnchor: [5, -92]});

        L.marker([apiRequest.coordinate.latitude, apiRequest.coordinate.longitude], {icon: myLocation}).addTo(map).bindPopup(popupOptionen).openPopup();
 }

    public showDetails(): void {
        this.$router.push({ name: 'Details' });
    }

    /**
     * update the map with the new filtered stations
     */
    public update(): void {

        //die gefilterten Tankstellen werden in eine Variable gespeichert
        const filteredStations: Station[] = Filter_ts.getFilteredStations();
   
        //die Layergroup wird gelöscht
        this.map.removeLayer(this.layergroup);        

        //der Layer der neuen Tankstellen wird hinzugefügt
        this.layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

        const filteredStation = [];
        //die neuen Tankstellen werden auf der Karte angezeigt
          for (let i = 0; i < filteredStations.length; i++) {
            const station: Station = filteredStations[i];
            filteredStation.push(L.marker([station.coordinate.latitude, station.coordinate.longitude]).bindPopup(station.name  + "<br>" + "Diesel: " + station.dieselPrice + "€" + "<br>" + "Super: " + station.e5Price + "€" + "<br>" + "Super Plus: " + station.e10Price + "€").openPopup());
        }
        console.log(filteredStation);
        this.layergroup = L.layerGroup([...filteredStation]).addTo(this.map);
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
