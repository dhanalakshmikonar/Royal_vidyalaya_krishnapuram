// Inject chatbot HTML
// Add styles for chatbot toggle button
const style = document.createElement('style');
style.textContent = `
  #chatbot-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #004080;
    color: white;
    border-radius: 50%;
    padding: 14px;
    font-size: 24px;
    cursor: pointer;
    z-index: 9999;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    transition: background 0.3s;
  }
  #chatbot-toggle:hover {
    background-color: #0066cc;
  }
`;
document.head.appendChild(style);

// Toggle chatbot display
function toggleChatbot() {
  const root = document.getElementById('school-chatbot-root');
  if (root.innerHTML === '') {
    injectChatbot();
    root.style.display = 'block';
  } else {
    root.style.display = root.style.display === 'none' ? 'block' : 'none';
  }
}

document.getElementById('school-chatbot-root').innerHTML = `
  <div class="chat-container">
    <div class="header">
        <button class="clear-btn" onclick="clearChat()">Clear Chat</button>
        <h1>👑 Royal School</h1>
        <p>School Information Assistant</p>
    </div>
    <div class="quick-buttons" id="quickButtons">
        <p>Quick questions:</p>
        <div class="button-grid">
            <button class="quick-btn" onclick="askQuestion('Admissions Process')">📝 Admissions Process</button>
            <button class="quick-btn" onclick="askQuestion('Academic Programs')">📚 Academic Programs</button>
            <button class="quick-btn" onclick="askQuestion('School Calendar')">📅 School Calendar</button>
            <button class="quick-btn" onclick="askQuestion('Contact Information')">📞 Contact Information</button>
            <button class="quick-btn" onclick="askQuestion('School Hours')">🕒 School Hours</button>
            <button class="quick-btn" onclick="askQuestion('Location')">📍 Location & Directions</button>
        </div>
    </div>
    <div class="chat-messages" id="chatMessages">
        <div class="message bot">
            <div class="avatar bot-avatar">🤖</div>
            <div>
                <div class="message-bubble">
                    Welcome to Royal School! 👑 I'm here to help you with information about our school, admissions, academics, events, and more. How can I assist you today?
                </div>
                <div class="timestamp" id="welcomeTime"></div>
            </div>
        </div>
    </div>
    <div class="typing" id="typingIndicator">
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    </div>
    <div class="input-area">
        <div class="input-container">
            <textarea class="input-field" id="messageInput" placeholder="Ask about admissions, academics, events, or anything else about our school..." rows="1" onkeydown="handleKeyPress(event)"></textarea>
            <button class="send-btn" id="sendButton" onclick="sendMessage()">➤</button>
        </div>
        <div class="footer-info">
            📞 For immediate assistance: 085319 63686 | 📧 info@royalschool.edu
        </div>
    </div>
  </div>
`;

document.getElementById('welcomeTime').textContent = new Date().toLocaleTimeString();


// === JS Logic Below ===

async function getBotResponse(question) {
  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question })
    });
    const data = await response.json();
    return data.reply;
  } catch (err) {
    return "⚠️ Unable to connect. Please try again later.";
  }
}

function addMessage(text, isUser = false) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
  messageDiv.innerHTML = `
    <div class="avatar ${isUser ? 'user-avatar' : 'bot-avatar'}">
      ${isUser ? '👤' : '🤖'}
    </div>
    <div>
      <div class="message-bubble">${text.replace(/\n/g, '<br>')}</div>
      <div class="timestamp">${new Date().toLocaleTimeString()}</div>
    </div>
  `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  document.getElementById('typingIndicator').style.display = 'block';
}

function hideTyping() {
  document.getElementById('typingIndicator').style.display = 'none';
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, true);
  input.value = '';
  showTyping();

  getBotResponse(question).then(response => {
    hideTyping();
    addMessage(response);
  });
}

function handleKeyPress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

function clearChat() {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = `
    <div class="message bot">
      <div class="avatar bot-avatar">🤖</div>
      <div>
        <div class="message-bubble">
          Welcome to Royal School! 👑 I'm here to help you with information about our school, admissions, academics, events, and more. How can I assist you today?
        </div>
        <div class="timestamp">${new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  `;
  document.getElementById('quickButtons').style.display = 'block';
}

function askQuestion(question) {
  document.getElementById('quickButtons').style.display = 'none';
  addMessage(question, true);
  showTyping();
  getBotResponse(question).then(response => {
    hideTyping();
    addMessage(response);
  });
}
