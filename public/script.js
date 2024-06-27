const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages')

const name = prompt("Enter Your Name: ");
socket.emit('user-connected', name);

socket.on('user-connected', (name) => {
    const person = document.createElement('li');
    person.style.listStyle = 'none';
    person.style.maxHeight = '985px';
    person.style.maxWidth = '985px';
    person.style.fontSize = 'large';
    person.style.fontWeight = 'Bold';
    person.style.marginRight = '35px';
    person.style.fontFamily = 'Trebuchet MS';
    person.style.backgroundColor = 'lightgreen';
    person.style.textAlign = 'center';
    person.style.textDecoration = 'underline';
    person.style.border = '2px solid green';
    person.textContent = `${name} has joined`;
    messages.appendChild(person);
    window.scrollTo(0, document.body.scrollHeight);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('send', input.value);
        input.value = "";
    }
})

socket.on('send', (data) => {
    const item = document.createElement('li')
    item.style.listStyle = 'none';
    item.style.maxHeight = '985px';
    item.style.maxWidth = '985px';
    item.style.fontSize = 'large';
    item.style.fontWeight = 'Bold';
    item.style.marginRight = '35px';
    item.style.fontFamily = 'Trebuchet MS';
    item.style.backgroundColor = 'lightgreen';
    item.style.marginTop = '10px';
    item.style.border = '2px solid green';
    item.style.wordWrap = 'break-word';
    item.textContent = `${data.name}: ${data.message}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})