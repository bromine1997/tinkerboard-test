import { defineComponent, ref, watch, onMounted, h } from 'vue'
import { Line } from 'vue-chartjs'
import Chart from 'chart.js/auto' // 'chart.js/auto'를 사용하여 모든 컴포넌트를 자동 등록

export default defineComponent({
  name: 'LineChart',
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
      
      props.gradientStops.forEach((stop, index) => {
        gradientStroke.addColorStop(stop, props.gradientColors[index])
      })

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

    onMounted(() => {
      updateGradients(props.chartData)
    })

    return {
      chartId,
      ctx
    }
  },
  render() {
    return h(Line, {
      id: this.chartId,
      data: this.chartData,
      options: this.extraOptions
    })
  }
})
