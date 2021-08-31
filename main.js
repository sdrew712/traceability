const Rollbar = require("rollbar")

let rollbar = new Rollbar({
  accessToken: '905e58b2bbe740af8cafcd01e7f553a7',
  captureUncaught: true,
  captureUnhandledRejections: true
})

const button = document.querySelector("button")

function getPokemon(){
  axios.get("https://pokeapi.co/api/v2/pokemon")
  .then(res => {
    let randomIndex = Math.floor(Math.random() * 20)
    pokemon = res.data.results[randomIndex].name

    let h2 = document.createElement("h2")
    let text = document.createTextNode(pokemon)
  
    h2.appendChild(text);
  
    let div = document.createElement("div")
    div.appendChild(h2)
  
    document.body.appendChild(div)

    rollbar.info("Pokemon sent successfully.")
  })
}

button.addEventListener("click", getPokemon);