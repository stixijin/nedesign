<script lang="ts" setup>
    import { ref } from "vue";
    import Button from '#shared/button/button.vue';
    import InputName from '#shared/input/inputName.vue';
    import "./calbackForm.scss";
    import useVuelidate from "@vuelidate/core";

    const receiveName = (valueName: string) => {
      name.value = valueName;
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
    ]);

    
    const succesSubmit = () => {
      emits('succesSubmit');
    }

    const onSubmit = async function (v) {
      v.$touch();
      if(!v.$invalid){
        const fullMassege =  "Кто-то заполнил форму." + "%0A" + "Имя: "  + name.value + "%0A" + "Котнакт: " + email.value;
        const url = "https://api.telegram.org/bot6961302274:AAGfkdPaC5c5xeVQFooixE9vTrvt3-V-F1E/sendMessage?chat_id=5527874714&&text=" + fullMassege;
        await fetch(url, {
        method: 'POST'
      });
        formSubmittal.value = 'succesful';
        succesSubmit();
      }else{
        formSubmittal.value = 'error';
      }
    }




</script>



<template>
      <div v-if="formSubmittal !== 'succesful'">
        <form class="form" @submit.prevent="onSubmit(v$)" >
          <div class="form__head">
            <h1>Заполните форму и я свяжусь с вами</h1>
          </div>
          <div class="form__body">
            <InputName @update:value="receiveName" placeholder="Например: Константин Константинович" name="name" label="Как к вам обращаться?"></InputName>
          </div>

          <div class="form__action">
            <Button type="submit" buttonText="Отправить конткты"></Button>
            <transition name="fade">         
            <div v-if="formSubmittal == 'error'" class="form__result form__result_error">
              <p>
                Форма не отправилась из-за ошибок в полях!
              </p>
            </div>
            </transition>
          </div>
        </form>
      </div>
      <transition name="fade">         
        <div v-if="formSubmittal == 'succesful'">
        <div class="form__result form__result_succesful">
              <p>
                Форма успешно отправлена!
              </p>
            </div>
      </div>
      </transition>

</template>

    

