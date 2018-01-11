const data = [
  { type: '足球', number: 10 },
  { type: '篮球', number: 20 },
  { type: '乒乓球', number: 18 },
]

const chart = new G2.Chart({
  container: 'c1',
  width: 800,
  height: 600,
})

chart.source(data)

// chart.legend({
//   position: 'bottom'
// })

// chart.coord('rect').transpose()

chart.axis('number', {
  position: 'right'
})

chart
  .interval()
  .position('type*number')

chart.render()
