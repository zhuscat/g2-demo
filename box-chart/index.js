fetch('/data/iris-nowrap.json').then(res => res.json()).then(data => {
  const { DataView } = DataSet
  const dv = new DataView()
  dv.source(data)
  dv
    .transform({
      type: 'fold',
      fields: ['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth'],
      key: 'type',
      value: 'value',
      groupBy: 'Species',
    })
    .transform({
      type: 'bin.quantile',
      field: 'value',
      as: 'y',
      groupBy: ['type', 'Species'],
    })

  const colorMap = {
    'I. setosa': G2.Global.colors[0],
    'I. versicolor': G2.Global.colors[1],
    'I. virginica': G2.Global.colors[2],
  }
    
  const chart = new G2.Chart({
    container: 'c1',
    forceFit: true,
    height: 400,
  })
    
  chart.source(dv)
    
  chart.facet('rect', {
    fields: ['Species'],
    eachView(view) {
      view.schema()
        .position('type*y')
        .shape('box')
        .size(50)
        .color('Species', (key) => {
          return colorMap[key]
        })
    },
  })
  
  chart.render()
})