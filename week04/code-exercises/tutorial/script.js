const name = document.querySelector('#name')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')
const form = document.querySelector('#form')
const errorElement = document.querySelector('#error')

form.addEventListener('submit', (e) => {
    let messages = []
    if (name.value === '' || name.value == null) {
        messages.push('Name is required')
    }

    if (password.value.length <= 6) {
        messages.push('Password must be longer than 6 characters')
    }

    if (password.value.length >= 20) {
        messages.push('Password must be less than 20 characters')
    }

    if (password.value === 'password') {
        messages.push('Password cannot be \"password\"')
    }

    if (password2.value !== password.value) {
        messages.push('Passwords do not match')
    }

    if (messages.length > 0) {
        e.preventDefault()
        console.log(messages)
        errorElement.innerText = messages.join(', ')
    }
})