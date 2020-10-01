<template>
  <NavigationCard
    data-test="download-file"
    title="Export your token claim receipt"
    :next-step="nextStep"
    next-text="Continue"
    :disabled-next-button="disabledNextButton"
  >
    <p class="text">
      Almost ready! A claiming receipt has been created and it's being approved in order to complete the claiming process.
      It is recomended to export the claiming reciept since it is an evidence of your claiming process, you can fince it
      below: </p
    ><div class="file-container">
      <el-button
        type="primary"
        size="small"
        class="download-btn"
        data-test="download-claiming"
        @click="exportFile"
      >
        Export my claim file...
      </el-button>
      <a
        ref="file"
        :href="exportFileLink"
        :download="`${email}-witnet-tokens-claim.json`"
        style="display:none"
      ></a>
      <div class="file">
        <p class="name">
          <i class="el-icon-document"></i>
          <span class="text"> {{ `${email}-witnet-tokens-claim.json` }} </span>
        </p>
      </div>
    </div>
    <p>
      You will receive a confirmation email when the file is been approved.
    </p>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import { mapState } from 'vuex'

export default {
  name: 'DownloadFile',
  components: {
    NavigationCard,
  },
  data() {
    return {
      subtitle: 'Download your claiming file,',
      disabledNextButton: true,
    }
  },
  computed: {
    ...mapState({
      claimingProcessCompleted: state => {
        return state.wallet.claimingProcessState
      },
      exportFileLink: state => {
        return state.wallet.exportFileLink
      },
      email: state => state.wallet.claimingFileInfo.info.data.emailAddress,
    }),
  },
  beforeCreate() {
    this.$store.dispatch('getClaimingInfo')
    this.$store.dispatch('saveCompletedProcess')
  },
  methods: {
    exportFile() {
      this.$refs.file.click()
      this.disabledNextButton = false
    },
    nextStep() {
      this.$router.push('/claiming/countdown')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.text {
  margin-bottom: 16px;
}

.file-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .file {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: 34px;
    justify-content: center;

    .el-icon-document {
      margin-right: 8px;
      padding-left: 4px;
    }

    .name {
      border: 1px solid transparent;
      border-radius: 3px;
      font-size: 14px;
      margin: 16px 16px 0 0;

      &:hover {
        background-color: #f5f7fa;
        border: 1px solid #f5f7fa;
        transition: color 0.3s;

        .text {
          color: $purple-6;
        }
      }
    }
  }

  .download-btn {
    width: 225px;
  }
}
</style>
