<script setup>
import { ref } from "vue";
import Modal from "#shared/modal/modal.vue";
import Button from "#shared/button/button.vue";
import CallbackForm from "./callbackForm.vue";


let modalState = ref(false);
let stateError = ref(false);


const submitCallbackForm = () => {
    setTimeout(() => {
        modalState.value = false;
    }, 1000)
}
const updateModalState = (state) => {
    modalState.value = state;
}

const showError = () => {
    stateError.value = true;
    setTimeout(() => {
        stateError.value = false;
    }, 1000)
}

</script>


<template>

    <Modal @updateState="updateModalState" v-model="modalState" 
    name="callback"
    desctopHeight="fit"
    desctopWidth="fit"
    desctopCloseSide="left"
    desctopClosePosition="start"
    desctopPositionX="center"
    desctopPositionY="center"
    desctopTransition="fade"
    :desctopBodyPadding=false
    mobileHeight="fit"
    mobileWidth="full"
    mobileCloseSide="top"
    mobileClosePosition="end"
    mobilePositionX="center"
    mobilePositionY="bottom"
    mobileTransition="depBottom"
    :mobileBodyPadding=false
    >
        <template v-slot:action>
            <Button buttonColor="primary" buttonText="Обратная связь"></Button>
        </template>

        <template v-slot:body>
            <CallbackForm @succesSubmit="submitCallbackForm" @errorSubmit="showError"></CallbackForm>
        </template>
    </Modal>



</template>