<template>
  <InputForm
    v-model="value"
    :options="{
      currency: 'EUR',
      hideCurrencySymbolOnFocus: false,
      hideGroupingSeparatorOnFocus: false,
      hideNegligibleDecimalDigitsOnFocus: false,
    }"
  ></InputForm>

</template>

<script>
import InputForm from "@/components/tester/InputCash/InputForm.vue";

export default {
  name: "App",
  components: {
    InputForm
},
  data() {
    return {
      value: 1234,
    };
  },
};
</script>

<style>

</style>

