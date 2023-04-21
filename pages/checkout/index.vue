<template>
  <div class="bg-white">
    <!-- Background color split screen for large screens -->
    <div class="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
    <div class="fixed right-0 top-0 hidden h-full w-1/2 bg-indigo-900 lg:block" aria-hidden="true" />

    <div class="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
      <h1 class="sr-only">
        Checkout
      </h1>

      <section aria-labelledby="summary-heading" class="bg-indigo-900 py-12 text-indigo-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0">
        <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <h2 id="summary-heading" class="sr-only">
            Order summary
          </h2>

          <dl>
            <dt class="text-sm font-medium">
              Amount due
            </dt>
            <dd class="mt-1 text-3xl font-bold tracking-tight text-white">
              $232.00
            </dd>
          </dl>

          <ul role="list" class="divide-y divide-white divide-opacity-10 text-sm font-medium">
            <li v-for="product in products" :key="product.id" class="flex items-start space-x-4 py-6">
              <img :src="product.imageSrc" :alt="product.imageAlt" class="h-20 w-20 flex-none rounded-md object-cover object-center">
              <div class="flex-auto space-y-1">
                <h3 class="text-white">
                  {{ product.name }}
                </h3>
                <p>{{ product.color }}</p>
                <p>{{ product.size }}</p>
              </div>
              <p class="flex-none text-base font-medium text-white">
                {{ product.price }}
              </p>
            </li>
          </ul>

          <dl class="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
            <div class="flex items-center justify-between">
              <dt>Subtotal</dt>
              <dd>$570.00</dd>
            </div>

            <div class="flex items-center justify-between">
              <dt>Shipping</dt>
              <dd>$25.00</dd>
            </div>

            <div class="flex items-center justify-between">
              <dt>Taxes</dt>
              <dd>$47.60</dd>
            </div>

            <div class="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
              <dt class="text-base">
                Total
              </dt>
              <dd class="text-base">
                $642.60
              </dd>
            </div>
          </dl>
        </div>
      </section>

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

            <div class="mt-10 flex justify-end border-t border-gray-200 pt-6">
              <client-only>
                <lazy-google-pay-checkout />
              </client-only>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
const products = [
  {
    id: 1,
    name: 'High Wall Tote',
    href: '#',
    price: '$210.00',
    color: 'White and black',
    size: '15L',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-07-product-01.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, white handles, and black drawstring top.'
  }
]
</script>
