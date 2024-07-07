<script lang="ts">
    import { onMount } from 'svelte';
    import {Chart} from 'chart.js/auto';
    export {default as Temo} from './temp.svelte';
   let value = 50; // Default value for CPU temperature
   let label = 'CPU Temperature';
   let unit = '°C';
  
    let canvas;
  
    onMount(() => {
      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [label, ''],
          datasets: [{
            data: [value, 100-value],
            backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(200, 200, 200, 0.5)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(200, 200, 200, 0)'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%', // Make it a doughnut chart
          rotation: 0, // Start the chart from the top
          circumference: 360, // Make it a half-doughnut
          plugins: {
            tooltip: { enabled: false },
            legend: { display: false }
          }
        }
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
    <div class="chart-label">{value}{unit}</div>
  </div>
  