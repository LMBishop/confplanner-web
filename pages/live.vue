<script setup lang="ts">
import Panel from '~/components/Panel.vue';
import { type Event } from '~/stores/schedule';

const favouritesStore = useFavouritesStore();
const scheduleStore = useScheduleStore();
const errorStore = useErrorStore();

const favouriteEvents = computed(() => {
  return scheduleStore.events.filter((event) => favouritesStore.isFavourite(event));
});
const todayEvents = computed(() => {
  return scheduleStore.events.filter((event) => isToday(new Date(event.start)));
});
const happeningNow = computed(() => {
  return todayEvents.value.filter((event) => isEventHappeningNow(event));
});
const favouritesHappeningNow = computed(() => {
  return happeningNow.value.filter((event) => favouritesStore.isFavourite(event));
});

function isEventHappeningNow(event: Event): boolean {
  const now = new Date();
  return event.start <= now && event.end >= now;
}

function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}
</script>

<template>
  <Panel kind="success" class="ongoing" v-if="happeningNow.length > 0">
    
  </Panel>

</template>

<style scoped>
</style>