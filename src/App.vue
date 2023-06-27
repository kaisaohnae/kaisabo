<template>
<v-loading v-if="loading.active" />
<v-alert v-if="alert.active" :info="alert.info" />
<div id="container" v-bind:class="{menuOn : setting.menu.active}">
	<router-view />
</div>
</template>

<script setup lang="ts">
import vLoading from './components/Loading.vue';
import vAlert from './components/Alert.vue';
import { useLoadingStore } from './store/store.loading';
import { useAlertStore } from './store/store.alert';
import { useSettingStore } from './store/store.setting';

const loading = useLoadingStore();
const alert = useAlertStore();
const setting = useSettingStore();

</script>
<style scoped>
#container {width:100%; height:100%; position:relative; background:#ddd; padding:10px;}
#container.menuOn {padding:10px 10px 10px 230px;}
</style>
