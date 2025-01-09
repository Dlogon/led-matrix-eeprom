// Taken from: https://github.com/florian-lefebvre/portfolio/blob/v4/nuxt/composables/useWindowEventListener.ts

export default function (event: string, listener: any) {
  onBeforeMount(() => {
    window.addEventListener(event, listener);
  });

  onMounted(() => {
    listener();
  });

  onBeforeUnmount(() => {
    window.removeEventListener(event, listener);
  });
}
