fetch('/data/iris-nowrap.json').then(res => res.json()).then((data) => {
  const fields = ['SepalLength','SepalWidth','PetalLength','PetalWidth']
  fields.forEach((field, i) => {
    const dv = new DataSet.DataView()
    dv.source(data)
    dv.transform({
      type: 'bin.histogram',
      field,
      bins: 10,
      groupBy: 'Species',
      as: [field, 'count'],
    })
  })
})
