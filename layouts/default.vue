<script setup lang="ts">
import { LucideCross, LucideMenu, LucideX } from "lucide-vue-next";
import Dialog from "~/components/Dialog.vue";
import EventDetail from "~/components/EventDetail.vue";

definePageMeta({
  middleware: ["logged-in"]
})

const scheduleStore = useScheduleStore();
const config = useRuntimeConfig()
const selectedEventStore = useSelectedEventStore();
const favouritesStore = useFavouritesStore();
const errorStore = useErrorStore();
const router = useRouter();

const { selectedEvent } = storeToRefs(selectedEventStore);
const { error } = storeToRefs(errorStore);

const refSelectedDialog = ref<typeof Dialog>();
const refErrorDialog = ref<typeof Dialog>();

const showHamburger = ref(false);

useFetch(config.public.baseURL + '/schedule', {
  method: 'GET',
  server: false,
  lazy: true,
  onResponse: ({ response }) => {
    if (!response.ok) {
      if (response.status === 401) {
        navigateTo('/login');
      } else {
        errorStore.setError(response._data.message || 'An unknown error occurred');
      }
    }

    if (response._data) {
      scheduleStore.setSchedule((response._data as any).data.schedule);
    }
  },
});

favouritesStore.setStatus('pending')

await useFetch(config.public.baseURL + '/favourites', {
  method: 'GET',
  server: false,
  lazy: true,
  onResponseError: ({ response }) => {
    favouritesStore.setStatus('idle')
    errorStore.setError(response._data.message || 'An unknown error occurred');
  },
  onResponse: ({ response }) => {
    if (response._data) {
      favouritesStore.setFavourites((response._data as any).data);
    }
    favouritesStore.setStatus('idle')
  },
});


watch(selectedEvent, () => {
  if (selectedEvent.value != null) {
    refSelectedDialog.value?.show();
  }
});

watch(error, () => {
  if (error.value != null) {
    refErrorDialog.value?.show();
  }
});

router.beforeEach((to, from) => {
  refSelectedDialog.value?.close();
  refErrorDialog.value?.close();
});

</script>

<template>
  <div class="planner-container">
    <header class="planner-header">
      <h1 class="planner-title">Conference Planner</h1>
      <span class="hamburger" @click="showHamburger = !showHamburger">
        <LucideMenu :size="24" v-if="!showHamburger"/>
        <LucideX :size="24" v-else />
      </span>
    </header>
    <div class="planner-layout">
      <template v-if="scheduleStore.schedule">
        <aside :class="['planner-sidebar', { show: showHamburger }]">
          <Panel class="conference">
            <span class="conference-title">{{ scheduleStore.schedule?.conference.title }}</span>
            <span class="conference-venue">{{ scheduleStore.schedule?.conference.venue }}</span>
            <span class="conference-city">{{ scheduleStore.schedule?.conference.city }}</span>
          </Panel>
          
          <Nav />

          <div class="info">
            <span>Times listed are in local time ({{ scheduleStore.schedule?.conference.timeZoneName }})</span>
          </div>
        </aside>

        <main class="planner-content">
          <slot />
        </main>
      </template>
      <template v-else>
        <div class="loading">
          <span class="loading-text">
            <Spinner color="var(--color-text-muted)" />Updating schedule...
          </span>
        </div>
      </template>
    </div>
  </div>
  
  <Dialog ref="refSelectedDialog" @close="selectedEventStore.clearSelectedEvent" kind="normal">
    <template v-if="selectedEvent">
      <EventDetail :event="selectedEvent" />
    </template>
  </Dialog>

  <Dialog ref="refErrorDialog" @close="errorStore.clearError" background-color="var(--color-background-error)" kind="error" :fit-contents="true">
    <template v-if="error">
      <span>{{ error }}</span>
    </template>
  </Dialog>
</template>

<style>
.planner-container {
  min-height: 100vh;
  background-color: var(--color-background); 
  overflow-x: hidden;
}

.planner-header {
  background-color: var(--color-primary); 
  color: white; 
  padding: 1rem; 
  display: flex;
  justify-content: space-between;
}

.planner-title {
  font-size: 1.5rem; 
  font-weight: 700; 
}

.planner-content {
  max-width: 1000px;
  width: 100%;
}

.planner-layout {
  display: flex;
  flex-direction: row;
  gap: 1rem; 
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  justify-content: center;
}
  
.planner-sidebar {
  width: 100%;
  max-width: 300px;
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
  
.loading-text {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-normal);
  color: var(--color-text-muted);
}
  
.loading {
  margin-top: 1rem;
}
  
.hamburger {
  display: none;
}
      
@media (max-width: 768px) {
  /* .planner-header {
    padding: 1rem 0.5rem;
  } */

  .planner-layout {
    flex-direction: column;
    padding: 0.5rem;
  }
  
  .hamburger {
    display: block;
    cursor: pointer;
  }
  
  .planner-sidebar {
    max-width: 100%;
    display: none;
  }
  
  .planner-sidebar.show {
    display: flex;
  }
}

</style>
