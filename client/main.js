import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')
const chatHello = document.querySelector('.chatHello')

let loadInterval;

const loader = (element) => {
  element.textContent = ''
  chatHello.textContent = ''

  loadInterval = setInterval(() => {
    element.textContent += '.'

    if(element.textContent === '....') {
      element.textContent = ''
    }
  }, 300)
}

const typeText = (element, text) => {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
}

const generateId = () => {
  const timestamp = Date.now()
  const randomNumber = Math.random()
  const hexString = randomNumber.toString(16)

  return `id-${timestamp}-${hexString}`
}

const chatStripe = (isAi, value, id) => {
  return (
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div class="profile">
            <img 
              src="${isAi ? bot : user}"
            />
          </div>
          <div class="message" id=${id}>
            ${value}
          </div>
        </div>
      </div>
    `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const data = new FormData(form)

  chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

  chatHello.innerHTML = ''

  form.reset()

  let uniqueID = generateId()
  chatContainer.innerHTML += chatStripe(true, ' ', uniqueID)

  chatContainer.scrollTop = chatContainer.scrollHeight

  const messageDiv = document.getElementById(uniqueID)
  loader(messageDiv)

  const response = await fetch ('https://gptwellsoft.onrender.com/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })

  clearInterval(loadInterval)
  messageDiv.innerHTML = ''

  if(response.ok) {
    const data = await response.json()
    const parsedData = data.bot.trim()

    console.log({parsedData})

    typeText(messageDiv, parsedData)
  } else {
    const err = await response.text()

    alert(err)
  }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', e => {
  e.keyCode === 13 ? handleSubmit(e) : null
})