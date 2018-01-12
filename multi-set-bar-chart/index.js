fetch('/data/population-by-age.json').then(res => res.json()).then(data => {
  console.log(data)
})
