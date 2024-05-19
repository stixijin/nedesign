<script setup>
    import { ref } from 'vue';
    const open = ref(false);
    import "./areaSwitcher.scss";
</script>

<template>
<button class="areaSwitcher" @click="open = !open">
        <slot name="icon"></slot>
</button>

<transition name="fade">
    <ul v-if="open" class="areaList">
        <slot name="areaList"></slot>
    </ul>
</transition>

</template>

<style>
    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
    opacity: 0;
    }
</style>