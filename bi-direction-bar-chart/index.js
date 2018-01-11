const data = [
  { department: '部门0', group: '组0', fulfilled: 11, undo: 2 },
  { department: '部门0', group: '组1', fulfilled: 8, undo: 3 },
  { department: '部门0', group: '组2', fulfilled: 6, undo: 4 },
  { department: '部门1', group: '组3', fulfilled: 5, undo: 10 },
  { department: '部门1', group: '组4', fulfilled: 9, undo: 6 },
  { department: '部门1', group: '组5', fulfilled: 12, undo: 9 },
  { department: '部门2', group: '组6', fulfilled: 7, undo: 5 },
  { department: '部门2', group: '组7', fulfilled: 8, undo: 7 },
  { department: '部门2', group: '组8', fulfilled: 16, undo: 3 },
]

const DataView = DataSet.DataView
const dv = new DataView()

// fold 的操作：
// { department: '部门0', group: '组0', fulfilled: 11, undo: 2 }
// ->
// { fulfill_state: 'fulfilled', num: 11, department: '部门0', group: '组0', fulfilled: 11, undo: 2 }
// { fulfill_state: 'undo', num: 2, department: '部门0', group: '组0', fulfilled: 11, undo: 2 },
dv.source(data)
  .transform({
    type: 'sort',
    callback: (obj1, obj2) => {
      return obj1['department'] > obj2['department'] ? 1 : -1
    }
  })
  .transform({
    type: 'map',
    callback: obj => {
      obj['fulfilled'] *= -1
      return obj
    }
  })
  .transform({
    type: 'fold',
    fields: ['fulfilled', 'undo'],
    key: 'fulfill_state',
    value: 'num',
  })

const chart = new G2.Chart({
  container: 'c1',
  width: 800,
  height: 600,
})

chart.source(dv)

chart.coord().transpose()

chart.axis('num', {
  label: {
    formatter: value => {
      value = parseInt(value)
      return Math.abs(value)
    }
  }
})

chart.interval()
  .position('group*num')
  .color('department')
  .shape('fulfill_state', ['rect', 'hollowRect'])
  .style({
    lineWidth: 1,
  })

chart.render()

chart.on('tooltip:change', (config) => {
  console.log(config)
  config.items.forEach(item => {
    item.value = Math.abs(item.value)
  })
})
