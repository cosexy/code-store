<template>
  <div>
    <includes-spinner>
      <studio-creator-product-form
        v-model:form="input"
        @on-submit="submitForm($event)"
      />
    </includes-spinner>
  </div>
</template>

<script setup lang="ts">
import { CreateProductInput, ProductInformationDocument } from '~/apollo/__generated__/graphql'

const input = ref<CreateProductInput>({
  avatar: '',
  category: '',
  content: '',
  description: '',
  highlights: [],
  lisence: '',
  name: '',
  price: 0,
  sale: undefined,
  tags: [],
  version: '',
  document: ''
})

const route = useRoute()

const { result, onResult } = useQuery(ProductInformationDocument, {
  filter: {
    slug: route.params.id as string
  }
})

onResult((value) => {
  if (value.data.product) {
    input.value = {
      avatar: value.data.product.avatar.id,
      category: value.data.product.category.id,
      content: value.data.product.content,
      description: value.data.product.description,
      highlights: value.data.product.highlights,
      lisence: value.data.product.license,
      name: value.data.product.name,
      price: value.data.product.price,
      sale: value.data.product.sale,
      tags: value.data.product.tags.map((tag) => tag.name),
      version: value.data.product.version,
      document: value.data.product.document.id
    }
  }
})

/**
 * Submit form
 */
const { mutate, loading } = useMutation(CreateProductDocument)

const submitForm = (value: CreateProductInput) => {
  console.log(value)
  mutate({ input: input.value })
}
</script>

<style scoped>

</style>
