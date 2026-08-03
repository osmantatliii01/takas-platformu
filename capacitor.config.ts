import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.swapify.app',
  appName: 'Swapify',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
