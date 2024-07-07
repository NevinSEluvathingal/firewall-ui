<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart } from 'chart.js/auto';
  import { cpuData } from '../../store';
  import { derived } from 'svelte/store';
  export { default as Mem } from './mem.svelte';

  const Temperature = derived(cpuData, $cpuData => $cpuData.Temperature);

  let value = 10; 
  let label = 'Temperature';
  let unit = 'c';
  let canvas;
  let chart;

  onMount(() => {
      const ctx = canvas.getContext('2d');
      chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: [label, ''],
              datasets: [{
                  data: [value, 100 - value],
                  backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(200, 200, 200, 0.5)'],
                  borderColor: ['rgba(255, 99, 132, 1)', 'rgba(200, 200, 200, 0)'],
                  borderWidth: 1
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              cutout: '60%',
              rotation: 0,
              circumference: 360,
              plugins: {
                  tooltip: { enabled: false },
                  legend: { display: false }
              }
          }
      });

      // Subscribe to MemoryUsage and update the chart when it changes
      Temperature.subscribe($temp => {
          console.log('MemoryUsage:', $temp);
          value = Math.round($temp); // Round the value
          chart.data.datasets[0].data = [value, 100 - value];
          chart.update();
      });
  });
</script>

<style>
  .chart-container {
      position: relative;
      height: 200px;
      width: 200px;
  }

  .chart-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
  }
</style>

<div class="chart-container">
  <canvas bind:this={canvas}></canvas>
  <div class="chart-label">{Math.round(value)}{unit}</div>
</div>
