<script setup lang="ts">
import { StarIcon } from 'lucide-vue-next';
import { add, format } from 'date-fns';
import { type Event as ScheduledEvent } from '~/stores/schedule';
import Spinner from './Spinner.vue';

const { event } = defineProps<{
  event: ScheduledEvent;
}>();

const selectedEventStore = useSelectedEventStore();
const favouritesStore = useFavouritesStore();
const errorStore = useErrorStore();
const config = useRuntimeConfig();

const addingToFavourite = ref(false);

const addFavourite = async () => {
  addingToFavourite.value = true;
  
  try {
    const res = await $fetch(config.public.baseURL + '/favourites', {
      method: 'POST',
      body: JSON.stringify({
        eventGuid: event.guid,
        eventId: event.id,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    favouritesStore.addFavourite({
      id: (res as any).data.id,
      eventId: event.id,
      eventGuid: event.guid,
    });
  } catch(e: any) {
    errorStore.setError(e.data.message ?? 'An unknown error occurred'); 
  } finally {
    addingToFavourite.value = false;
  }
};

const removeFavourite = async () => {
  addingToFavourite.value = true;

  try {
    await $fetch(config.public.baseURL + '/favourites', {
      method: 'DELETE',
      body: JSON.stringify({
        eventGuid: event.guid,
        eventId: event.id,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    favouritesStore.removeFavourite({
      eventId: event.id,
      eventGuid: event.guid,
    });
  } catch(e: any) {
    errorStore.setError(e.data.message ?? 'An unknown error occurred'); 
  } finally {
    addingToFavourite.value = false;
  }

};
</script>

<template>
  <div class="event">
    <div class="event-details" @click="selectedEventStore.setSelectedEvent(event)">
      <span class="event-info">
        {{ format(event.start, "kk:mm") }} - {{ format(event.end, "kk:mm") }}, {{ event.room }}
      </span>
      <span class="event-title">{{ event.title }}</span>
      <span class="event-speaker">{{ event.persons.map(p => p.name).join(", ") }}</span>
      <span class="event-track">{{ event.track.name }}</span>
    </div>
    <template v-if="!addingToFavourite" class="event-button">
      <StarIcon v-if="favouritesStore.isFavourite(event)" color="var(--color-favourite)" fill="var(--color-favourite)" class="event-button" @click="removeFavourite" />
      <StarIcon v-else color="var(--color-text-muted)" class="event-button" @click="addFavourite" />
    </template>
    <template v-else>
      <Spinner color="var(--color-text-muted)" class="event-button-loading" />
    </template>
  </div>
</template>

<style scoped>
.event-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  line-height: 1.3;
  cursor: pointer;
  flex-grow: 1;
  padding: 0.825rem 1rem;
}

.event-details:hover {
  background-color: var(--color-background-muted);
}

.event {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  left: -1rem;
  width: calc(100% + 2 * 1rem);
}

.event-title {
  font-size: var(--text-large);
  font-weight: 600; 
  color: var(--color-primary);
  margin: 0;
}

.event-speaker, .event-track {
  font-size: var(--text-small);
  color: var(--color-text-muted);
}

.event-info {
  font-size: var(--text-normal); 
  color: var(--color-text); 
  margin: 0;
}

.event-button, .event-button-loading {
  height: 1.5rem; 
  width: 1.5rem; 
  padding: 0 1rem;
  flex-shrink: 0;
}

.event-button {
  cursor: pointer;
}

.event-button-loading {
  cursor: progress;
}

</style>