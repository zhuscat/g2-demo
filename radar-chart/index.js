const data = [
  { item: 'CPU', value: 80, brand: 'brand1' },
  { item: 'RAM', value: 75, brand: 'brand1' },
  { item: 'ROM', value: 50, brand: 'brand1' },
  { item: 'GPU', value: 85, brand: 'brand1' },
  { item: 'Display', value: 98, brand: 'brand1' },
  { item: 'CPU', value: 90, brand: 'brand2' },
  { item: 'RAM', value: 85, brand: 'brand2' },
  { item: 'ROM', value: 70, brand: 'brand2' },
  { item: 'GPU', value: 65, brand: 'brand2' },
  { item: 'Display', value: 80, brand: 'brand2' },
]

const chart = new G2.Chart({
  container: 'c1',
  forceFit: true,
  height: 600,
  padding: [60, 60, 100, 60],
})

chart.source(data)

chart.coord('polar')
chart.axis('value', {
  grid: {
    type: 'polygon'
  }
})
chart.axis('item', {
  line: null,
})

chart.scale('value', {
  min: 0,
  max: 100,
  tickCount: 11,
})
chart.area().position('item*value').color('brand')
chart
  .point()
  .position('item*value')
  .color('brand')

chart.render()
