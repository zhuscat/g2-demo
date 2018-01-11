const data = [
  { step: '浏览网站', value: 1.0 },
  { step: '放入购物车', value: 0.5 },
  { step: '生成订单', value: 0.3 },
  { step: '支付订单', value: 0.2 },
  { step: '完成交易', value: 0.1 },
]

const chart = new G2.Chart({
  container: 'c1',
  forceFit: true,
  height: 580,
  padding: [50, 100, 80, 50],
})

chart.source(data)
chart.axis('step', false)
chart.axis('value', false)
chart.coord().transpose().scale(1, -1)

chart
  .intervalSymmetric()
  .position('step*value')
  .color('step')
  .shape('funnel')
  .label('step', {
    textStyle: {
      textAlign: 'start',
    },
    offset: 5,
  })

chart.render()