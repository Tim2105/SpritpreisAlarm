<template>
    <ion-page>
            <Map></Map>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonToolbar, IonFooter, IonHeader, IonTitle, IonContent, IonButton, IonActionSheet, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { Options, Vue } from 'vue-class-component';
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

}
</script>

<style lang="scss">

</style>