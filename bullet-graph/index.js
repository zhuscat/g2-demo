const data = [
  {"title":"Revenue","subtitle":"US$, in thousands","ranges":[150,225,300],"actual":270,"target":250},
  {"title":"Profit","subtitle":"%","ranges":[20,25,30],"actual":23,"target":26},
  {"title":"Order Size","subtitle":"US$, average","ranges":[350,500,600],"actual":100,"target":550},
  {"title":"New Customers","subtitle":"count","ranges":[1400,2000,2500],"actual":1650,"target":2100},
  {"title":"Satisfaction","subtitle":"out of 5","ranges":[3.5,4.25,5],"actual":3.2,"target":4.4},
]

const chart = new G2.Chart({
  container: 'c1',
  width: 800,
  height: 500,
  padding: [100, 150],
})

chart.legend(false)

let y = 0
const yGap = 0.1

for (let i = 0, l = data.length; i < l; i++) {
  const ranges = data[i].ranges
  const view = chart.view({
    start: {
      x: 0,
      y,
    },
    end: {
      x: 1,
      y: y + yGap,
    },
  })
  view.source([data[i]], {
    actual: {
      min: 0,
      max: ranges[2],
      nice: false,
    },
    target: {
      min: 0,
      max: ranges[2],
      nice: false,
    },
  })
  view.coord().transpose()
  view.axis('target', {
    position: 'left'
  })
  view.axis('actual', false)

  view.point()
    .position('title*target')
    .color('#square')
    .shape('line')
    .size(12)
    .style({
      lineWidth: 2,
    })

  view.interval()
    .position('title*actual')
    .color('#223273')
    .size(15)

  view.guide().region({
    start: [-1, 0],
    end: [1, ranges[1]],
    style: {
      fill: '#ffa39e',
      fillOpacity: 0.85,
    },
  })

  view.guide().region({
    start: [-1, ranges[0]],
    end: [1, ranges[1]],
    style: {
      fill: '#ffd591',
      fillOpacity: 0.85,
    },
  })

  view.guide().region({
    start: [-1, ranges[1]],
    end: [1, ranges[2]],
    style: {
      fill: '#a7e8b4',
      fillOpacity: 0.85,
    },
  })

  y += yGap + 0.125
}

chart.render()