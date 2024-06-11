<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import FeatherIcon from 'vue-feather';
import "./menuItem.scss";


interface MenuItemProps {
    href: string;
    icon: string;
    text: string;
    type: 'desctop' | 'mobile';
}

const props = defineProps<MenuItemProps>();

const currentUrl = ref('');

onMounted(() => {
    currentUrl.value = window.location.pathname;
});

const isSelected = computed(() => {
    const hostUrl = props.href + '/';
    return props.href === currentUrl.value || hostUrl === currentUrl.value;
});
</script>



<template>

    <a v-if="type === 'mobile'" :class="['menuItem menuItem_mobile', { selected: isSelected }]" :href="href">
        <div class="menuItem__icon menuItem__icon_mobile">
            <feather-icon :type="icon" />
        </div>
        <div class="menuItem__label menuItem__label_mobile">
            <span class="menuItem__label menuItem__label_desctop">{{ text }}</span>
        </div>
    </a>

    <a v-if="type === 'desctop'" :class="['menuItem menuItem_desctop', { selected: isSelected }]" :href="href">
        <div class="menuItem__icon menuItem__icon_desctop">
            <feather-icon :type="icon" />
        </div>
        <div class="menuItem__label menuItem__label_desctop">
            <span>{{ text }}</span>
        </div>
    </a>



</template>
