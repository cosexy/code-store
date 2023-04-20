<template>
  <headless-tab-panel class="text-sm text-gray-500">
    <h3 class="sr-only">
      Frequently Asked Questions
    </h3>

    <dl>
      <template v-for="faq in faqs" :key="faq.question">
        <dt class="mt-10 font-medium text-gray-900">
          {{ faq.question }}
        </dt>
        <dd class="prose prose-sm mt-2 max-w-none text-gray-500">
          <p>{{ faq.answer }}</p>
        </dd>
      </template>
    </dl>
  </headless-tab-panel>
</template>

<script lang="ts" setup>
const faqs = [
  {
    question: 'What format are these icons?',
    answer:
      'The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.'
  },
  {
    question: 'Can I use the icons at different sizes?',
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance."
  }
  // More FAQs...
]
</script>

<style scoped></style>
