<template>
  <div class="send">
    <div v-if="generatedTransaction" class="transaction-info">
      <div class="scroll">
        <div class="row">
          <p class="entry">Amount</p>
          <p class="value">{{ generatedTransaction.amount }} Wit</p>
        </div>
        <div class="row">
          <p class="entry">Type</p>
          <p class="value">{{ generatedTransaction.type }}</p>
        </div>
        <div class="row">
          <p class="entry">To</p>
          <p class="value">{{ generatedTransaction.to }}</p>
        </div>
        <div class="row">
          <p class="entry">Fee</p>
          <p class="value">{{ generatedTransaction.fee }} uWit/B</p>
        </div>
        <div v-if="isAdvancedVisible" class="row">
          <p class="entry">Inputs</p>
          <p></p>
          <div class="column">
            <p class="address value" v-for="input in generatedTransaction.inputs" :key="input">
              {{ input }}
            </p>
          </div>
        </div>
        <div v-if="isAdvancedVisible" class="row">
          <p class="entry">Outputs</p>
          <p></p>
          <div class="column">
            <p
              class="address value"
              v-for="output in generatedTransaction.outputs"
              :key="output.pkh"
            >
              <span>PKH: {{ output.pkh }}</span>
              <span>Amount: {{ output.value }}</span>
            </p>
          </div>
        </div>

        <div v-if="isAdvancedVisible" class="row">
          <p class="entry">Bytes</p>
          <p></p>
          <div class="column">
            <p class="address value">{{ generatedTransaction.bytes }}</p>
          </div>
        </div>
      </div>
      <div class="confirm-advance-btn">
        <p v-if="isAdvancedVisible" @click="toggleAdvanceOptions" class="link">Show less</p>
        <p v-else @click="toggleAdvanceOptions" class="link">
          Show advanced options
        </p>
        <span slot="footer" class="dialog-footer">
          <Button :onClick="closeDialog" type="secondary" class="button">Cancel</Button>
          <Button :onClick="confirmTransaction" type="primary" class="button">Confirm</Button>
        </span>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="label">
          <label class for>Address</label>
        </div>
        <Input
          data-test="send-recipient-address"
          v-model="form.address"
          placeholder="Recipient address"
        />
      </div>

      <div class="row">
        <div class="label">
          <label class for>Label</label>
        </div>
        <Input v-model="form.label" />
      </div>
      <div class="row">
        <div class="label">
          <label class for>Amount</label>
        </div>
        <InputNumber v-model="form.amount" />
      </div>
      <div class="row">
        <div class="label">
          <label class for>Fee</label>
        </div>
        <Select v-model="form.fee" :options="form.options" />
      </div>
      <div class="submit">
        <Button
          @keydown.enter.esc.prevent="createVTT"
          data-test="sign-send-btn"
          :onClick="createVTT"
          type="primary"
        >
          Sign and send
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button'
import Input from './Input'
import InputNumber from './InputNumber'
import Select from './Select'

export default {
  name: 'send',
  components: {
    Button,
    Input,
    InputNumber,
    Select,
  },
  data() {
    return {
      isAdvancedVisible: false,
      showModal: false,
    }
  },
  props: {
    form: Object,
  },
  computed: {
    generatedTransaction() {
      return this.$store.state.wallet.generatedTransaction
    },
  },
  methods: {
    toggleAdvanceOptions() {
      this.isAdvancedVisible = !this.isAdvancedVisible
    },
    confirmTransaction() {
      this.$store.dispatch('sendTransaction')
      this.closeDialog()
    },
    createVTT() {
      this.$emit('create-VTT', this.form)
    },
    closeDialog() {
      this.isAdvancedVisible = false
      this.$emit('close')
    },
  },
  watch: {
    generatedTransaction(value) {
      if (value) {
        this.showModal = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.transaction-info {
  overflow-y: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  .entry {
    font-weight: bold;
    font-size: 16px;
    color: $grey-6;
  }
  .value {
    max-width: 200px;
    font-size: 16px;
    font-weight: 400;
  }
  .row {
    padding: 16px 10px;
    width: 300px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $grey-1;
    .column {
      display: flex;
      flex-direction: column;
    }
  }
  .scroll {
    overflow-y: auto;
  }
  .confirm-advance-btn {
    margin: 16px 0px 32px 0px;
    width: 300px;
    text-align: right;
    .link {
      padding: 24px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.send {
  margin: 0px 32px 32px 32px;
  .row {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;

    .label {
      min-width: 64px;
      margin-right: 24px;
      margin-top: 8px;
      text-align: right;
    }
    .input {
      text-align: left;
      padding-left: 16px;
    }
  }
  .submit {
    width: 100%;
    text-align: right;
    padding-top: 10px;
  }
}

.dialog-footer {
  margin-top: 16px;
  .button {
    margin-right: 15px;
  }
}
</style>
