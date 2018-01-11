const sites = ["湘湖", "滨康路", "西兴", "滨和路", "江陵路", "近江", "婺江路", "城站", "定安路", "龙翔桥", "凤起路", "武林广场", "西湖文化广场", "打铁关", "火车东站", "闸弄口", "彭埠", "七堡", "九和路", "九堡", "客运中心", "下沙西", "金沙湖", "高沙路", "文泽路"]
const data = []
for (let i = 0; i < sites.length; i++) {
  for (j = sites.length - 1; j >= i; j--) {
    let price = 0
    const step = Math.abs(j - i)
    if (step <= 2) {
      price = 2
    } else if (step <= 4) {
      price = 3
    } else if (step <= 7) {
      price = 4
    } else if (step <= 13) {
      price = 5
    } else if (step <= 16) {
      price = 6
    } else if (step <= 21) {
      price = 7
    } else {
      price = 8
    }
    const obj = {
      from: sites[i],
      to: sites[j],
      price,
    }
    data.push(obj)
  }
}

const chart = new G2.Chart({
  container: 'c1',
  forceFit: true,
  height: 500,
  padding: [32, 32, 32, 100],
})

const defs = {
  from: {
    values: sites,
  },
  to: {
    values: sites.slice(0).reverse(),
  },
}

chart.source(data, defs)
chart.axis('from', false)
chart.axis('to', {
  title: null,
  grid: null,
  tickLine: null,
})

chart.polygon()
  .position('from*to')
  .shape('stroke')
  .color('price')
  .label('price', {
    offset: 0,
  })

for (let i = 0; i < sites.length - 2; i++) {
  const site = sites[i]
  const nextSite = sites[i + 1]
  chart.guide().text({
    position: [nextSite, site],
    content: site,
  })
}

chart.render()