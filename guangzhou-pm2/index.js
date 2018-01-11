fetch('/data/guangzhou-pm2.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'c1',
      width: 1100,
      height: 600,
      padding: [0, 0, 80, 120],
    })
    
    chart.source(data)
    chart.coord('rect').transpose()

    chart.interval().position('position_name*pm2_5')

    chart.render()

    const { DataView } = DataSet
    const chart2 = new G2.Chart({
      container: 'c2',
      width: 800,
      height: 600,
    })
    const dv = new DataView()
    dv.source(data)
      .transform({
        type: 'percent',
        field: 'pm2_5',
        dimension: 'position_name',
        as: 'percent'
      })
      .transform({
        type: 'filter',
        callback(row) {
          return row.position_name != null
        }
      })
    chart2.source(dv)
    chart2.coord('theta', {
      radius: 1,
      innerRadius: 0.3,
    })
    chart2.legend({
      title: '监测点',
      position: 'left',
    })
    chart2.tooltip({
      showTitle: false,
    })
    chart2.scale('position_name', {
      alias: '监测点'
    })
    chart2
      .intervalStack()
      .position('percent')
      .color('position_name')
      .label('pm2_5')
      .tooltip('position_name*pm2_5', (position_name, pm2_5) => {
        return {
          name: position_name,
          value: pm2_5,
        }
      })
    chart2.render()
  })
  .catch(e => {
    console.error(e)
    alert('an error hanppened')
  })
