<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart" style="height: 400px; width: 100%">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">
                  {{ $t('dashboard.totalShipments') }}
                </h5>
                <h2 class="card-title">{{ $t('dashboard.performance') }}</h2>
              </div>
              <div class="col-sm-6">
                <div
                  class="btn-group btn-group-toggle"
                  :class="isRTL ? 'float-left' : 'float-right'"
                  data-toggle="buttons"
                >
                  <label
                    v-for="(option, index) in bigLineChartCategories"
                    :key="option"
                    class="btn btn-sm btn-primary btn-simple"
                    :class="{ active: bigLineChart.activeIndex === index }"
                    :id="index"
                  >
                    <input
                      type="radio"
                      @click="initBigChart(index)"
                      name="options"
                      autocomplete="off"
                      :checked="bigLineChart.activeIndex === index"
                    />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area" style="height: 100%; width: 100%">
            <line-chart
              ref="bigChart"
              chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData"
              :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops"
              :extra-options="bigLineChart.extraOptions"
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
};
</script>

<style scoped>
.row {
  margin-top: 20px;
}
</style>

