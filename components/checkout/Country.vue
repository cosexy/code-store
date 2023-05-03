<template>
  <div>
    <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
    <div class="mt-1">
      <headless-combobox v-model="_selected">
        <div class="relative mt-1">
          <div
            class="relative w-full cursor-default bg-white text-left focus:outline-none sm:text-sm"
          >
            <headless-combobox-input
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              :display-value="(country: Country) => country.name"
              @change="query = $event.target.value"
            />
            <headless-combobox-button
              class="absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <Icon
                name="lucide:chevrons-up-down"
                class="h-5 w-5 text-gray-400"
              />
            </headless-combobox-button>
          </div>
          <headless-transition-root
            leave="transition ease-in duration-100"
            leave-from="opacity-100"
            leave-to="opacity-0"
            @after-leave="query = ''"
          >
            <headless-combobox-options
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <div
                v-if="filteredCountries.length === 0 && query !== ''"
                class="relative cursor-default select-none px-4 py-2 text-gray-700"
              >
                Nothing found.
              </div>

              <headless-combobox-option
                v-for="country in filteredCountries"
                :key="country.code"
                v-slot="{ selected, active }"
                as="template"
                :value="country"
              >
                <li
                  class="relative cursor-default select-none py-2 pl-10 pr-4"
                  :class="{
                    'bg-teal-600 text-white': active,
                    'text-gray-900': !active,
                  }"
                >
                  <span
                    class="block truncate"
                    :class="{ 'font-medium': selected, 'font-normal': !selected }"
                  >
                    {{ country.name }}
                  </span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3"
                    :class="{ 'text-white': active, 'text-teal-600': !active }"
                  >
                    <Icon name="material-symbols:check-small-rounded" class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </headless-combobox-option>
            </headless-combobox-options>
          </headless-transition-root>
        </div>
      </headless-combobox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Country, getData } from 'country-list'
import { CreateOrderInput } from '~/apollo/__generated__/graphql'

defineProps<{
  value: CreateOrderInput['city']
}>()

const emit = defineEmits<{
  (event: 'update:value', value: CreateOrderInput['city']): void
}>()

const countries = computed(() => getData())
const _selected = ref<Country>(countries.value[0])
watch(_selected, () => {
  emit('update:value', _selected.value.code)
})

const query = ref('')
const filteredCountries = computed(() =>
  query.value === ''
    ? countries.value
    : countries.value.filter((country) =>
      country.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, ''))
    )
)
</script>

<style scoped>

</style>
