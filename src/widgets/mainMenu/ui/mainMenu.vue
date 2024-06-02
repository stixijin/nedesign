<script setup>
import MainLogo from "#shared/mainLogo/mainLogo.vue";
import AreaSwitcher from "#features/areasSwitcher/ui/areaSwitcher.vue"
import './mainMenu.scss';
import Modal from "#shared/modal/modal.vue";
import Button from "#shared/button/button.vue";
import CallbackForm from "#features/callbackForm/ui/callbackForm.vue";
import { ref } from 'vue';


let modalState = ref(false);


const submitCallbackForm = () => {
    setTimeout(() => {
        modalState.value = false;
    }, 1000)
}
const updateModalState = (state) => {
    modalState.value = state;
}


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
        <p class="test">{{ modalState }}</p>
        <div class="mainMenu__end">
            <Modal @updateState="updateModalState" v-model="modalState" closePos="top-left" name="callback">
                <template v-slot:action>
                    <Button buttonColor="primary" buttonText="Обратная связь"></Button>
                </template>
                
                <template v-slot:body>
                    <CallbackForm @succesSubmit="submitCallbackForm"></CallbackForm>
                </template>
            </Modal>
        </div>
    </nav>
</template>

