<script lang="ts" setup>
    import { ref, reactive } from "vue";
    import Button from '#shared/button/button.vue';
    import InputName from '#shared/input/inputName.vue';
    import "./calbackForm.scss";




        // Поля формы
    let name = ref('');
    let email = ref('');
    let tg = ref('');
    let phone = ref('');
    let description = ref('');

    const receiveName = (valueName: string) => {
      name.value = valueName;
    }


    const onSubmit = async function () {
      const fullMassege =  "Кто-то заполнил форму." + "%0A" + "Имя: "  + name.value + "%0A" + "Котнакт: " + email.value;
      const url = "https://api.telegram.org/bot6961302274:AAGfkdPaC5c5xeVQFooixE9vTrvt3-V-F1E/sendMessage?chat_id=5527874714&&text=" + fullMassege;
        await fetch(url, {
        method: 'POST'
        
      });
    }


    
</script>



<template>

      <form class="form" @submit.prevent="onSubmit" >
        <div class="form__head">
          <h1>Заполните форму и я свяжусь с вами</h1>
        </div>
        <div class="form__body">
          <InputName v-model="name" @updateValue="receiveName" placeholder="Например: Константин Константинович" name="name" label="Как к вам обращаться?"></InputName>
          <p class="test">{{ name }}</p> 
        </div>

        <div class="form__action">
          <div class="test">
          </div>
          <Button type="submit" buttonText="Отправить конткты"></Button>
        </div>
      </form>


</template>

    

