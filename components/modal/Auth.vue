<template>
  <modal-base name="auth" :title="isLogin ? 'Sign In' : 'Sign Up'">
    <div>
      <div style="width: 230px; height: 180px" class="mx-auto">
        <vue-lottie-player
          width="230px"
          height="180px"
          loop
          path="https://assets8.lottiefiles.com/packages/lf20_7jnffdxl.json"
        />
      </div>

      <div class="text-center">
        <small class="text-xs italic text-gray-400 opacity-90">
          Join us to get access to our premium content
        </small>
      </div>

      <div
        id="authForm"
        class="relative mx-auto mt-4 max-w-xs"
      >
        <HeadlessTransitionRoot
          :show="!isLogin"
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 translate-y-2 scale-95"
          enter-to="opacity-100 scale-100 translate-y-0"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100 translate-y-0"
          leave-to="opacity-0 scale-95 translate-y-2"
        >
          <auth-text
            v-model:value="form.name"
            placeholder="Name"
            class="mb-3"
          >
            <template #prefix>
              <Icon name="ri:user-4-fill" class="text-gray-400" />
            </template>
          </auth-text>
        </HeadlessTransitionRoot>
        <auth-text v-model:value="form.email" placeholder="Email ID">
          <template #prefix>
            <Icon
              name="material-symbols:alternate-email"
              class="text-gray-400"
            />
          </template>
        </auth-text>

        <auth-text
          v-model:value="form.password"
          placeholder="**** **** ****"
          type="password"
          class="mt-3"
        >
          <template #prefix>
            <Icon name="material-symbols:vpn-key" class="text-gray-400" />
          </template>

          <template v-if="isLogin" #suffix>
            <a
              class="text-primary-500 ml-3 block shrink-0 cursor-pointer text-xs"
            >
              Forgot password?
            </a>
          </template>
        </auth-text>

        <div class="my-1 mt-3 text-center text-xs">
          <p class="text-gray-400">
            {{
              isLogin ? 'Create a new account?' : 'Already have an account?'
            }}
            <a
              class="text-primary-500 ml-1 cursor-pointer capitalize"
              @click="toggleLogin()"
            >
              {{ isLogin ? 'Sign Up' : 'Sign In' }}
            </a>
          </p>
        </div>

        <button class="from-primary-500 to-primary-600 shadow-primary-300 mt-4 w-full rounded-full bg-gradient-to-r py-1.5 uppercase text-white shadow-md" @click="submit">
          <Icon name="material-symbols:arrow-circle-right" />
          <span class="ml-1 text-xs font-semibold">
              {{ isLogin ? 'Sign In' : 'Sign Up' }}
            </span>
        </button>

        <div class="mb-1">
          <div class="mt-5 flex items-center">
            <span class="h-px w-full bg-gray-200" />
            <span
              class="mx-3 shrink-0 text-xs font-medium uppercase text-gray-400"
            >
                Or
              </span>
            <span class="h-px w-full bg-gray-200" />
          </div>
          <div class="mt-5 flex items-center justify-center space-x-10 text-2xl">
            <button>
              <Icon name="logos:google-icon" />
            </button>
            <button>
              <Icon name="carbon:logo-github" />
            </button>
            <button>
              <Icon name="logos:twitter" />
            </button>
          </div>
        </div>

        <p class="mt-4 text-center text-xs leading-5 text-gray-400 opacity-90">
          © 2020 Your Company, Inc. All rights reserved.
        </p>
      </div>

      <HeadlessTransitionRoot
        :show="!!message"
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0 translate-y-2 scale-95"
        enter-to="opacity-100 scale-100 translate-y-0"
        leave="duration-200 ease-in"
        leave-from="opacity-100 scale-100 translate-y-0"
        leave-to="opacity-0 scale-95 translate-y-2"
      >
        <div
          class="absolute inset-x-0 bottom-0 bg-rose-500 px-5 py-3 text-sm text-white shadow-md shadow-rose-300"
        >
          {{ message }}
        </div>
      </HeadlessTransitionRoot>
    </div>
  </modal-base>
</template>

<script lang="ts" setup>
import { VueLottiePlayer } from '@nguyenshort/vue-lottie'
import { NotifyType } from '~/entities/notify.entity'
import { SignInDocument, SignUpDocument } from '~/apollo/__generated__/graphql'

const [isLogin, toggleLogin] = useToggle(true)

const form = ref({
  name: '',
  email: 'heloo@guen.dev',
  password: 'Guen@2508'
})
const message = refAutoReset('', 5000)

const validate = () => {
  if (!isLogin.value && !form.value.name) {
    message.value = 'Name is required'
  } else if (!form.value.email) {
    message.value = 'Email is required'
  } else if (!form.value.password) {
    message.value = 'Password is required'
  } else {
    return true
  }
}

const notify = useNotify()

const writeToken = async (token: string) => {
  try {
    await $fetch('/api/auth', {
      method: 'POST',
      body: {
        token
      }
    })
    window.location.reload()
  } catch (e) {

  }
}

const { mutate: login, onError: afterLoginError, onDone: afterLogin } = useMutation(SignInDocument)
afterLoginError((error) => {
  message.value = error.message
})
afterLogin((res: any) => {
  if (res.data?.signIn) {
    notify.fire({
      message: 'Login successfully',
      type: NotifyType.SUCCESS
    })
    writeToken(res.data.signIn)
  }
})

const { mutate: signup, onError: afterSignUpError, onDone: afterSignUp } = useMutation(SignUpDocument)
afterSignUpError((error) => {
  message.value = error.message
})
afterSignUp((res: any) => {
  if (res.data?.signUp) {
    notify.fire({
      message: 'Sign up successfully',
      type: NotifyType.SUCCESS
    })
    writeToken(res.data.signUp)
  }
})

const submit = () => {
  if (!validate()) {
    return
  }
  if (isLogin.value) {
    login({
      input: {
        email: form.value.email,
        password: form.value.password
      }
    })
  } else {
    signup({
      input: {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password
      }
    })
  }
}
</script>

<style scoped></style>
