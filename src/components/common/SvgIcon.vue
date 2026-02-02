<script setup lang="ts">
  /* Props ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  export interface SvgIconProps {
    href: string;
    size?: number | string;
  }

  const props = defineProps<SvgIconProps>();
</script>

<template>
  <svg
    class="svg-icon"
    :width="size"
    :height="size"
  >
    <use :href="href" />
  </svg>
</template>
