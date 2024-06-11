<script setup>
import "./menuGroup.scss";
import MenuItem from "#shared/menuItem/menuItem.vue";

const props = defineProps({
  groupItems: Array // Принимаем массив объектов в качестве пропса
});

</script>


<template>
    <div class="blockMenu">
        <MenuItem v-for="(groupItem, index) in groupItems" :key="index" :icon="groupItem.icon" :href="groupItem.href" :type="groupItem.type" :text="groupItem.text" />  
    </div>
</template>


