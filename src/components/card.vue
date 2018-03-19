<template>
  <div>
    <p class="card">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text'],
};
</script>

<style>
.card {
  padding: 0 10px;
  color: #000000;
}
</style>
