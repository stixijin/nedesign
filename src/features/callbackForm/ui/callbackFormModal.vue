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

    <Modal @updateState="updateModalState" v-model="modalState" closePos="top-left" name="callback">
        <template v-slot:action>
            <Button buttonColor="primary" buttonText="Обратная связь"></Button>
        </template>

        <template v-slot:body>
            <CallbackForm @succesSubmit="submitCallbackForm" @errorSubmit="showError"></CallbackForm>
        </template>
    </Modal>



</template>