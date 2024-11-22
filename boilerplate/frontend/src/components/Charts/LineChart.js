import { defineComponent, ref, watch, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

export default defineComponent({
  name: 'LineChart',
  components: {
    Line
  },
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
    const chartData = ref({ ...props.chartData })
    
    const updateGradients = () => {
      if (!chartData.value || !chartData.value.datasets) return
      
      const canvas = document.getElementById(chartId.value)
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)
      
      props.gradientStops.forEach((stop, index) => {
        gradientStroke.addColorStop(stop, props.gradientColors[index])
      })

      chartData.value.datasets = chartData.value.datasets.map(dataset => ({
        ...dataset,
        backgroundColor: gradientStroke
      }))
    }

    watch(
      () => props.chartData,
      (newVal) => {
        chartData.value = { ...newVal }
        nextTick(() => {
          updateGradients()
        })
      },
      { deep: true }
    )

    onMounted(() => {
      nextTick(() => {
        updateGradients()
      })
    })

    return () => (
      <Line
        id={chartId.value}
        data={chartData.value}
        options={props.extraOptions}
      />
    )
  }
})