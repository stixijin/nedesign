<script lang="ts" setup>
import { ref } from "vue";
import Button from '#shared/button/button.vue';
import Icon from '#tokens/icons/icon.vue';
import InputName from '#shared/input/inputName.vue';
import InputTg from '#shared/input/inputTg.vue';
import "./calbackForm.scss";
import useVuelidate from "@vuelidate/core";

const receiveName = (newValue: string) => {
  name.value = newValue;
}
const receiveTg = (newValue: string) => {
  tg.value = newValue;
}

// Поля формы
let name = ref('');
let email = ref('');
let tg = ref('');
let phone = ref('');
let description = ref('');
let formSubmittal = ref('empty');

const v$ = useVuelidate();


const emits = defineEmits([
  'succesSubmit',
  'errorSubmit'
]);


const succesSubmit = () => {
  emits('succesSubmit');
}
const errorSubmit = () => {
  emits('errorSubmit');
}

const onSubmit = async function (v) {
  v.$touch();
  if (!v.$invalid) {
    const fullMassege = "Кто-то заполнил форму." + "%0A" + "Имя: " + name.value + "%0A" + "Котнакт: " + tg.value;
    const url = "https://api.telegram.org/bot6961302274:AAGfkdPaC5c5xeVQFooixE9vTrvt3-V-F1E/sendMessage?chat_id=5527874714&&text=" + fullMassege;
    await fetch(url, {
      method: 'POST'
    });
    formSubmittal.value = 'succesful';
    succesSubmit();
  } else {
    formSubmittal.value = 'error'
    errorSubmit();
    setTimeout(() => {
      formSubmittal.value = 'empty'
    }, 1500)
  }
}




</script>



<template>
  <div>
      <form v-show="formSubmittal !== 'succesful'" class="form" @submit.prevent="onSubmit(v$)">
        <div class="form__head">
          <h1>Заполните форму</h1>
        </div>
        <div class="form__body">
          <InputName @update:value="receiveName" placeholder="Например: Константин Константинович" name="name"
            label="Как к вам обращаться?"></InputName>
          <InputTg @update:value="receiveTg" placeholder="Например: @konstantin" name="telegram" label="Ваш телеграм">
          </InputTg>
        </div>

        <div class="form__action">
          <Button :class="{ shake: formSubmittal == 'error' }" type="submit" buttonText="Отправить конткты"></Button>
        </div>
      </form>


      <div v-show="formSubmittal == 'succesful'">
        <div class="form__result">
          <h1>Форма успешно отправлена!</h1>
          <Icon name="succesfulSend"></Icon>
        </div>
      </div>
  </div>


</template>
