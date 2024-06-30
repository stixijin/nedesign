<script lang="ts" setup>
import "./advantages.scss";


</script>


<template>

    <li class="advantage">
        <div class="advantage__header">
            <h3>
                <slot name="title"></slot>
            </h3>
        </div>
        <div class="advantage__body">
            <p>
                <slot name="body"></slot>
            </p>
        </div>
    </li>

</template>