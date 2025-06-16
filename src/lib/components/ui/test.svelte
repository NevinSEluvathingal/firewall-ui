<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Chart } from 'chart.js/auto';
  import { deviceno } from "../../../store";
  export { default as Test } from './test.svelte';

  let chart;
  let ctx;
  let data = [];
  let data2 = []; 
  let updateInterval;
  let strEgr = '';

  interface Bandwidth {
    type: string,
    action: string,
    arg: string[],
  }

  const resp: Bandwidth = {
    type: 'bandwidth',
    action: '',
    arg: [],
  };


  async function fetchData() {
    try {
      const response = await fetch('http://192.168.1.1:3333/redq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Tokenstring': `Bearer ${token}`,
        },
        body: JSON.stringify(resp),
      });

      if (response.ok) {
        const dataResponse = await response.json();
        const macAddresses = Object.keys(dataResponse);
        const totlen=macAddresses.length;
        console.log(totlen);
        deviceno.set(totlen);
        let d = dataResponse.totalRaw;
        let di = dataResponse.total;
        let speedValue = d.egress;
        strIng = di.ingress;
        strEgr = di.egress;
        let speedValue2 = d.ingress;
        const prev = parseInt(speedValue);

    
        if (prev > chart.options.scales.y.max) {
          chart.options.scales.y.max = prev + 1000; 
        }

        if (data.length >= 50) {
          data.shift();
        }

        data.forEach((point, index) => point.x = index);
        data2.forEach((point, index) => point.x = index);
        data.push({ x: data.length, y: prev });

        chart.data.datasets[0].label = strEgr;

        chart.update();
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  onMount(() => {
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: strEgr,
            borderColor: 'red',
            borderWidth: 2,
            radius: 0,
            data: data,
          },
        ],
      },
      options: {
        animation: {
          x: {
            type: 'number',
            easing: 'easeOutQuad',
            duration: 0,
            from: NaN,
            delay(ctx) {
              if (ctx.type !== 'data' || ctx.xStarted) {
                return 0;
              }
              ctx.xStarted = true;
              return ctx.index * 20;
            }
          },
          y: {
            type: 'number',
            easing: 'easeOutQuad',
            duration: 0,
            from: 100,
            delay(ctx) {
              if (ctx.type !== 'data' || ctx.yStarted) {
                return 0;
              }
              ctx.yStarted = true;
              return ctx.index * 20;
            }
          }
        },
        interaction: {
          intersect: false,
        },
        plugins: {
          legend: true,
        },
        scales: {
          x: {
            display: false, 
            type: 'linear',
            min: 0,
            max: 49,
            duration: 100,
          },
          y: {
            display: false,
            duration: 100,
            min: 0,
            max: 10000,
          },
        },
      },
    });

    updateInterval = setInterval(fetchData, 1000);
  });

  onDestroy(() => {
    clearInterval(updateInterval);
  });
</script>

<div class="chart-container">
  <canvas bind:this={ctx} width="300" height="100"></canvas>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
  }
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>
