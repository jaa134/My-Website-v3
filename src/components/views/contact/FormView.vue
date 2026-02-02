<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import emailjs from '@emailjs/browser';
  import { ref } from 'vue';

  import { useNotify } from '@/composables/useNotify.js';

  import ActionButton from '@/components/common/ActionButton.vue';
  import SectionHeader from '@/components/common/SectionHeader.vue';

  /* Common ///////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const { notify } = useNotify();

  /* Email configuration //////////////////////////////////////////////////////////////////////////////////////////// */

  const emailJsServiceId = 'service_f6vq4q1';
  const emailJsTemplateId = 'template_stiymyn';
  const emailJsPublicKey = 'tHKpunSrvx009HOfP';

  emailjs.init({
    publicKey: emailJsPublicKey,
    blockHeadless: true,
    limitRate: {
      throttle: 10000,
    },
  });

  const sendEmail = async (formData: FormData) => {
    return await emailjs.send(emailJsServiceId, emailJsTemplateId, {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('description'),
    });
  };

  /* Form /////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const formRef = ref<HTMLFormElement>();

  const loading = ref(false);

  const resetForm = () => {
    formRef.value?.reset();
  };

  const handleSubmit = async () => {
    const isValid = formRef.value?.reportValidity();

    if (!isValid) {
      return;
    }

    loading.value = true;

    try {
      const formData = new FormData(formRef.value);
      await sendEmail(formData);
      resetForm();
      notify('success', 'Thanks for reaching out!');
    } catch (error) {
      console.error(error);
      notify('error', 'Oops! Something went wrong.');
    }

    loading.value = false;
  };
</script>

<template>
  <div class="form-view">
    <SectionHeader
      title="Shoot me a message!"
      subtitle="And I'll get back to you as soon as possible."
      alignment="center"
    />
    <form
      ref="formRef"
      :class="['contact-form', { loading }]"
      @submit.prevent="handleSubmit"
    >
      <div class="input-row">
        <input
          class="input"
          type="text"
          name="name"
          placeholder="Name"
          autocomplete="name"
          spellcheck="false"
          required
          :disabled="loading"
        />
        <input
          class="input"
          type="email"
          name="email"
          placeholder="Email"
          autocomplete="email"
          spellcheck="false"
          required
          :disabled="loading"
        />
        <input
          class="input"
          type="tel"
          name="phone"
          placeholder="Phone"
          autocomplete="tel"
          spellcheck="false"
          required
          :disabled="loading"
        />
      </div>
      <textarea
        class="textarea"
        name="description"
        placeholder="How can I help?"
        rows="6"
        required
        :disabled="loading"
      ></textarea>
      <ActionButton
        class="submit-button"
        type="submit"
        :loading="loading"
        :disabled="loading"
      >
        {{ loading ? 'Sending...' : 'Send' }}
      </ActionButton>
    </form>
  </div>
</template>

<style scoped>
  .form-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--ja-spacing-large);
    width: 100%;
    max-width: 1000px;
    transition: filter var(--ja-transition-fast) ease;

    &.loading {
      filter: grayscale(50%);
    }
  }

  .input-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--ja-spacing-medium);
    width: 100%;
  }

  .input,
  .textarea {
    width: 100%;
    padding: var(--ja-spacing-medium) var(--ja-spacing-large);
    border-radius: var(--ja-border-radius-large);
    border: 1px solid color-mix(in srgb, var(--ja-color-neutral-0) 12%, transparent);
    background: color-mix(in srgb, var(--ja-color-neutral-1000) 70%, transparent);
    color: var(--ja-color-neutral-100);
    font-size: var(--ja-font-size-medium);
    transition:
      border-color var(--ja-transition-fast) ease,
      box-shadow var(--ja-transition-fast) ease;

    &:focus {
      outline: none;
      border-color: color-mix(in srgb, var(--ja-color-purple-400) 60%, transparent);
      box-shadow: 0 0 12px color-mix(in srgb, var(--ja-color-purple-400) 30%, transparent);
    }

    &::placeholder {
      color: var(--ja-color-neutral-400);
    }

    &:disabled {
      cursor: progress;
    }
  }

  .input:-webkit-autofill,
  .input:-webkit-autofill:hover,
  .input:-webkit-autofill:focus,
  .textarea:-webkit-autofill,
  .textarea:-webkit-autofill:hover,
  .textarea:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--ja-color-neutral-100);
    caret-color: var(--ja-color-neutral-100);
    box-shadow: 0 0 0 1000px color-mix(in srgb, var(--ja-color-neutral-1000) 70%, transparent) inset;
    transition: background-color 9999s ease-in-out 0s;
  }

  .textarea {
    resize: vertical;
    min-height: 180px;
  }

  .submit-button {
    margin-top: var(--ja-spacing-medium);
  }
</style>
