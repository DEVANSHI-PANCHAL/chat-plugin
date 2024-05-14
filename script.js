// Dynamically create and append Font Awesome CSS link
var faLink = document.createElement('link');
faLink.rel = 'stylesheet';
faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
document.head.appendChild(faLink);

// Dynamically create and append external stylesheet link
var cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = 'https://devanshi-panchal.github.io/chat-plugin/style.css';
document.head.appendChild(cssLink);

// HTML for the chatbot toggle button and popup
var chatbotToggleBtn = '<button id="chatbot-toggle-btn"><i class="fas fa-comment-alt"></i></button>';
var chatPopUp = `<div class="chatbot-popup" id="chatbot-popup">
    <div class="chat-header">
        <span>Chatbot</span>
        <button id="close-btn">&times;</button>
    </div>
    <div class="chat-box" id="chat-box"></div>
    <div class="chat-input">
        <input type="text" id="user-input" placeholder="Type a message..." />
        <button id="send-btn"><i class="far fa-paper-plane"></i></button>
    </div>
</div>`;

// Append chatbot elements to the document body
document.body.insertAdjacentHTML('beforeend', chatPopUp);
document.body.insertAdjacentHTML('beforeend', chatbotToggleBtn);

// Your existing chatbot functionality

const responses = {
    "hello": "Hi there! How can I assist you today?",
    "flight details": "Here you will find information about flight details. <a href='https://www.goindigo.in/web-check-in.html' target='_blank'>Visit Website</a>",
    "how are you": "I'm just a bot, but I'm here to help you!",
    "need help": "How can I assist you today?",
    "bye": "Goodbye! Have a great day!",
    "default": "I'm sorry, I didn't understand that. Want to connect with an expert?",
    "expert": "Great! Please wait a moment while we connect you with an expert.",
    "no": "Okay, if you change your mind just let me know!"
};

document.getElementById('chatbot-toggle-btn').addEventListener('click', toggleChatbot);
document.getElementById('close-btn').addEventListener('click', toggleChatbot);
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function toggleChatbot() {
    const chatbotPopup = document.getElementById('chatbot-popup');
    const chatBox = document.getElementById('chat-box');
    const greetingMessage = "Hello! Welcome to our Website. How can I assist you today?";
    
    if (chatbotPopup.style.display === 'none') {
        chatbotPopup.style.display = 'block';
        appendMessage('bot', greetingMessage);
    } else {
        chatbotPopup.style.display = 'none';
    }
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
        appendMessage('user', userInput);
        respondToUser(userInput.toLowerCase());
        document.getElementById('user-input').value = '';
    }
}

function respondToUser(userInput) {
    const response = responses[userInput] || responses["default"];
    setTimeout(function() {
        appendMessage('bot', response);
    }, 500);
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (sender === 'bot' && message === responses["default"]) {
        const buttonYes = document.createElement('button');
        buttonYes.textContent = '✔ Yes';
        buttonYes.onclick = function() {
            appendMessage('bot', responses["expert"]);
        };
        const buttonNo = document.createElement('button');
        buttonNo.textContent = '✖ No';
        buttonNo.onclick = function() {
            appendMessage('bot', responses["no"]);
        };
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(buttonYes);
        buttonContainer.appendChild(buttonNo);
        chatBox.appendChild(buttonContainer);
    }
}
