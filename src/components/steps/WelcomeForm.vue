<template>
  <div>
    <NavigationCard
      v-if="sessionId"
      title="Ey, listen!"
      :previousStep="previousStep"
      :nextStep="nextStep"
      previousText="Back"
      nextText="Let's do it"
    >
      <InformativeContent :subtitle="subtitle" :text="text" />
    </NavigationCard>
    <Card
      v-else
      class="welcome-card"
      :width="600"
      :height="440"
      previousText="Back"
      nextText="Start"
    >
      <template v-slot:header>
        <div class="header">
          Ey, listen!
        </div>
      </template>
      <InformativeContent :subtitle="subtitle" :text="text" />
      <div class="container">
        <router-link data-test="do-it" class="router-link" to="/ftu/seed-type-selection">
          Let's do it
        </router-link>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/card/Card'
import NavigationCard from '@/components/card/NavigationCard'
import InformativeContent from '@/components/card/InformativeContent'

export default {
  name: 'WelcomeForm',
  components: {
    Card,
    NavigationCard,
    InformativeContent,
  },
  data() {
    return {
      subtitle:
        'This assistant will guide you through the process of creating your own Witnet wallet.',
      text:
        'A wallet is an app that keeps your credentials safe and lets you interface with the Witnet blockchain in many ways: from transferring Wit to someone else to creating smart contracts.',
    }
  },
  computed: {
    sessionId() {
      const walletInfosLength = this.$store.state.wallet.walletInfos.length
      return walletInfosLength > 0
    },
  },
  methods: {
    previousStep() {
      this.$router.push('/welcome-back/wallet-list')
    },
    nextStep() {
      this.$router.push('/ftu/seed-type-selection')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.header {
  align-items: center;
  background: $sheikah-gradient;
  display: flex;
  font-size: 24px;
  font-weight: 100;
  height: 100px;
  padding: 0 24px;
  color: $grey-0;
}
</style>
