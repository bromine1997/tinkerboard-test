<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart" style="height: 400px; width: 100%">
          <div class="chart-area" style="height: 100%; width: 100%">
            <line-chart ref="lineChart"></line-chart>
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
};
</script>

<style scoped>
.row {
  margin-top: 20px;
}
</style>

