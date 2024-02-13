// useIntersectionObserver.ts

import { ref, onMounted, onUnmounted } from 'vue';

const useIntersectionObserver = (selector: string, delay: number = 200) => {
  const elements = ref<NodeListOf<HTMLElement> | null>(null);

  const observer = ref<IntersectionObserver | null>(null);

  const observe = () => {
    if (elements.value && observer.value) {
      elements.value.forEach((element) => {
        observer.value!.observe(element);
      });
    }
  };

  const disconnect = () => {
    if (observer.value) {
      observer.value.disconnect();
    }
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const targetElement = entry.target as HTMLElement;

      if (entry.isIntersecting) {
        setTimeout(() => {
          targetElement.classList.add('slide-active');
        }, delay);
      } else {
        targetElement.classList.remove('slide-active');
      }
    });
  };

  onMounted(() => {
    elements.value = document.querySelectorAll(selector);

    observer.value = new IntersectionObserver(handleIntersection);
    observe();
  });

  onUnmounted(() => {
    disconnect();
  });

  return {
    observe,
    disconnect,
  };
};

export default useIntersectionObserver;
