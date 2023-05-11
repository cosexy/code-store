<template>
  <div class="shadow-default rounded-xl bg-white px-5 py-3">
    <line-chart :chart-data="chartData" :height="280" :width="650" />
  </div>
</template>

<script lang="ts" setup>
import { Chart, registerables } from 'chart.js'
import { LineChart } from 'vue-chart-3'

Chart.register(...registerables)

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const chartData = {
  labels,
  datasets: [
    {
      label: 'Last Week',
      data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 30)),
      borderColor: '#22c55e',
      fill: false,
      cubicInterpolationMode: 'monotone',
      tension: 0.4
    },
    {
      label: 'Current Week',
      data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 30)),
      borderColor: '#f43f5e',
      fill: false,
      tension: 0.4
    }
  ]
}

</script>

<style scoped></style>
