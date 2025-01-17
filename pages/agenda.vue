<script setup lang="ts">
import Panel from '~/components/Panel.vue';


const favouritesStore = useFavouritesStore();
const scheduleStore = useScheduleStore();

const favouriteEvents = computed(() => {
  return scheduleStore.events.filter((event) => favouritesStore.isFavourite(event));
});

console.log(favouriteEvents.value);

</script>

<template>
  <Panel v-if="favouritesStore.status === 'pending'">
    <span>Updating favourites...</span>
  </Panel>
  <Panel v-else-if="favouriteEvents.length > 0">
    <h2 class="agenda-title">Agenda</h2>
    <ul class="agenda-list">
      <li 
        v-for="event in favouriteEvents" 
        :key="event.id" 
        class="agenda-item"
      >
        <EventListing :event="event" />
      </li>
    </ul>
  </Panel>
  <Panel v-else>
    <span>You have not added any favourites yet.</span>
  </Panel>
</template>

<style scoped>
.agenda-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
}

.agenda-item {
  border-bottom: 1px solid var(--color-background-muted); 
}

.agenda-title {
  margin-bottom: 1rem;
}

.agenda-item:last-child {
  border-bottom: none; 
}

</style>