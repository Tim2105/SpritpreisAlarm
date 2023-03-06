<template>
    <ion-app>
        <router-view/>
    </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { Options, Vue } from 'vue-class-component';
import Stations from '@/models/Stations';

@Options({
    components: {
        IonApp,
        IonRouterOutlet
    }
})
export default class App extends Vue {

    public async mounted(): Promise<void> {
        await this.$router.isReady();

        Stations.loadFavoriteStations();
    }

}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #448cd3;
}
</style>