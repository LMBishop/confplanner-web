<script setup lang="ts">
import { ref } from 'vue'
import { FetchError } from 'ofetch'
import Input from '~/components/Input.vue'

definePageMeta({
  layout: 'none'
})

const isLoading = ref(false)
const error = ref("")

const config = useRuntimeConfig()
const headers = useRequestHeaders(['cookie'])

const handleSubmit = async (e: Event) => {
  const target = e.target as HTMLFormElement;
  const formData = new FormData(target);

  isLoading.value = true
  error.value = ""
  
  try {
    await $fetch(config.public.baseURL + '/register', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: headers,
      server: false,
    });
    
    navigateTo("/login");
  } catch (e: any) {
    if ((e as FetchError).data) {
      error.value = e.data.message
    } else {
      error.value = "An unknown error occurred"
    }
  }
  
  isLoading.value = false
}

</script>

<template>
  <div class="auth-container">
    <div class="auth-header">
      <h2 class="auth-title">Register</h2>

      <div v-if="error" class="auth-error">
        {{ error }}
      </div>
    </div>

    <div class="auth-body">
      <Panel>
        <form class="auth-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="username" class="form-label">
              Username
            </label>
            <div class="form-input-container">
              <Input id="username" name="username" required />
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">
              Password
            </label>
            <div class="form-input-container">
              <Input id="password" name="password" type="password" autocomplete="current-password" required />
            </div>
          </div>


          <div class="form-submit">
            <Button type="submit" :loading="isLoading">
              Register
            </Button>
          </div>
        </form>
      </Panel>
    </div>

    <div class="form-footer">
      <NuxtLink to="/login" class="register-link">
        Sign in
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  background-color: var(--color-background-muted);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.auth-header {
  margin: 0 auto;
  width: 100%;
  max-width: 28rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
}

.auth-title {
  margin-top: 1.5rem;
  font-size: 1.875rem;
  font-weight: 800;
  color: #1f2937; 
}

.auth-body {
  margin-top: 2rem; 
  margin: 0 auto;
  width: 100%;
  max-width: 28rem; 
}

.auth-form {
  display: grid;
  gap: 1.5rem; 
}

.auth-error {
  color: var(--color-error);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  display: block;
  font-size: 0.875rem; 
  font-weight: 500;
  color: #374151; 
}

.form-input-container {
  margin-top: 0.25rem; 
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  max-width: 28rem;
}

.register-link {
  font-size: var(--text-small); 
  font-weight: 500; 
}

.form-submit {
  display: flex;
}

input[name="username"] {
  text-transform: lowercase;
}
</style>
