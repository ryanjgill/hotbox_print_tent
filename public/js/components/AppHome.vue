<template>
  <div id="charts">
    <div id="chart1">
      <apexchart
        v-if="!isLoading"
        type="line"
        height="500"
        :options="chartOptionsArea"
        :series="temperatureData"
      />
    </div>
    <div id="chart2">
      <apexchart
        v-if="!isLoading"
        type="area"
        height="250"
        :options="chartOptionsBrush"
        :series="temperatureData"
      />
    </div>
  </div>
  
</template>

<script>
module.exports = {
  mounted () {
    console.log('Hello World')
  },
  created () {
    this.getAllMeasurements();
  },
  data() {
    return {
      allMeasurements: [],
      isLoading: false
    }
  },
  computed: {
    chartOptionsArea() {
      return {
        chart: {
          id: "chartArea",
          toolbar: {
            autoSelected: "zoom",
            show: true
          }
        },
        colors: ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#4CAF50"],
        stroke: {
          width: 3
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          opacity: 1
        },
        legend: {
          fontSize: '18px',
        },
        markers: {
          size: 0
        },
        title: {
          text: 'Hotbox Print Tent',
          align: 'center',
          style: {
            fontSize:  '32px',
            fontWeight:  'thin',
            fontFamily:  'Roboto',
            color:  '#263238'
          }
        },
        tooltip: {
          y: {
            formatter: deg => `${deg} °C`,
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              fontSize: '18px'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              fontSize: '18px'
            }
          },
          title:{
            text: 'Temperature (c)',
            style: {
              fontSize: '18px'
            }
          }
        }
      };
    },
    chartOptionsBrush() {
      return {
        chart: {
          id: "chartBrush",
          brush: {
            target: "chartArea",
            enabled: true
          },
          selection: {
            enabled: true
          }
        },
        colors: ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#4CAF50"],
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.91,
            opacityTo: 0.1
          }
        },
        legend: {
          fontSize: '18px',
        },
        xaxis: {
          labels: {
            style: {
                fontSize: '18px'
            }
          },
          type: "datetime",
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          labels: {
            style: {
                fontSize: '18px'
            }
          },
          tickAmount: 2
        }
      };
    },
    temperatureData() {
      return [
        {
          data: this.allMeasurements.map(m => [m.date, m.temperature]),
          name: "Temperature"
        },
        {
          data: this.allMeasurements.map(m => [m.date, m.probeA]),
          name: "Probe A"
        },
        {
          data: this.allMeasurements.map(m => [m.date, m.probeB]),
          name: "Probe B"
        },
        {
          data: this.allMeasurements.map(m => [m.date, m.probeC]),
          name: "Probe C"
        },
        {
          data: this.allMeasurements.map(m => [m.date, m.probeD]),
          name: "Probe D"
        },{
          data: this.allMeasurements.map(m => [m.date, m.probeE]),
          name: "Ambient"
        }
      ];
    }
  },
  methods: {
    getAllMeasurements() {
      this.isLoading = true;
      fetch("http://192.168.86.153:3030/measurements")
        .then(response => response.json())
        .then(results => (this.allMeasurements = results))
        .then(() => this.isLoading = false)
        .catch(error => console.error(error));
    }
  }
  
}
</script>

<style  scoped>
#charts {
  padding: 1rem;
}
</style>