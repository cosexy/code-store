<template>
  <div />
</template>

<script lang="ts" setup>
const { onCreate, toDataRequest, onApproved } = useGooglePay()

const el = useCurrentElement()
const btn = ref()
watch(btn, (val) => nextTick(() => {
  if (val) {
    el.value.appendChild(val)
  } else {
    el.value.innerHTML = ''
  }
}))

onCreate((client) => {
  btn.value = client.createButton({
    buttonColor: 'white',
    onClick: () => {
      const data = toDataRequest({
        merchantInfo: {
          // @todo a merchant ID is available for a production environment after approval by Google
          // See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
          merchantId: '01234567890123456789',
          merchantName: 'Example Merchant'
        },
        transactionInfo: {
          displayItems: [
            {
              label: 'Subtotal',
              type: 'SUBTOTAL',
              price: '11.00'
            },
            {
              label: 'Tax',
              type: 'TAX',
              price: '1.00'
            }
          ],
          countryCode: 'US',
          currencyCode: 'USD',
          totalPriceStatus: 'FINAL',
          totalPrice: '12.00',
          totalPriceLabel: 'Total'
        }
      })
      client.loadPaymentData(data)
    }
  })
})

onApproved((paymentData) => {
  console.log(paymentData)
})
</script>

<style scoped></style>
