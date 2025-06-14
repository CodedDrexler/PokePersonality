const form = document.querySelector('form');
const input = document.querySelector('input');
let pokeResult = '';
let pokeImageUrl = '';
const usernameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]{1,19}$/;

let test = false;

const getPokemon = (random = true, id = 132) => {


  if(['lari', 'larissa', 'lys', 'ly'].includes(input.value.trim().toLowerCase())) test = true;

  if (random) {
    id = Math.floor(Math.random() * 151) + 1;
  }

  const endpoint = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  return fetch(endpoint)
    .then(res => {
      return res.json();
    })

    .catch(error => {
      console.error(error);
    });
};



form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if(usernameRegex.test(input.value)){
    const pokemon = await getPokemon();
  
    pokeResult = pokemon.name;
    pokeImageUrl = pokemon.sprites.front_default;
  
    renderResultPage();

  }else{
    alert('Digite um nome válido.')
  }

});



const renderResultPage = ()=>{
  if(test == false){
      document.querySelector('main').innerHTML = `
  <h1><span>${input.value}</span>, seu espírito Pokemon é o ${pokeResult}!</h1>
  <div class="img-wrapper">
   <img  width="300" heigth="300" src="${pokeImageUrl}" alt="Imagem do Pokemon"/>
  </div>
  `
  }else{
      document.querySelector('main').innerHTML = `
  <h1><span>${input.value}</span>, seu espírito Pokemon é o <bold>Charmander feliz-aniversario!</bold></h1>
  <div class="img-wrapper">
   <img  width="300" heigth="300" src="${pokeImageUrl}" alt="Imagem do Pokemon"/>
  </div>
  `
  }

}
