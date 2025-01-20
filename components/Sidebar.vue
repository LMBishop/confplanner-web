<script setup lang="ts">
const scheduleStore = useScheduleStore();
</script>

<template>
  <div class="sidebar">
    <Panel class="conference">
      <span class="conference-title">{{ scheduleStore.schedule?.conference.title }}</span>
      <span class="conference-venue">{{ scheduleStore.schedule?.conference.venue }}</span>
      <span class="conference-city">{{ scheduleStore.schedule?.conference.city }}</span>
    </Panel>
    
    <Nav />

    <div class="info">
      <span>Times listed are in local time ({{ scheduleStore.schedule?.conference.timeZoneName }})</span>
    </div>
  </div>
</template>

<style>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.conference {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.conference-title {
  font-weight: 600;
  font-size: var(--text-normal);
}

.conference-venue, .conference-city {
  font-size: var(--text-small);
  color: var(--color-text-muted);
}

.info {
  font-size: var(--text-smaller);
  color: var(--color-text-muted);
  margin: 0 1rem;
}
  
</style>