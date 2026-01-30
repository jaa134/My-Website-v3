<script setup lang="ts" generic="T extends { id: string }">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { PropType, ref } from 'vue';

  import BasicCard from '@/components/common/BasicCard.vue';
  import SelectionMenu from '@/components/common/SelectionMenu.vue';

  /* Props ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const props = defineProps({
    options: {
      type: Array as PropType<T[]>,
      required: true,
      validator: (value: T[]) => value.length > 0,
    },
    navigationHeight: {
      type: String,
      default: undefined,
    },
    minNavigationHeight: {
      type: String,
      default: undefined,
    },
    maxNavigationHeight: {
      type: String,
      default: undefined,
    },
    contentHeight: {
      type: String,
      default: undefined,
    },
    minContentHeight: {
      type: String,
      default: undefined,
    },
    maxContentHeight: {
      type: String,
      default: undefined,
    },
  });

  /* Selection ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const selectedOption = ref<T>(props.options[0]!);
</script>

<template>
  <div class="selection-display">
    <SelectionMenu
      v-model="selectedOption"
      :options="options"
      :height="navigationHeight"
      :min-height="minNavigationHeight"
      :max-height="maxNavigationHeight"
    />
    <BasicCard
      :height="contentHeight"
      :min-height="minContentHeight"
      :max-height="maxContentHeight"
    >
      <slot :selection="selectedOption"></slot>
    </BasicCard>
  </div>
</template>

<style scoped>
  .selection-display {
    display: grid;
    grid-template-columns: 300px 1fr;
    align-items: flex-start;
    gap: var(--ja-spacing-2x-large);
    width: 100%;
  }
</style>
