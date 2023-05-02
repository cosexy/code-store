<template>
  <section aria-labelledby="payment-and-shipping-heading" class="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0">
    <h2 id="payment-and-shipping-heading" class="sr-only">
      Payment and shipping details
    </h2>
    <form cart="">
      <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
        <div>
          <h3 id="contact-info-heading" class="text-lg font-medium text-gray-900">
            Contact information
          </h3>

          <div class="mt-6">
            <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1">
              <input id="email-address" type="email" name="email-address" autocomplete="email" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>
        </div>

        <div class="mt-10">
          <h3 class="text-lg font-medium text-gray-900">
            Billing information
          </h3>

          <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
            <div class="sm:col-span-2">
              <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
              <div class="mt-1">
                <headless-combobox v-model="selected">
                  <div class="relative mt-1">
                    <div
                      class="relative w-full cursor-default bg-white text-left focus:outline-none sm:text-sm"
                    >
                      <headless-combobox-input
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        :display-value="(person) => person.name"
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
                          v-if="filteredPeople.length === 0 && query !== ''"
                          class="relative cursor-default select-none px-4 py-2 text-gray-700"
                        >
                          Nothing found.
                        </div>

                        <headless-combobox-option
                          v-for="person in filteredPeople"
                          :key="person.id"
                          v-slot="{ selected, active }"
                          as="template"
                          :value="person"
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
                              {{ person.name }}
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

            <div>
              <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
              <div class="mt-1">
                <input id="region" type="text" name="region" autocomplete="address-level1" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
              <div class="mt-1">
                <input id="address" type="text" name="address" autocomplete="street-address" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
              <div class="mt-1">
                <input id="city" type="text" name="region" autocomplete="address-level1" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              </div>
            </div>

            <div>
              <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal code</label>
              <div class="mt-1">
                <input id="postal-code" type="text" name="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              </div>
            </div>
          </div>
        </div>

        <div ref="googlePayRef" class="mt-10 border-t border-gray-200 pt-6">
          <div ref="googlePayRef" class="w-full" />
        </div>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { getData } from 'country-list'
import PaymentData = google.payments.api.PaymentData
import { CartItemFragment } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  cart: CartItemFragment[]
}>()

/**
 * Form
 */
const countries = computed(() => getData())

const people = [
  { id: 1, name: 'Viet Nam' }
]

const selected = ref(people[0])
const query = ref('')
const filteredPeople = computed(() =>
  query.value === ''
    ? people
    : people.filter((person) =>
      person.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, ''))
    )
)

/**
 * Google Pay
 */
const { discount, final, fee } = useCart(props.cart)
const googlePayRef = ref()
const { onCreate, toDataRequest, onApproved } = useGooglePay()
onCreate((client) => {
  const btn = client.createButton({
    buttonColor: 'default',
    buttonSizeMode: 'fill',
    onClick: () => {
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
  })

  googlePayRef.value.appendChild(btn)
})

const afterPurhasing = (paymentData: PaymentData) => {
  // @todo send payment data to backend
  console.log(paymentData)
}
onApproved((paymentData) => afterPurhasing(paymentData))
</script>

<style scoped>

</style>
