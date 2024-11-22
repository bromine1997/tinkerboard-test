// src/components/LineChart.js
import { defineComponent, ref, onMounted, h } from 'vue'
import { Line } from 'vue-chartjs'
import Chart from 'chart.js/auto'

export default defineComponent({
  name: 'LineChart',
  components: { Line },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    return {}
  },
  render() {
    return h(Line, {
      data: this.chartData,
      options: this.chartOptions,
      // 추가로 필요한 props가 있다면 여기에 추가
    })
  }
})
