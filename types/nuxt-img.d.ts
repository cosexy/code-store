// Define the enum with possible values for the provider attribute
enum ProviderType {
  Unsplash = 'unsplash',
  Pexels = 'pexels',
  Custom = 'custom'
}

// Declare the custom type for the provider attribute using the enum
declare module 'vue/types/vue' {
  interface NuxtImgProps {
    provider?: ProviderType;
  }
}
