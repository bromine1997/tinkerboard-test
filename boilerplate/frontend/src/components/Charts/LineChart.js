import { Line } from 'vue-chartjs'
import { defineComponent, ref, watch, onMounted } from 'vue'
import { Chart as ChartJS } from 'chart.js'

export default defineComponent({
  name: 'line-chart',
  components: { Line },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    extraOptions: {
      type: Object,
      default: () => ({})
    },
    gradientColors: {
      type: Array,
      default: () => [
        "rgba(72,72,176,0.2)",
        "rgba(72,72,176,0.0)",
        "rgba(119,52,169,0)",
      ],
      validator: (val) => val.length > 2
    },
    gradientStops: {
      type: Array,
      default: () => [1, 0.4, 0],
      validator: (val) => val.length > 2
    }
  },
  setup(props) {
    const chartId = ref('line-chart-' + Math.random().toString(36).substring(2, 9))
    const ctx = ref(null)

    const updateGradients = (chartData) => {
      if (!chartData) return;
      
      const context = ctx.value || document.getElementById(chartId.value).getContext('2d')
      ctx.value = context
      
      const gradientStroke = context.createLinearGradient(0, 230, 0, 50)
      
      gradientStroke.addColorStop(
        props.gradientStops[0],
        props.gradientColors[0]
      )
      gradientStroke.addColorStop(
        props.gradientStops[1],
        props.gradientColors[1]
      )
      gradientStroke.addColorStop(
        props.gradientStops[2],
        props.gradientColors[2]
      )

      chartData.datasets.forEach((set) => {
        set.backgroundColor = gradientStroke
      })
    }

    watch(
      () => props.chartData,
      (newVal) => {
        updateGradients(newVal)
      },
      { immediate: true }
    )

    return {
      chartId,
      updateGradients
    }
  },
  render() {
    return (
      <Line
        id={this.chartId}
        data={this.chartData}
        options={this.extraOptions}
      />
    )
  }
})