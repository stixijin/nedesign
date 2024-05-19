<script setup>
    import { ref } from 'vue';
    const open = ref(false);
    import "./areaSwitcher.scss";
</script>

<template>
<button class="areaSwitcher" @click="open = !open">
        <slot name="icon"></slot>
</button>

<ul v-if="open" class="areaList">
    <slot name="areaList"></slot>
</ul>
</template>