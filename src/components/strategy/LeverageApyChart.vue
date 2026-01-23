<script setup>
import { computed } from 'vue'

const props = defineProps({
  baseApy: {
    type: Number,
    default: 10
  },
  highlightRange: {
    type: Array,
    default: () => [3, 5]
  }
})

// Chart dimensions - increased for better label spacing
const chartConfig = {
  width: 440,
  height: 300,
  padding: { top: 40, right: 40, bottom: 65, left: 50 },
  maxLeverage: 15
}

// Scale functions
const scaleX = (leverage) => {
  const { padding, width, maxLeverage } = chartConfig
  return padding.left + (leverage / maxLeverage) * (width - padding.left - padding.right)
}

const scaleY = (percent) => {
  const { padding, height } = chartConfig
  const chartHeight = height - padding.top - padding.bottom
  return padding.top + chartHeight - (percent / 100) * chartHeight
}

// Calculate APY capture percentage for a given leverage
const calculateCapture = (leverage) => {
  if (leverage <= 0) return 0
  return (leverage / (leverage + 1)) * 100
}

// Generate curve path with smooth sampling
const curvePath = computed(() => {
  const points = []
  const samples = 100

  for (let i = 0; i <= samples; i++) {
    const leverage = 0.1 + (i / samples) * (chartConfig.maxLeverage - 0.1)
    const capture = calculateCapture(leverage)
    points.push(`${scaleX(leverage).toFixed(1)},${scaleY(capture).toFixed(1)}`)
  }

  return `M ${points.join(' L ')}`
})

// Key data points with smart label positioning
const dataPoints = computed(() => [
  { leverage: 1, labelPos: 'above-left', inSweetSpot: false },
  { leverage: 3, labelPos: 'below', inSweetSpot: true },
  { leverage: 5, labelPos: 'above-right', inSweetSpot: true },
  { leverage: 10, labelPos: 'above', inSweetSpot: false }
].map(point => {
  const capture = calculateCapture(point.leverage)
  const x = scaleX(point.leverage)
  const y = scaleY(capture)

  // Calculate label offset based on position
  let labelX = x
  let labelY = y - 14
  let textAnchor = 'middle'

  switch (point.labelPos) {
    case 'above-left':
      labelX = x - 5
      labelY = y - 14
      textAnchor = 'end'
      break
    case 'above-right':
      labelX = x + 5
      labelY = y - 14
      textAnchor = 'start'
      break
    case 'below':
      labelY = y + 22
      break
    case 'above':
    default:
      labelY = y - 14
      break
  }

  return {
    ...point,
    x,
    y,
    labelX,
    labelY,
    textAnchor,
    capture: Math.round(capture),
    label: `${Math.round(capture)}%`
  }
}))

// Sweet spot zone dimensions
const sweetSpot = computed(() => ({
  x: scaleX(props.highlightRange[0]),
  width: scaleX(props.highlightRange[1]) - scaleX(props.highlightRange[0]),
  y: chartConfig.padding.top,
  height: chartConfig.height - chartConfig.padding.top - chartConfig.padding.bottom
}))

// Y-axis grid lines
const yGridLines = [0, 25, 50, 75, 100]

// X-axis tick marks
const xTicks = [1, 3, 5, 10, 15]
</script>

<template>
  <div class="leverage-chart-container">
    <!-- Chart title/legend above SVG -->
    <div class="chart-legend">
      <span class="legend-item">
        <span class="legend-dot"></span>
        APY Capture Rate
      </span>
      <span class="legend-item sweet-spot-legend">
        <span class="legend-box"></span>
        Optimal Range (3-5x)
      </span>
    </div>

    <svg
      :viewBox="`0 0 ${chartConfig.width} ${chartConfig.height}`"
      preserveAspectRatio="xMidYMid meet"
      class="leverage-chart"
    >
      <defs>
        <!-- Sweet spot gradient -->
        <linearGradient id="sweetSpotGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0066FF" stop-opacity="0.10"/>
          <stop offset="100%" stop-color="#0066FF" stop-opacity="0.02"/>
        </linearGradient>

        <!-- Risk gradient for bottom bar -->
        <linearGradient id="riskGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#00C853"/>
          <stop offset="40%" stop-color="#F59E0B"/>
          <stop offset="100%" stop-color="#FF3B30"/>
        </linearGradient>

        <!-- Curve gradient -->
        <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0066FF"/>
          <stop offset="100%" stop-color="#0052CC"/>
        </linearGradient>
      </defs>

      <!-- Background grid lines -->
      <g class="grid">
        <line
          v-for="y in yGridLines"
          :key="`grid-${y}`"
          :x1="chartConfig.padding.left"
          :y1="scaleY(y)"
          :x2="chartConfig.width - chartConfig.padding.right"
          :y2="scaleY(y)"
          class="grid-line"
        />
      </g>

      <!-- Sweet spot highlight zone -->
      <rect
        :x="sweetSpot.x"
        :y="sweetSpot.y"
        :width="sweetSpot.width"
        :height="sweetSpot.height"
        fill="url(#sweetSpotGradient)"
        class="sweet-spot-zone"
      />

      <!-- 100% asymptote line -->
      <line
        :x1="chartConfig.padding.left"
        :y1="scaleY(100)"
        :x2="chartConfig.width - chartConfig.padding.right"
        :y2="scaleY(100)"
        class="asymptote-line"
      />
      <text
        :x="chartConfig.width - chartConfig.padding.right + 5"
        :y="scaleY(100) + 4"
        class="asymptote-label"
      >
        100%
      </text>

      <!-- Main curve -->
      <path
        :d="curvePath"
        class="curve-path"
        stroke="url(#curveGradient)"
      />

      <!-- Data points with smart positioning -->
      <g v-for="point in dataPoints" :key="point.leverage" class="data-point-group">
        <!-- Connector line for below labels -->
        <line
          v-if="point.labelPos === 'below'"
          :x1="point.x"
          :y1="point.y + 6"
          :x2="point.x"
          :y2="point.labelY - 10"
          class="label-connector"
        />

        <!-- Point circle -->
        <circle
          :cx="point.x"
          :cy="point.y"
          r="5"
          class="data-point"
          :class="{ 'in-sweet-spot': point.inSweetSpot }"
        />

        <!-- Label with leverage + percentage -->
        <text
          :x="point.labelX"
          :y="point.labelY"
          :text-anchor="point.textAnchor"
          class="data-label"
          :class="{ 'in-sweet-spot': point.inSweetSpot }"
        >
          {{ point.label }}
        </text>
      </g>

      <!-- Y-axis -->
      <g class="y-axis">
        <line
          :x1="chartConfig.padding.left"
          :y1="chartConfig.padding.top"
          :x2="chartConfig.padding.left"
          :y2="chartConfig.height - chartConfig.padding.bottom"
          class="axis-line"
        />
        <text
          v-for="y in yGridLines"
          :key="`y-label-${y}`"
          :x="chartConfig.padding.left - 8"
          :y="scaleY(y) + 4"
          class="axis-label y-label"
        >
          {{ y }}%
        </text>
      </g>

      <!-- X-axis -->
      <g class="x-axis">
        <line
          :x1="chartConfig.padding.left"
          :y1="chartConfig.height - chartConfig.padding.bottom"
          :x2="chartConfig.width - chartConfig.padding.right"
          :y2="chartConfig.height - chartConfig.padding.bottom"
          class="axis-line"
        />
        <g v-for="x in xTicks" :key="`x-tick-${x}`">
          <line
            :x1="scaleX(x)"
            :y1="chartConfig.height - chartConfig.padding.bottom"
            :x2="scaleX(x)"
            :y2="chartConfig.height - chartConfig.padding.bottom + 5"
            class="tick-line"
          />
          <text
            :x="scaleX(x)"
            :y="chartConfig.height - chartConfig.padding.bottom + 18"
            class="axis-label x-label"
          >
            {{ x }}x
          </text>
        </g>
        <text
          :x="(chartConfig.padding.left + chartConfig.width - chartConfig.padding.right) / 2"
          :y="chartConfig.height - chartConfig.padding.bottom + 38"
          class="axis-title"
        >
          Leverage
        </text>
      </g>

      <!-- Risk indicator bar -->
      <g class="risk-indicator">
        <rect
          :x="chartConfig.padding.left"
          :y="chartConfig.height - 18"
          :width="chartConfig.width - chartConfig.padding.left - chartConfig.padding.right"
          height="5"
          rx="2.5"
          fill="url(#riskGradient)"
          opacity="0.6"
        />
        <text
          :x="chartConfig.padding.left"
          :y="chartConfig.height - 4"
          class="risk-label left"
        >
          Safer Margin
        </text>
        <text
          :x="chartConfig.width - chartConfig.padding.right"
          :y="chartConfig.height - 4"
          class="risk-label right"
        >
          Liquidation Risk
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.leverage-chart-container {
  width: 100%;
  max-width: 520px;
  margin: 2rem auto;
}

/* Legend above chart */
.chart-legend {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #475569;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #0066FF;
}

.legend-box {
  width: 14px;
  height: 10px;
  border-radius: 2px;
  background: rgba(0, 102, 255, 0.15);
  border: 1px solid rgba(0, 102, 255, 0.3);
}

.leverage-chart {
  width: 100%;
  height: auto;
  display: block;
}

/* Grid */
.grid-line {
  stroke: rgba(0, 0, 0, 0.06);
  stroke-width: 1;
  stroke-dasharray: 4 4;
}

/* Sweet spot zone */
.sweet-spot-zone {
  transition: opacity 0.3s ease;
}

/* Asymptote */
.asymptote-line {
  stroke: #CBD5E1;
  stroke-width: 1;
  stroke-dasharray: 6 4;
}

.asymptote-label {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 9px;
  fill: #94A3B8;
  text-anchor: start;
}

/* Main curve */
.curve-path {
  fill: none;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Data points */
.data-point {
  fill: #0066FF;
  stroke: white;
  stroke-width: 2;
  transition: r 0.2s ease;
}

.data-point.in-sweet-spot {
  fill: #0052CC;
}

.data-point-group:hover .data-point {
  r: 7;
}

.label-connector {
  stroke: #CBD5E1;
  stroke-width: 1;
  stroke-dasharray: 2 2;
}

.data-label {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 10px;
  font-weight: 600;
  fill: #334155;
}

.data-label.in-sweet-spot {
  fill: #0052CC;
}

/* Axes */
.axis-line {
  stroke: #E2E8F0;
  stroke-width: 1;
}

.tick-line {
  stroke: #E2E8F0;
  stroke-width: 1;
}

.axis-label {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 10px;
  fill: #94A3B8;
}

.y-label {
  text-anchor: end;
}

.x-label {
  text-anchor: middle;
}

.axis-title {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 500;
  fill: #64748B;
  text-anchor: middle;
}

/* Risk indicator */
.risk-label {
  font-family: 'Inter', sans-serif;
  font-size: 8px;
  fill: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.risk-label.left {
  text-anchor: start;
}

.risk-label.right {
  text-anchor: end;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .leverage-chart-container {
    max-width: 100%;
    padding: 0 0.5rem;
  }

  .chart-legend {
    gap: 1rem;
  }

  .legend-item {
    font-size: 0.75rem;
  }

  .data-label {
    font-size: 9px;
  }

  .axis-label {
    font-size: 9px;
  }
}

/* Animation for curve drawing */
@keyframes drawCurve {
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.curve-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  animation: drawCurve 1.5s ease-out;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .curve-path {
    animation: none;
    stroke-dasharray: none;
  }

  .data-point {
    transition: none;
  }
}
</style>
