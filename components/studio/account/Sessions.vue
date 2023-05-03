<template>
  <studio-account-tab
    name="Log out other sessions"
    subject="Please enter your password to confirm you would like to log out of your other sessions across all of your devices."
  >
    <form class="md:col-span-2">
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div class="col-span-full">
          <label for="logout-password" class="block text-sm font-medium leading-6 text-white">Your password</label>
          <div class="mt-2">
            <input id="logout-password" name="password" type="password" autocomplete="current-password" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
          </div>
        </div>
      </div>

      <div class="mt-8 flex">
        <button type="submit" class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          Log out other sessions
        </button>
      </div>
    </form>
  </studio-account-tab>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
