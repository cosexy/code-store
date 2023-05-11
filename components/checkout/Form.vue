<template>
  <section
    v-auto-animate
    aria-labelledby="payment-and-shipping-heading"
    class="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
  >
    <template v-if="['purchasing', 'loading'].includes(status)">
      <h2 id="payment-and-shipping-heading" class="sr-only">
        Payment and shipping details
      </h2>

      <a
        v-if="!auth.user"
        class="mb-6 flex items-center justify-center rounded-md bg-indigo-600 p-3 text-center text-sm font-semibold uppercase text-white shadow shadow-indigo-400"
        href="javascript:void(0)"
        @click="openAuth()"
      >
        <icon size="20" name="material-symbols:arrow-forward-rounded" />
        <span class="ml-2">Login to checkout</span>
      </a>

      <div :class="[!disabledForm ? '' : 'pointer-events-none opacity-60']">
        <form cart="" @submit.prevent="openBuyPopup">
          <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
            <div>
              <h3 class="text-lg font-medium text-gray-900">
                Billing information
              </h3>

              <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                <checkout-country v-model:value="form.country" class="sm:col-span-2" />

                <div>
                  <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                  <div class="mt-1">
                    <input
                      id="region"
                      v-model="form.state"
                      required
                      type="text"
                      name="region"
                      autocomplete="address-level1"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                  <div class="mt-1">
                    <input
                      id="address"
                      v-model="form.address"
                      required
                      type="text"
                      name="address"
                      autocomplete="street-address"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                  <div class="mt-1">
                    <input
                      id="city"
                      v-model="form.city"
                      type="text"
                      required
                      name="region"
                      autocomplete="address-level1"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                  </div>
                </div>

                <div>
                  <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal code</label>
                  <div class="mt-1">
                    <input
                      id="postal-code"
                      v-model="form.zip"
                      type="text"
                      required
                      name="postal-code"
                      autocomplete="postal-code"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-10">
              <h3 class="text-lg font-medium text-gray-900">
                Lisence options
              </h3>

              <div class="relative mt-6 flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input
                    id="separate"
                    v-model="form.separate"
                    aria-describedby="candidates-description"
                    name="separate"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  >
                </div>
                <div class="text-sm leading-6">
                  <label for="separate" class="font-medium">
                    Separate license
                  </label>
                  <p class="text-gray-400">
                    You will receive a separate license for each item in your cart.
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-10 border-t border-gray-200 pt-6">
              <button ref="submitBtn" class="sr-only" type="submit">
                Submit
              </button>
              <div ref="googlePayRef" class="w-full" />
            </div>
          </div>
        </form>
      </div>
    </template>

    <div v-else class="flex flex-col items-center">
      <vue-lottie-player
        path="https://assets2.lottiefiles.com/packages/lf20_CWcCII.json"
        loop
        height="300px"
        width="300px"
      />
      <p class="text-sm text-gray-500">
        Your cart is empty.
        <nuxt-link to="/" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Go to discovery page
          <span aria-hidden="true"> &rarr;</span>
        </nuxt-link>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { VueLottiePlayer } from '@nguyenshort/vue-lottie'
import { SingleExecutionResult } from '@apollo/client'
import PaymentData = google.payments.api.PaymentData
import { CreateOrderInput, CreateOrderMutation, GetCartQuery } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  cart: GetCartQuery['cart']
  status: 'loading' | 'empty' | 'purchasing'
}>()

const { open: openAuth } = useDialog('auth')

const auth = useAuth()
const disabledForm = computed(() => props.status !== 'purchasing' || !auth.user)

const form = reactive<Omit<CreateOrderInput, 'merchandise' | 'token'>>({
  address: '',
  city: '',
  country: '',
  state: '',
  zip: '',
  separate: false
})

const submitBtn = ref<HTMLButtonElement>()

/**
 * Google Pay
 */
const { discount, final, fee } = useCart(props.cart)
const googlePayRef = ref()
const { onCreate, toDataRequest, onApproved, getGooglePaymentsClient } = useGooglePay()
onCreate((client) => {
  const btn = client.createButton({
    buttonColor: 'default',
    buttonSizeMode: 'fill',
    onClick: () => submitBtn.value?.click()
  })

  googlePayRef.value.appendChild(btn)
})

const openBuyPopup = () => {
  const client = getGooglePaymentsClient()
  const data = toDataRequest({
    merchantInfo: {
      // @todo a merchant ID is available for a production environment after approval by Google
      // See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
      merchantId: 'BCR2DN4TZKH5LQI5',
      merchantName: 'Guen Chan'
    },
    transactionInfo: {
      displayItems: [
        {
          label: 'Subtotal',
          type: 'SUBTOTAL',
          price: `${discount.value}`
        },
        {
          label: 'Fee',
          type: 'TAX',
          price: `${fee.value}`
        }
      ],
      countryCode: 'US',
      currencyCode: 'USD',
      totalPriceStatus: 'FINAL',
      totalPrice: `${final.value}`,
      totalPriceLabel: 'Total'
    }
  })
  client.loadPaymentData(data)
}

// emit purchased
const router = useRouter()

const { mutate: createOrder, onDone: onPurchased } = useMutation(CreateOrderDocument)
onPurchased((result: SingleExecutionResult<CreateOrderMutation>) => {
  if (result.data?.createOrder) {
    router.replace({
      name: 'orders-id',
      params: {
        id: result.data.createOrder.id
      }
    })
  }
})

const afterPurhasing = (paymentData: PaymentData) => {
  const token = paymentData.paymentMethodData.tokenizationData.token

  const input: CreateOrderInput = {
    ...form,
    token,
    merchandise: props.cart.map((item) => ({
      product: item.product.id,
      quantity: item.quantity,
      licenseType: item.licenseType
    }))
  }
  createOrder({ input })
}
onApproved((paymentData) => afterPurhasing(paymentData))
</script>

<style scoped>

</style>
