<template>
  <AppBtn
    :to="rpath('/about/meet-the-team/')"
    color="medium-emphasis"
    text="team"
    variant="text"
    @click="sweClick('app-bar', 'team', name)"
  />
</template>

<script setup>
  const { name } = useRoute()
</script>
