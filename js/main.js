function main() {

  function askSCV() {

    let info = prompt("Введи csv").split("\n")
    info = info.filter(a => /^\d+,\d+,[A-z|А-я]+,\d+/.test(a))
    info = info.map(function (string) {
      const new_string = string.substring(0, string.length - 1).split(",")
      return {x: +new_string[0], y: +new_string[1], name: new_string[2], population: +new_string[3]}
    });
    info = info.sort((a, b) => a.population < b.population ? 1 : -1);
    info = info.slice(0, 10)
    info = info.reduce(function (a, b, currentIndex) {
      a.set(b.name, {population: b.population, rating: currentIndex + 1})
      return a
    }, new Map)
    console.log(info);
    return (text) => {
      info.forEach((value, city) => {
        if (text.includes(city)) {
          let {population, rating} = info.get(city);
          text = text.replaceAll(city, `${city} (население: ${population}, рейтинг: ${rating})`)
        }
      })
      return text
    }
  }
  let func = askSCV();
  alert(func("Кропивницкий очень крутой город, лучше, чем Киев. Киев!"));
}