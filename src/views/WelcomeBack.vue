<template>
  <div data-test="welcome-back" class="welcome-back">
    <div class="layout">
      <div class="bar">
        <p class="title">Welcome Back</p>
        <Settings :settings="settings" :showText="true" />
      </div>

      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Settings from '@/components/Settings.vue'

export default {
  name: 'WelcomeBack',
  components: {
    Settings,
  },
  data() {
    return {
      settings: [
        {
          label: 'Quit app',
          action: () => window.close(),
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.welcome-back {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .layout {
    height: 400px;
    width: 600px;
    display: grid;
    grid-template-columns: 160px 440px;
    box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);

    .bar {
      background: $sheikah-gradient;
      padding: 20px;
      justify-content: space-between;
      display: flex;
      flex-direction: column;

      .title {
        font-size: 24px;
        color: $white;
        border: none;
      }
    }

    .content {
      padding: 30px;
    }
  }
}
</style>
