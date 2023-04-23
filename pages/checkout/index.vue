<template>
  <div class="bg-white">
    <!-- Background color split screen for large screens -->
    <div class="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
    <div class="fixed right-0 top-0 hidden h-full w-1/2 bg-indigo-900 lg:block" aria-hidden="true" />

    <div class="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
      <h1 class="sr-only">
        Checkout
      </h1>

      <checkout-sumary :cart="cart" />

      <section aria-labelledby="payment-and-shipping-heading" class="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0">
        <h2 id="payment-and-shipping-heading" class="sr-only">
          Payment and shipping details
        </h2>
        <form>
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
                <div class="sm:col-span-3">
                  <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                  <div class="mt-1">
                    <input id="address" type="text" name="address" autocomplete="street-address" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  </div>
                </div>

                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                  <div class="mt-1">
                    <input id="city" type="text" name="city" autocomplete="address-level2" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  </div>
                </div>

                <div>
                  <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                  <div class="mt-1">
                    <input id="region" type="text" name="region" autocomplete="address-level1" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
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
    </div>
  </div>
</template>

<script setup async lang="ts">
import { GET_CART } from '~/apollo/queries/cart.query'
import { GetCart } from '~/apollo/queries/__generated__/GetCart'
import PaymentData = google.payments.api.PaymentData

const { data } = await useAsyncQuery<GetCart>(GET_CART)
const cart = computed(() => data?.value?.cart || [])

const { discount, final, fee } = useCart(cart)

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
