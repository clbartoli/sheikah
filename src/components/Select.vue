<template>
<div class="select-box">
  <div :class="`select ${active ? 'active' : ''}`" @click="showOptions">
    <div class="selected">
      <div class="label">
        <span class="primary">{{ primaryText }}</span>
        <span class="secondary">{{ secondaryText }}</span>
      </div>
      <font-awesome-icon class="icon" icon="sort-down" />
    </div>
  </div>
  <div :class="`options ${active ? 'active': ''}`">
    <div v-for="option in options" :key="option.value" :class="`option ${option.value=== value ? 'selected':''}`" @click="() => selectOption(option)">
      <span class="primary">{{ option.primaryText}}</span>
      <span class="value">{{ option.secondaryText }}</span>
    </div>
  </div>
  <select v-model="value" class="hidden">
    <option v-for="option in options" :value="option.value" :key="option.value">
      {{ option.value }}
    </option>
  </select>
</div>
</template>

<script>
export default {
  name: 'Select',
  data () {
    return {
      value: '',
      primaryText: '',
      secondaryText: '',
      active: false,
    }
  },
  watch: {
    value (value) {
      this.$emit('input', value)
    },
  },
  beforeMount () {
    const defaultOption = this.options.find(option => option.selectedByDefault) || this.options[0]
    this.selectOption(defaultOption)
  },
  props: {
    options: Array,
  },
  methods: {
    showOptions () {
      this.active = !this.active
    },
    selectOption (option) {
      this.value = option.value
      this.primaryText = option.primaryText
      this.secondaryText = option.secondaryText
      this.active = false
    },
  },
}
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}

.select-box {
  display: flex;
  flex-direction: column;
  user-select: none;
  height: 42px;

  .select {
    z-index: 1;
    min-height: 42px;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #777;
    display:flex;
    min-width: 120px;
    padding: 0 12px 0 16px;

    &.active,
    &:hover {
      border-color: #1a6cfb;
    }

    .selected {
      align-items: baseline;
      display: flex;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;

      .label {
        display: flex;
        justify-content: space-between;
        padding-right: 16px;
        width: 100%;

        .primary {
          margin-right: 16px;
        }
      }
    }
  }

  .options {
    z-index: 1;
    display: none;
    &.active {
      display: block;
    }
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-radius: 0 0 4px 4px;
    border-right: 1px solid #ccc;

    .option {
      align-items: center;
      background: #fff;
      box-sizing: border-box;
      color: #777;
      display:flex;
      height: 32px;
      justify-content: space-between;
      padding: 0 16px;
      width: 100%;

      &:hover {
        color: #1a6cfb;
      }

      &.selected {
        background-color: #f9f9f9;
      }
    }
  }
}
</style>