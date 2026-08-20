<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/"><img alt="logo" class="d-inline-block align-text-top" src="@/assets/logo.png" width="40" height="40" /></RouterLink>
      <!-- Visibility for certain navbar items -->
    </div>
  </nav>

  <RouterView class="container" />
</template>
