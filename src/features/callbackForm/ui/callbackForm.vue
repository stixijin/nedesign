<script lang="ts" setup>
    import { ref } from "vue";
    import Button from '#shared/button/button.vue';
    import InputName from '#shared/input/inputName.vue';
    import InputTg from '#shared/input/inputName.vue';
    import "./calbackForm.scss"


    const name = ref('');
    const contact = ref('');

    const onSubmit = async () => {
      const fullMassege = "Кто-то заполнил форму." + "%0A" + "Имя: "  + name.value  + "%0A" + "Котнакт: " + contact.value
      const url = "https://api.telegram.org/bot6961302274:AAGfkdPaC5c5xeVQFooixE9vTrvt3-V-F1E/sendMessage?chat_id=5527874714&&text=" + fullMassege;
      const res = await fetch(url, {
        method: 'POST'
      });
      
    }
    
</script>



<template>

      <form class="form" @submit="onSubmit" >
        <div class="form__head">
          <h1>Заполните форму и я свяжусь с вами</h1>
        </div>
        <div class="form__body">
          <InputName v-model="name" name="name" label="Как к вам обращаться?" placeholder="Например: Константин Викторович" />
          <InputTg  v-model="contact" name="contact" label="Как с вами связаться?" placeholder="Например: тг: @konstantin" />
        </div>
        <div class="form__action">
          <div class="test">
          </div>
          <Button type="submit" buttonText="Отправить конткты"></Button>
        </div>
      </form>


</template>

    

