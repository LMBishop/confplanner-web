<script setup lang="ts">
import { useScheduleStore } from '~/stores/schedule';

const scheduleStore = useScheduleStore();

</script>

<template>
  <Panel v-if="scheduleStore.schedule">
    <h2 class="events-title">Events</h2>
    <div v-for="[day, events] of Object.entries(scheduleStore.eventsPerDay)" :key="day">
      <ul class="events-list">
        <li v-for="event in events" :key="event.id" class="event-item" :data-index="event.id">
          <EventListing :event="event" />
        </li>
      </ul>
    </div>
  </Panel>
</template>

<style>
.events-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
}

.event-item {
  border-bottom: 1px solid var(--color-background-muted);
}

.events-title {
  margin-bottom: 1rem;
}

.event-item:last-child {
  border-bottom: none;
}
</style>