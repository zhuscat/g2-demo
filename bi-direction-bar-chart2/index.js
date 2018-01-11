const data = [
  { type: 'All Survey Response', 'Strongly Agree': 50.1, 'Agree': 40.7, 'No Opinion': 4.8, 'Disagree': 4.7, 'Strongly Disagree': 0.7 },
  { type: 'Master\'s and Above', 'Strongly Agree': 50.1, 'Agree': 40.7, 'No Opinion': 4.8, 'Disagree': 4.7, 'Strongly Disagree': 0.7 }
]

const { DataView } = DataSet

const dv = new DataView()
dv.source(data)
dv
  .transform({
    type: 'map',
    callback(row) {
      row['Strongly Disagree'] *= -1
      row['Disagree'] *= -1
      return row
    }
  })
  .transform({
    type: 'fold',
    fields: ['Strongly Agree', 'Agree', 'No Opinion', 'Disagree', 'Strongly Disagree'],
    key: 'opinion',
    value: 'value'
  })

const colors = {
  'Strongly Agree': '#3561a7',
  'Agree': '#80b2d3',
  'No Opinion': '#d9f0f6',
  'Disagree': '#ec7743',
  'Strongly Disagree': '#cb2920',
}

const chart = new G2.Chart({
  container: 'c1',
  width: 1000,
  height: 400,
  padding: [20, 20, 95, 325],
})

chart.source(dv, {
  value: {
    tickInterval: 10,
  }
})

chart.coord().transpose()

chart
  .intervalStack()
  .position('type*value')
  .color('opinion', (opinion) => {
    return colors[opinion]
  })

chart.render()
