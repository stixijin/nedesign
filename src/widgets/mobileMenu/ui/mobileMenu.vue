<script setup>
import './mobileMenu.scss';
import MenuItem from "#shared/menuItem/menuItem.vue";
import Modal from '#shared/modal/modal.vue';
import MainLogo from "#shared/mainLogo/mainLogo.vue";
import CallbackFormModal from "#features/callbackForm/ui/callbackFormModal.vue";
import AreaSwitcher from "#features/areasSwitcher/ui/areaSwitcher.vue"

const props = defineProps({
    menuItems: Array, // Принимаем массив объектов в качестве пропса
    logoLink: String,
    logoArea: String,
    logoName: String,
    currentLink: String
});


</script>



<template>
    <nav class="bottomBar">
        <MenuItem v-for="(menuItem, index) in menuItems" :key="index" :icon="menuItem.icon" :href="menuItem.href"
            :type="menuItem.type" :text="menuItem.text" />

        <Modal name="mobileMenu" :desctop="false"
            :mobileBodyPadding=false
            mobileCloseSide='left'
            mobileClosePosition='start'
            mobilePositionX='right'
            mobilePositionY='top'
            mobileHeight='full'
            mobileWidth='full'
            mobileTransition='depRight'
        >
            <template v-slot:action>
                <MenuItem icon="menu" type="mobile" text="Меню" href="javascript:;" />
            </template>
            <template v-slot:header>
                <div class="mobailMenu__header">
                        <MainLogo :currentLink='currentLink' :logoLink='logoLink' :logoArea='logoArea' />
                        <AreaSwitcher :logoLink='logoLink' />
                </div>
            </template>
            <template v-slot:body>
                    <div class="mobailMenu__body">
                        <slot name="body"></slot>
                    </div>  
            </template>
            <template v-slot:footer>
                <div class="mobailMenu__footer">
                        <CallbackFormModal></CallbackFormModal>
                    </div>
            </template>
        </Modal>
    </nav>
</template>
