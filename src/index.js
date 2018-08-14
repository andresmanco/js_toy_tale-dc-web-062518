const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const form = document.querySelector('.add-toy-form')
let addToy = false


window.addEventListener('load', fetchToys)
form.addEventListener('submit', clickHandler)


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json =>json.forEach((toy)=>{
    createToy(toy)
  }))
}

function createToy(toy){
  let collectionDiv = document.querySelector('#toy-collection')
  let cardDiv = document.createElement('div')
  cardDiv.id = `card-${toy.id}`
  cardDiv.classList.add('card')
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  let img = document.createElement('img')
  img.src = toy.image
  img.classList.add('toy-avatar')
  let p = document.createElement('p')
  p.innerText = toy.likes
  let likeButton = document.createElement('button')
  likeButton.innerText = 'Like 👍'
  likeButton.classList.add('like-btn')
  likeButton.addEventListener('click', like)
  collectionDiv.appendChild(cardDiv)
  cardDiv.appendChild(h2)
  cardDiv.appendChild(img)
  cardDiv.appendChild(p)
  cardDiv.appendChild(likeButton)
}

function clickHandler(e){
  e.preventDefault();
  let name = document.querySelector('#nameInput').value
  let img = document.querySelector('#imgInput').value
  form.reset()
  addNewToy(name, img);
}

function addNewToy(name, img){
  fetch('http://localhost:3000/toys', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      image: img,
      likes: 0
    })
  }).then(res => res.json())
  .then(json => {createToy(json)})
}

function like(e){
  let cardDiv = e.currentTarget.parentNode
  let id = cardDiv.id.split('-')[1]
  let name = cardDiv.querySelector(`h2`).innerText
  let img = cardDiv.querySelector(`img`).src
  let likes = cardDiv.querySelector(`p`)
  patchFetch(id, name, img, likes, cardDiv)
}

function patchFetch(id, name, img, likes, cardDiv){
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      image: img,
      likes: ++likes.innerText
    })
  })
}
