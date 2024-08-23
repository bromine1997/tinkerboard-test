<template>
  <div>
    <div class="row">
      <div class="col-12">
        <button @click="startChartDrawing">Start Drawing</button>
        <card type="chart" style="height: 400px; width: 100%">
          <div class="chart-area" style="height: 100%; width: 100%">
            <line-chart
              ref="lineChart"
              :chart-data="chartData"
              :extra-options="chartOptions"
            />
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/Charts/LineChart';

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      chartData: {
        datasets: [
          {
            label: 'Dataset 1',
            borderColor: 'red',
            data: [
              { x: 0, y: 10 },
              { x: 1, y: 20 },
              { x: 2, y: 30 },
              { x: 3, y: 40 },
              { x: 4, y: 50 },
            ],
          },
        ],
      },
      chartOptions: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
        },
      },
    };
  },
  methods: {
    startChartDrawing() {
      this.$refs.lineChart.startDrawing();
    },
  },
};
</script>

<style scoped>
.row {
  margin-top: 20px;
}
</style>
