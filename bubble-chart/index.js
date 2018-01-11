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

chart.coord('rect')

chart.scale('number', {
  min: 0,
  max: 25,
})

chart.legend('number', false)

chart
  .point()
  .position('type*number')
  .size('number', [20, 40])
  .shape('circle')
  .color('type')

chart.render()
