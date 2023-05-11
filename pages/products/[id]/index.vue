<template>
  <div class="bg-white">
    <div class="section-spacing pt-10">
      <!-- Product -->
      <div class="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        <!-- Product image -->
        <product-image :product="product" />

        <!-- Product details -->
        <product-detail :product="product" />

        <div id="project-tabs" class="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
          <headless-tab-group as="div">
            <div class="border-b border-gray-200">
              <headless-tab-list class="-mb-px flex space-x-8">
                <headless-tab
                  v-for="item in tabs"
                  :key="item"
                  v-slot="{ selected }"
                  as="template"
                >
                  <button
                    :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800']"
                    class="whitespace-nowrap border-b-2 py-6 text-sm font-medium focus:outline-0"
                  >
                    {{ item }}
                  </button>
                </headless-tab>
              </headless-tab-list>
            </div>

            <headless-tab-panels as="template">
              <headless-tab-panel>
                <product-reviews :product-id="product.id" />
              </headless-tab-panel>
              <headless-tab-panel>
                <product-description :description="product.description" />
              </headless-tab-panel>
              <headless-tab-panel>
                <product-lisence :lisence="product.license" />
              </headless-tab-panel>
            </headless-tab-panels>
          </headless-tab-group>
        </div>
      </div>
    </div>
    <modal-order-preview />
  </div>
</template>

<script setup async lang="ts">
const route = useRoute()
const { result } = await useAsyncQuery(GetProductDocument, {
  filter: {
    slug: route.params.id as string
  }
})

const product = computed(() => result.value!.product)

const tabs = computed(() => ['Customer Reviews', 'Description', 'License'])
</script>
