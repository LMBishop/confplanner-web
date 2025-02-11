<script setup lang="ts">
import { BookHeart, LucideMenu, LucideX } from "lucide-vue-next";
import Dialog from "~/components/Dialog.vue";
import EventDetail from "~/components/EventDetail.vue";
import Sidebar from "~/components/Sidebar.vue";

definePageMeta({
  middleware: ["logged-in"]
})

const scheduleStore = useScheduleStore();
const selectedEventStore = useSelectedEventStore();
const errorStore = useErrorStore();
const router = useRouter();

const { selectedEvent } = storeToRefs(selectedEventStore);
const { error } = storeToRefs(errorStore);

const refSelectedDialog = ref<typeof Dialog>();
const refErrorDialog = ref<typeof Dialog>();

const showHamburger = ref(false);

fetchSchedule();
fetchFavourites();

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

router.afterEach(() => {
  showHamburger.value = false;
});

</script>

<template>
  <div class="planner-container">
    <header>
      <div class="planner-header">
        <span class="text-icon planner-title" @click="navigateTo('/')"><BookHeart /> confplanner</span>
        <span class="hamburger" @click="showHamburger = !showHamburger">
          <LucideMenu :size="24" v-if="!showHamburger"/>
          <LucideX :size="24" v-else />
        </span>
      </div>
      <div class="hamburger-content" v-if="showHamburger">
        <Sidebar />
      </div>
    </header>
    <div class="planner-layout">
      <template v-if="scheduleStore.schedule">
        <aside class="planner-sidebar">
          <Sidebar />
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
}

header {
  position: sticky;
  top: 0;
  z-index: 9999;
}

div.planner-header {
  background-color: var(--color-background-muted); 
  color: var(--color-text-muted); 
  border-bottom: 2px solid var(--color-border);
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  padding: 0 1rem;
}

span.planner-title {
  font-size: 1.5rem; 
  font-weight: 700; 
}

span.planner-title:hover {
  cursor: pointer;
  color: var(--color-primary);
}

main.planner-content {
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
}

div.planner-layout {
  display: flex;
  flex-direction: row;
  gap: 1rem; 
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  justify-content: center;
  width: 100%;
}
  
aside.planner-sidebar {
  width: 100%;
  max-width: 300px;
  position: sticky;
  align-self: flex-start;
  top: calc(4.5rem + 2px);
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
      
@media (min-width: 800px) {
  .hamburger-content {
    display: none;
  }
}

@media (max-width: 800px) {
  .planner-layout {
    flex-direction: column;
    padding: 0.5rem;
  }
  
  .hamburger {
    display: block;
    cursor: pointer;
  }
  
  .hamburger-content {
    background-color: var(--color-background-muted);
    padding: 1rem;
    border-bottom: 2px solid var(--color-border);
    position: fixed;
    top: calc(3.5rem);
    width: 100%;
    box-sizing: border-box;
    z-index: 9998;
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
