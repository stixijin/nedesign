<script setup>
import MainLogo from "#shared/mainLogo/mainLogo.vue";
import AreaSwitcher from "#features/areasSwitcher/ui/areaSwitcher.vue"
import callbackFormModal from "#features/callbackForm/ui/callbackFormModal.vue"
import './mainMenu.scss';

const props = defineProps({
    logoLink: String,
    logoArea: String,
    logoName: String,
    currentLink: String
})

</script>



<template>
    <nav class="mainMenu">
        <div class="mainMenu__logo">
            <MainLogo :currentLink='currentLink' :logoLink='logoLink' :logoArea='logoArea' />
            <AreaSwitcher :logoLink='logoLink'/>
        </div>
        <div class="mainMenu__content">
            <slot name="menuContent"></slot>
        </div>
        <div class="mainMenu__end">
            <callbackFormModal></callbackFormModal>
        </div>
    </nav>
</template>

