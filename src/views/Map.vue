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
import StationLoader from '@/models/StationLoader';
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

    private markerListe: L.Marker[] = [];
   
   /**
    * initialize the map with the stations
    */

    public async mounted(): Promise<void> {

        const stations = await StationLoader.getStations();

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

        // // Marker für die Tankstellen und User Nils Bachmann
        // this.zeichneNurFavoriten(stations, this.map);
        stations.sort((a, b) => {
            let aAverage = (a.dieselPrice + a.e5Price + a.e10Price)/3;
            let bAverage = (b.dieselPrice + b.e5Price + b.e10Price)/3;
            return aAverage - bAverage;
        });

        this.zeichneAlleTankstellen(stations, this.map);
        this.zeichneMyLocation(coordinate, this.map);
    }
    

    //Nils Bachmann
    private zeichneAlleTankstellen(stations: Station[], map: L.Map): void {

        for(let i = 0; i < this.markerListe.length; i++){
            map.removeLayer(this.markerListe[i]);
        }

        this.markerListe = [];
        
        // Icon für die Tankstellen
        const tankestelle = L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/483/483497.png',iconSize: [25, 30]});

        const aral = L.icon({iconUrl: 'https://seeklogo.com/images/A/Aral-logo-E1036405B9-seeklogo.com.png',iconSize: [38, 45]});

        const shell = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/de/thumb/7/74/Royal_Dutch_Shell.svg/2194px-Royal_Dutch_Shell.svg.png',iconSize: [38, 35]});

        const esso = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Esso-Logo.svg/2560px-Esso-Logo.svg.png',iconSize: [40, 30]});

        const bft = L.icon({iconUrl: 'https://www.bft.de/application/files/4816/6210/6322/bft-logo.svg',iconSize: [38, 95]});

        const star = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Star_Tankstelle_Logo_2020.svg/2560px-Star_Tankstelle_Logo_2020.svg.png',iconSize: [30, 30]});

        const jet = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/de/thumb/e/e5/JET.svg/1280px-JET.svg.png',iconSize: [35, 30]});

        const favorit = L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/121/121724.png',iconSize: [25, 30]});


        for (let i = 0; i < stations.length; i++) {

            const station: Station = stations[i];

            let infos = station.name + "<br>"+"E5: " + station.e5Price + "€" + "<br>"+ "E10: " + station.dieselPrice+ "€" +"<br>" +"Diesel: "+ station.e10Price+ "€";

            let popupOptionens = L.popup({ closeOnClick: false, autoClose: false }).setContent(infos);

            if (station.isFavorite == true)
                this.markerListe.push(L.marker([station.coordinate.latitude, station.coordinate.longitude], { icon: favorit }).bindPopup(popupOptionens));
            else if (/Aral/i.test(station.name))
                this.markerListe.push(L.marker([station.coordinate.latitude, station.coordinate.longitude], { icon: aral }).bindPopup(popupOptionens));
            else if (/Shell/i.test(station.name))
                this.markerListe.push(L.marker([station.coordinate.latitude, station.coordinate.longitude], { icon: shell }).bindPopup(popupOptionens));
            else if (/Esso/i.test(station.name))
                this.markerListe.push(L.marker([station.coordinate.latitude, station.coordinate.longitude], { icon: esso }).bindPopup(popupOptionens));
            else if (/JET/i.test(station.name))
                this.markerListe.push(L.marker([station.coordinate.latitude, station.coordinate.longitude], { icon: jet }).bindPopup(popupOptionens));
            else if (/bft/i.test(station.name))
                this.markerListe.push(L.marker([station.coordinate.latitude, station.coordinate.longitude], { icon: bft }).bindPopup(popupOptionens));
            else if (/star Tankstelle/i.test(station.name))
                this.markerListe.push(L.marker([station.coordinate.latitude, station.coordinate.longitude], { icon: star }).bindPopup(popupOptionens));
            else
                this.markerListe.push(L.marker([station.coordinate.latitude, station.coordinate.longitude], { icon: tankestelle }).bindPopup(popupOptionens));
        } 

        for (let i = 0; i < this.markerListe.length; i++) {

            map.addLayer(this.markerListe[i]);

            if(stations[i].isFavorite == true)
                this.markerListe[i].openPopup();

        }

        if (this.markerListe.length > 0)
            this.markerListe[0].openPopup();

    }

    //Nils Bachmann
    private zeichneMyLocation(coordinate : Coordinate, map: L.Map): void {
        // Icon für den User
        const popupOptionen  = L.popup({closeOnClick: false, autoClose: false}).setContent("Du bist hier");
        const myLocation = L.icon({iconUrl: 'https://www.freeiconspng.com/thumbs/location-icon-png/location-icon-map-png--1.png', iconSize: [60, 60]});

        L.marker([coordinate.latitude, coordinate.longitude], {icon: myLocation}).addTo(this.map).bindPopup(popupOptionen).openPopup();
 }

    public showDetails(): void {
        this.$router.push({ name: 'Details' });
    }

    /**
     * update the map with the new filtered stations
     * 
     * @author Nils Bachmann
     */
    public update(): void {
     
        const filteredStations: Station[] = Filter_ts.getFilteredStations();
        //der Layer der neuen Tankstellen wird hinzugefügt
        this.zeichneAlleTankstellen(filteredStations, this.map);
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
