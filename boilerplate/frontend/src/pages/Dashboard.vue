<template>
  <div>
    <div class="row">
      <div class="col-12">
        <line-chart
      
          style="height: 400px;"  <!-- 높이 조정 -->
          ref="bigChart"
          chart-id="big-line-chart"
        >
        </line-chart>
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

