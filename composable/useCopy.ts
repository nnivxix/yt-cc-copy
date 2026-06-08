import { ref } from "vue";

export const useCopy = () => {
  const copied = ref(false);

  async function copy(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 3000);
      return true;
    } catch {
      return false;
    }
  }

  return { copied, copy };
};
