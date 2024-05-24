<script lang="ts" setup>
    import { ref } from "vue";
    import Button from '#shared/button/button.vue';
    import Input from '#shared/input/input.vue';
    import "./calbackForm.scss"
    
</script>


<template>

      <form class="form" >
        <div class="form__head">
          <h1>Заполните форму и я свяжусь с вами</h1>
        </div>
        <div class="form__body">
          <Input name="name" label="Как к вам обращаться?" placeholder="Например: Константин Викторович" />
          <Input name="contact" label="Как с вами связаться?" placeholder="Например: тг: @konstantin" />
        </div>
        <div class="form__action">
          <Button buttonText="Отправить конткты"></Button>
        </div>
      </form>


</template>

    

