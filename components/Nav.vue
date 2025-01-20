<script setup lang="ts">
const route = useRouter();

const navList = ref([
  { title: "Agenda", path: "/agenda", navigating: false },
  { title: "Events", path: "/events", navigating: false },
  { title: "Tracks", path: "/tracks", navigating: false },
])

route.beforeEach((to, from, next) => {
  navList.value.forEach((item) => {
    item.navigating = to.path === item.path;
  });
  next();
});

route.afterEach(() => {
  navList.value.forEach((item) => {
    item.navigating = false;
  });
});
</script>

<template>
  <Panel class="nav">
    <ul class="nav-list">
      <li v-for="item in navList" :key="item.title" :class="{ active: $route.path === item.path }">
        <NuxtLink :to="item.path">
          <span>{{ item.title }}</span> <Spinner v-if="item.navigating" color="var(--color-text-muted)" :size="16"/></NuxtLink>
          
      </li>
    </ul>
  </Panel>
</template>

<style scoped>
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list > li {
  width: 100%;
}

.nav-list > li > a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-muted);
  padding: 0.4rem 1rem;
  left: -1rem;
  width: calc(100%);
  position: relative;
}

.nav-list > li.active > a {
  color: var(--color-text);
  font-weight: 600;
  background-color: var(--color-background-muted);
}

.nav-list > li > a:hover {
  background-color: var(--color-background-muted);
}

</style>