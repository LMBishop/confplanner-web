<script setup lang="ts">
import { formatDistanceToNow } from "date-fns";
import { LucideClock, LucideRadio } from "lucide-vue-next";

const scheduleStore = useScheduleStore();
const errorStore = useErrorStore();

const timeUntilConferenceStart = computed(() => {
  if (!scheduleStore.schedule) {
    return 0;
  }

  const now = new Date();
  const conferenceStart = new Date(scheduleStore.schedule.conference.start);
  const diff = conferenceStart.getTime() - now.getTime();

  return diff;
});
</script>

<template>
  <div class="sidebar">
    <Panel class="conference">
      <span class="conference-title">{{ scheduleStore.schedule?.conference.title }}</span>
      <span class="conference-venue">{{ scheduleStore.schedule?.conference.venue }}</span>
      <span class="conference-city">{{ scheduleStore.schedule?.conference.city }}</span>
      
      <Button kind="secondary" @click="errorStore.setError('This doesn\'t do anything yet :-)')">Change conference</Button>
    </Panel>
    
    <Panel kind="success" class="ongoing" v-if="scheduleStore.isConferenceOngoing()">
      <span class="text-icon"><LucideRadio /> <span>This conference is ongoing</span></span>
      <Button kind="primary" @click="navigateTo('/live')">View live</Button>
    </Panel> 

    <Panel kind="error" class="finished" v-else-if="scheduleStore.isConferenceFinished()">
      <span>This conference has finished</span>
    </Panel> 
    
    <Panel class="upcoming" v-else>
      <span class="text-icon"><LucideClock /> <span>Starts in {{ formatDistanceToNow(scheduleStore.getStartDate()) }}</span></span>
    </Panel>
    
    <Nav />

    <div class="info">
      <span>Times listed are in local time ({{ scheduleStore.schedule?.conference.timeZoneName }})</span>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.finished, .ongoing, .upcoming {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: var(--text-small);
  font-style: oblique;
  text-align: center;
}

.finished svg, .ongoing svg, .upcoming svg{
  height: var(--text-small)  ;
  width: var(--text-small);
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