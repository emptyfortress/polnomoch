<template lang="pug">
h2 Hello!
q-list
	q-item(v-for="n in 5" :key="n" clickable v-ripple)
		q-item-section fuck {{n}}
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
