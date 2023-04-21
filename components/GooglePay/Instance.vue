<template>
  <div />
</template>

<script lang="ts" setup>
import PaymentsClient = google.payments.api.PaymentsClient
import PaymentDataRequest = google.payments.api.PaymentDataRequest

const el = useCurrentElement()
const btn = ref<HTMLElement>()

watch(btn, (val) => {
  nextTick(() => {
    if (val) {
      el.value.appendChild(val)
    } else {
      el.value.innerHTML = ''
    }
  })
})

const googlePay: PaymentsClient = new google.payments.api.PaymentsClient({
  environment: 'TEST'
})

const requestData: PaymentDataRequest = {
  merchantInfo: {
    merchantId: '12345678901234567890',
    merchantName: 'Demo Merchant'
  },
  transactionInfo: {
    totalPriceStatus: 'FINAL',
    totalPriceLabel: 'Total',
    totalPrice: '1.00',
    currencyCode: 'USD',
    countryCode: 'US'
  },
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA']
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId'
        }
      }
    }
  ]
}
// create a variable to store return value of h()

const createBtn = () => {
  btn.value = googlePay.createButton({
    buttonColor: 'white',
    buttonType: 'long',
    onClick: () => {
      console.log('clicked')
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadPayment = async () => {
  return googlePay.loadPaymentData(requestData)
}

nextTick(async () => {
  try {
    // Init Google Pay
    // Check if Google Pay is available
    await googlePay.isReadyToPay(requestData)

    // Create Google Pay button
    createBtn()

    // Load payment data
    // await loadPayment()
  } catch (e) {
    console.log(e)
    //
  }
})
</script>

<style scoped></style>
