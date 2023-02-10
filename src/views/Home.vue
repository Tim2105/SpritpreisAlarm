<template>
    <ion-page>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonToolbar, IonFooter, IonHeader, IonTitle, IonContent, IonButton, IonActionSheet, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { Options, Vue } from 'vue-class-component';

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
        IonInput
    }
})

export default class Home extends Vue {

}
</script>

<style lang="scss">

</style>