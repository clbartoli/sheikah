<template>
  <input
    @keydown.enter.esc.prevent="toogleGoNextItem"
    v-model="inputValue"
    :class="`input ${getClass(type)}`"
    :placeholder="placeholder"
    :type="nativeType"
  />
</template>

<script>
export default {
  name: 'Input',
  props: {
    nativeType: String,
    placeholder: String,
    type: [Number, String],
    value: {
      required: false,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(inputValue) {
        this.$emit('input', inputValue)
      },
    },
  },
  methods: {
    toogleGoNextItem() {
      this.$emit('go-next')
    },
    getClass(className) {
      const classes = ['big', 'underlined']
      return classes.includes(className) ? className : 'default'
    },
  },
  watch: {
    inputValue(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
.input {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;

  &.big {
    border: $input_big-border;
    border-radius: $input_big-border-radius;
    min-height: 80px;
    transition: all 0.1s ease;
    width: $input_big-width;

    &:hover,
    &:focus {
      border: $input_big-hover-border;
      box-shadow: $input_big-hover-box-shadow;
      outline: 0;
      outline-color: transparent;
      outline-style: none;
    }
  }

  &.default {
    text-align: center;
    background-color: $white;
    border-radius: 4px;
    border: 1px solid $grey-1;
    color: $grey-4;
    font-size: 16px;
    line-height: 32px;
  }

  &.underlined {
    border: 0;
    border-bottom: $input_underlined-border;
    border-radius: 0;
    color: $input_underlined-color;

    &:focus,
    &:hover {
      box-shadow: none;
      outline: none;
    }
  }
}
</style>
