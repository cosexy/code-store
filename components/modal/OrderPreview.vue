<template>
  <modal-base name="over-overview">
    <h2 class="line-clamp-2 text-2xl font-bold text-gray-900 sm:pr-12">
      {{ product?.name }}
    </h2>

    <section aria-labelledby="information-heading" class="mt-4">
      <h3 id="information-heading" class="sr-only">
        Product information
      </h3>

      <div class="flex items-center">
        <p class="text-lg text-gray-900 sm:text-xl">
          $ {{ selectedSelence === Lisence_Type.Extended ? regular : extended }}
        </p>

        <div class="ml-4 border-l border-gray-300 pl-4">
          <h4 class="sr-only">
            Reviews
          </h4>
          <div class="flex items-center">
            <div class="flex items-center">
              <Icon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" name="ic:round-star-rate" :class="[4 > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 shrink-0']" aria-hidden="true" />
            </div>
            <p class="sr-only">
              {{ 5 }} out of 5 stars
            </p>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="options-heading" class="mt-6">
      <h3 id="options-heading" class="sr-only">
        Product options
      </h3>

      <div>
        <div class="sm:flex sm:justify-between">
          <!-- Size selector -->
          <HeadlessRadioGroup v-model="selectedSelence" class="space-y-5">
            <HeadlessRadioGroupOption v-for="item in lisences" :key="item.name" v-slot="{ active, checked }" as="template" :value="item.value">
              <div :class="[active ? 'ring-2 ring-indigo-500' : '', 'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none']">
                <HeadlessRadioGroupLabel as="p" class="text-base font-medium text-gray-900">
                  {{ item.name }}
                </HeadlessRadioGroupLabel>
                <HeadlessRadioGroupDescription as="p" class="mt-1 text-sm text-gray-500">
                  {{ item.description }}
                </HeadlessRadioGroupDescription>
                <div :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']" aria-hidden="true" />
              </div>
            </HeadlessRadioGroupOption>
          </HeadlessRadioGroup>
        </div>
        <div class="mt-4 flex">
          <a href="#" class="group flex text-sm text-gray-500 hover:text-gray-700">
            <span>What license type should I buy?</span>
            <Icon name="majesticons:question-mark-circle" class="ml-2 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
          </a>
        </div>
        <div class="mt-6 flex space-x-3">
          <button
            class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            @click="addToCart()"
          >
            Add to cart
          </button>
          <button
            class="bg-primary-50 text-primary-700 hover:bg-primary-100 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Buy now
          </button>
        </div>
        <div class="mt-6 text-center">
          <a href="#" class="group inline-flex text-base font-medium">
            <Icon name="mdi:shield-check" class="mr-2 h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
            <span class="text-gray-500 group-hover:text-gray-700">Lifetime Guarantee</span>
          </a>
        </div>
      </div>
    </section>
  </modal-base>
</template>

<script setup lang="ts">
import { AddToCartDocument, Lisence_Type, Product } from '~/apollo/__generated__/graphql'

const product = ref<Pick<Product, 'id' | 'name' | 'price' | 'sale'>>({
  id: '',
  name: '',
  price: 0,
  sale: 0
})
const { regular, extended } = usePrice(product)

const { onReceive, close } = useDialog<Pick<Product, 'id' | 'name' | 'price' | 'sale'>>('over-overview', {
  watch: true
})
onReceive((_product) => {
  if (_product) {
    product.value = {
      id: _product.id,
      name: _product.name,
      price: _product.price,
      sale: _product.sale
    }
  }
})

const lisences = computed(() => [
  {
    name: 'Regular License',
    value: Lisence_Type.Regular,
    description: 'A regular license grants you limited usage rights for a product, often for a single project or client.'
  },
  {
    name: 'Extended License',
    value: Lisence_Type.Extended,
    description: 'An extended license grants you broader usage rights for a product, often allowing for multiple projects or clients.'
  }
])

const selectedSelence = ref(lisences.value[0].value)

const { mutate: add } = useMutation(AddToCartDocument)

const authStore = useAuth()
const { addOrInc } = useLocalCart()

const addToCart = () => {
  close()
  if (authStore.user) {
    add({
      input: { product: product.value.id, licenseType: selectedSelence.value }
    })
  } else {
    addOrInc({
      licenseType: selectedSelence.value,
      product: {
        id: product.value.id
      }
    })
  }
}
</script>
