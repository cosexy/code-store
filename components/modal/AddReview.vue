<template>
  <modal-base
    name="add-review"
    title="Add a review"
  >
    <div v-auto-animate>
      <form-instance
        v-if="current === 'review'"
        :value="vars"
        :rules="rules"
        class="mt-5"
        @on-ok="submit"
      >
        <form-item name="rate">
          <div>
            <div v-auto-animate class="space-y-3">
              <div
                v-for="aspect in aspects"
                :key="aspect.name"
                class="flex items-center justify-between"
              >
                <div>{{ aspect.name }}</div>
                <div class="sr-only">
                  rate {{ aspect.rate }}
                </div>
                <div class="flex items-center">
                  <label
                    v-for="rating in maxPoint"
                    :key="rating"
                  >
                    <input
                      v-model="aspect.rate"
                      class="sr-only"
                      type="radio"
                      :name="`review-${aspect.name}`"
                      :value="rating"
                    >
                    <Icon
                      name="ic:round-star-rate"
                      size="25"
                      :class="[aspect.rate >= rating ? 'text-yellow-400' : 'text-gray-300']"
                      aria-hidden="true"
                    />
                  </label>
                </div>
              </div>

              <div v-if="averageRate" class="mt-3 flex items-center justify-between rounded-md bg-gray-100 px-3 py-2 text-gray-600">
                Total rating: {{ averageRate }}
                <icon v-if="averageRate <= 2" name="line-md:emoji-angry" size="20" />
                <icon v-else-if="averageRate <= 3.5" name="line-md:emoji-neutral" size="20" />
                <icon v-else name="line-md:emoji-smile" size="20" />
              </div>
            </div>
          </div>
        </form-item>

        <form-item name="content" class="mt-5">
          <textarea
            v-model="vars.content"
            rows="5"
            class="w-full rounded-md border-transparent bg-gray-100 p-3 ring-0 transition focus:border-0 focus:shadow-none focus:outline-0 focus:ring-0"
            placeholder="Write your review here..."
          />
        </form-item>

        <div class="mt-3 flex justify-end space-x-3 border-t border-gray-100 pt-4">
          <button
            type="button"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :disabled="loading"
          >
            <icon :name="loading ? 'line-md:loading-twotone-loop' : 'material-symbols:add-rounded'" class="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Submit
          </button>
        </div>
      </form-instance>

      <div
        v-else
        class="flex flex-col items-center justify-center"
      >
        <vue-lottie-player
          width="250px"
          height="200px"
          loop
          path="https://assets8.lottiefiles.com/packages/lf20_ymyikn6l.json"
        />
        <div class="mt-4 text-center">
          <p class="mt-2 text-sm text-gray-500">
            Thank you for your review!
          </p>
        </div>
      </div>
    </div>
  </modal-base>
</template>

<script setup lang="ts">
import { VueLottiePlayer } from '@nguyenshort/vue-lottie'
import { Rules } from 'async-validator'
import { CreateReviewDocument, CreateReviewInput } from '~/apollo/__generated__/graphql'

const {
  current,
  goTo
} = useStepper([
  'review',
  'success'
], 'review')

const { onReceive, onClosed } = useDialog<string>('add-review', { watch: true })

const vars = ref<CreateReviewInput>({
  product: '',
  content: '',
  rate: 0
})

onReceive((product) => {
  if (product) {
    vars.value.product = product
  }
})

const rules = computed<Rules>(() => ({
  content: [
    { required: true, message: 'Please enter your review' }
  ],
  rate: [
    {
      validator: () => {
        if (!vars.value.rate) {
          return Promise.reject(new Error('Please rate this product'))
        }
        return Promise.resolve()
      }
    }
  ]
}))

const maxPoint = computed(() => 5)

// review points
const aspects = ref([
  {
    name: 'Quality',
    rate: 0
  },
  {
    name: 'Price',
    rate: 0
  },
  {
    name: 'Value',
    rate: 0
  }
])

onClosed(() => {
  // reset vars and apects
  vars.value.content = ''
  vars.value.rate = 0
  aspects.value.forEach((aspect) => {
    aspect.rate = 0
  })
})

// average rate and round to 1 decimal place
const averageRate = computed(() => {
  const total = aspects.value.reduce((acc, cur) => acc + cur.rate, 0)
  return Number((total / aspects.value.length).toFixed(1))
})

watch(averageRate, (val) => {
  vars.value.rate = val
})

const { loading, mutate, onDone } = useMutation(CreateReviewDocument)

onDone(() => {
  goTo('success')
})

const submit = () => {
  mutate({ input: vars.value })
}
</script>

<style scoped>

</style>
