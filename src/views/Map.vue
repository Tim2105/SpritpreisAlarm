<template>
       <!-- ein Menu was auf klick die Punkte Preise und favoriten  anzeigt -->
  
    <ion-menu content-id="main-content">
        <ion-header>
            <ion-toolbar>
                <ion-title>Menu Content</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
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

  import { defineComponent } from 'vue';
  import { Options, Vue } from 'vue-class-component';
    import APIRequest from '@/models/logic/APIRequest';
    import Station from '@/models/dao/Station';

  

    // einbindungen für die Karte (leaflet)
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import 'leaflet/dist/images/marker-shadow.png';


    @Options({components:
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

        public async mounted() : Promise<void> {

            const apiRequest : APIRequest = await APIRequest.fromCurrentLocation();
            const stations : Station[] = await apiRequest.getStations();
            console.log(stations);


            // Karte initialisieren mit Koordinaten des Users
            const map = L.map('map').setView([apiRequest.coordinate.latitude , apiRequest.coordinate.longitude], 13);
            const marker_01 = L.marker([apiRequest.coordinate.latitude , apiRequest.coordinate.longitude]).addTo(map);

            var marker = L.marker([apiRequest.coordinate.latitude , apiRequest.coordinate.longitude]).addTo(map);
            // Kartenlayer hinzufügen wo sich der user befindet
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            marker_01.bindPopup("You are here").openPopup();

            // Marker für die Tankstellen hinzufügen
            for (let i = 0; i < stations.length; i++) {
                const station : Station = stations[i];
                const marker = L.marker([station.coordinate.latitude, station.coordinate.longitude]).addTo(map);
                marker.bindPopup(station.name).openPopup();
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
.Menu_button{
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
   
  

    
}
</style>
