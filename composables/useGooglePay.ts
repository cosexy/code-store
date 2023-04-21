import PaymentsClient = google.payments.api.PaymentsClient
import IsReadyToPayRequest = google.payments.api.IsReadyToPayRequest
import IsReadyToPayPaymentMethodSpecification = google.payments.api.IsReadyToPayPaymentMethodSpecification
import CardAuthMethod = google.payments.api.CardAuthMethod
import CardNetwork = google.payments.api.CardNetwork
import PaymentDataRequest = google.payments.api.PaymentDataRequest
import PaymentData = google.payments.api.PaymentData
import PaymentAuthorizationResult = google.payments.api.PaymentAuthorizationResult

export const useGooglePayState = createGlobalState(
  () => {
    const GOOGLE_PAY = ref(false)
    let googlePayClient: PaymentsClient | undefined
    const googlePayToken = ref()

    return {
      GOOGLE_PAY,
      googlePayClient,
      googlePayToken
    }
  }
)

export const useGooglePay = () => {
  const store = useGooglePayState()

  /**
   * Define the version of the Google Pay API referenced when creating your
   * configuration
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|apiVersion in PaymentDataRequest}
   */
  const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0
  }

  /**
   * Card networks supported by your site and your gateway
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
   * @todo confirm card networks supported by your site and gateway
   */
  const allowedCardNetworks: CardNetwork[] = ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA']

  /**
   * Card authentication methods supported by your site and your gateway
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
   * @todo confirm your processor supports Android device tokens for your
   * supported card networks
   */
  const allowedCardAuthMethods: CardAuthMethod[] = ['PAN_ONLY', 'CRYPTOGRAM_3DS']

  /**
   * Identify your gateway and your site's gateway merchant identifier
   *
   * The Google Pay API response will return an encrypted payment method capable
   * of being charged by a supported gateway after payer authorization
   *
   * @todo check with your gateway on the parameters to pass
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway|PaymentMethodTokenizationSpecification}
   */
  const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
      gateway: 'example',
      gatewayMerchantId: 'exampleGatewayMerchantId'
    }
  }

  /**
   * Describe your site's support for the CARD payment method and its required
   * fields
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
   */
  const baseCardPaymentMethod: IsReadyToPayPaymentMethodSpecification = {
    type: 'CARD',
    parameters: {
      allowedAuthMethods: allowedCardAuthMethods,
      allowedCardNetworks
    }
  }

  /**
   * Describe your site's support for the CARD payment method including optional
   * fields
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
   */
  const cardPaymentMethod = Object.assign({},
    baseCardPaymentMethod, {
      tokenizationSpecification
    }
  )

  const getGooglePaymentsClient = (): PaymentsClient => {
    store.GOOGLE_PAY.value = true
    if (!store.googlePayClient) {
      store.googlePayClient = new google.payments.api.PaymentsClient({
        environment: 'TEST',
        paymentDataCallbacks: {
          onPaymentAuthorized
        }
      })
    }
    return store.googlePayClient
  }

  const processPayment = (paymentData: PaymentData) => {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        // @todo pass payment token to your gateway to process payment
        store.googlePayToken.value = paymentData.paymentMethodData.tokenizationData.token

        if (attempts++ % 2 === 0) {
          reject(new Error('Every other attempt fails, next one should succeed'))
        } else {
          resolve({})
        }
      }, 500)
    })
  }

  const onPaymentAuthorized = async (paymentData: PaymentData): Promise<PaymentAuthorizationResult> => {
    try {
      await processPayment(paymentData)
      return {
        transactionState: 'SUCCESS'
      }
    } catch (e) {
      //
    }
    return {
      transactionState: 'ERROR',
      error: {
        intent: 'PAYMENT_AUTHORIZATION',
        message: 'Insufficient funds, try again. Next attempt should work.',
        reason: 'PAYMENT_DATA_INVALID'
      }
    }
  }

  /**
   * Configure your site's support for payment methods supported by the Google Pay
   * API.
   *
   * Each member of allowedPaymentMethods should contain only the required fields,
   * allowing reuse of this base request when determining a viewer's ability
   * to pay and later requesting a supported payment method
   *
   * @returns {object} Google Pay API version, payment methods supported by the site
   */
  const getGoogleIsReadyToPayRequest = (): IsReadyToPayRequest => {
    return {
      ...baseRequest,
      allowedPaymentMethods: [baseCardPaymentMethod]
    }
  }

  /**
   * Event Listener callback function.
   */
  const onCreate = createEventHook<PaymentsClient>()

  const init = async () => {
    if (store.GOOGLE_PAY) {
      await onCreate.trigger(getGooglePaymentsClient())
      return
    }
    const paymentsClient = getGooglePaymentsClient()
    try {
      await paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
      await onCreate.trigger(getGooglePaymentsClient())
    } catch (e) {
      //
    }
  }

  const toDataRequest = (option: Omit<PaymentDataRequest, 'apiVersion' | 'apiVersionMinor' | 'allowedPaymentMethods' | 'callbackIntents'>): PaymentDataRequest => {
    return {
      ...baseRequest,
      allowedPaymentMethods: [cardPaymentMethod],
      callbackIntents: ['PAYMENT_AUTHORIZATION'],
      ...option
    }
  }

  useScriptTag('https://pay.google.com/gp/p/js/pay.js', () => init(), {
    async: true
  })

  return {
    onCreate: onCreate.on,
    getGooglePaymentsClient,
    toDataRequest
  }
}
