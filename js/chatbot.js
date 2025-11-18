// Chat functionality
const chatButton = document.getElementById('chatButton');
const chatContainer = document.getElementById('chatContainer');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');
const chatBadge = document.getElementById('chatBadge');

let conversationStarted = false;
let awaitingSendToJoseph = false;

// Knowledge base
const responses = {
    greetings: [
        "Hello! I'm Destora AI, Joseph's virtual assistant. How can I help you today?",
        "Hi there! I'm here to help you learn about Joseph's services. What would you like to know?"
    ],
    services: "Joseph offers Full-Stack Web Development, API Development & Integration, Frontend Engineering with React/Next.js, and AI & Chatbot Development. Which service interests you?",
    pricing: "Project pricing varies based on complexity:\n\nSimple websites: $500-$1,500\nE-commerce sites: $2,000-$5,000\nCustom web apps: $3,000-$10,000+\nAI chatbots: $1,000-$3,000\n\nWould you like to discuss your specific project?",
    technologies: "Joseph works with: Flask, Python, Next.js, React, PHP, JavaScript, Webflow, HTML/CSS, FastAPI, and C++. He also integrates APIs like Stripe, Paystack, and Google Maps.",
    experience: "Joseph has 4+ years of experience in software engineering and web development. He's completed 20+ projects for 10+ clients, including Travel Afric and Annuva Homes.",
    timeline: "Project timelines:\n\nSimple websites: 1-2 weeks\nMedium projects: 3-4 weeks\nComplex applications: 4-8 weeks\n\nTimelines depend on project scope and your feedback speed.",
    contact: "You can reach Joseph through:\n\nEmail: Destoratech55@gmail.com\nPhone: +233 593 4258 54\nWhatsApp: +233 596 523 065\n\nWould you like me to send him a message with your inquiry?",
    portfolio: "Joseph has completed projects such as:\n\nTravel Afric - Full travel booking platform with payments\nAnnuva Homes - AI chatbot for property management\nSaaS dashboards for analytics and reporting\n\nWould you like more details?",
    support: "All projects include 30 days of free support for fixes and small updates. Extended support packages are available.",
    location: "Joseph is based in Gomoa Fetteh, Ghana, but works with clients worldwide.",
    payment: "Joseph accepts:\n\n50% deposit to start\nMilestone payments\nFinal payment on completion\n\nPayment methods include bank transfer, PayPal, Stripe, and Paystack."
};

const quickReplies = [
    { text: "Pricing", keyword: "pricing" },
    { text: "Services", keyword: "services" },
    { text: "Timeline", keyword: "timeline" },
    { text: "Contact", keyword: "contact" }
];

// Initialize chat
function initChat() {
    addBotMessage(responses.greetings[0]);
    addQuickReplies(quickReplies);
}

// Toggle chat
chatButton.addEventListener('click', () => {
    chatContainer.classList.add('active');
    chatBadge.style.display = 'none';
    if (!conversationStarted) {
        initChat();
        conversationStarted = true;
    }
    chatInput.focus();
});

chatClose.addEventListener('click', () => {
    chatContainer.classList.remove('active');
});

// Add message
function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = content.replace(/\n/g, '<br>');

    messageDiv.appendChild(contentDiv);
    typingIndicator.classList.remove('active');

    chatMessages.insertBefore(messageDiv, typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(message) {
    addMessage(message, 'bot');
}

function addUserMessage(message) {
    addMessage(message, 'user');
}

// Quick replies
function addQuickReplies(replies) {
    const quickRepliesDiv = document.createElement('div');
    quickRepliesDiv.className = 'quick-replies';

    replies.forEach(reply => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = reply.text;
        btn.onclick = () => {
            handleUserInput(reply.keyword);
            quickRepliesDiv.remove();
        };
        quickRepliesDiv.appendChild(btn);
    });

    const lastBotMessage = chatMessages.querySelector('.message.bot:last-of-type');
    if (lastBotMessage) {
        lastBotMessage.appendChild(quickRepliesDiv);
    }
}

// Show typing
function showTyping() {
    typingIndicator.classList.add('active');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Process user input
function handleUserInput(input) {
    if (!input.trim()) return;

    addUserMessage(input);
    chatInput.value = '';

    // If user says "yes" after bot initiates message sending
    if (awaitingSendToJoseph && input.trim().toLowerCase() === "yes") {
        awaitingSendToJoseph = false;
        showContactForm();
        return;
    }

    showTyping();

    setTimeout(() => {
        const response = getResponse(input.toLowerCase());
        addBotMessage(response);

        if (response.includes("Would you like me to send him a message")) {
            awaitingSendToJoseph = true;
        }

        if (response.includes("specific project")) {
            awaitingSendToJoseph = true;
        }

    }, 800 + Math.random() * 800);
}

// Get response
function getResponse(input) {

    if (input.match(/\b(hi|hello|hey|greetings)\b/)) {
        return responses.greetings[1];
    }

    if (input.includes("create a simple website") || input.includes("simple website")) {
        awaitingSendToJoseph = true;
        return "Yes, Joseph can help you create a simple website. Would you like me to send him a message about your request?";
    }

    if (input.match(/\b(service|services|what do you do|offer)\b/)) {
        return responses.services;
    }

    if (input.match(/\b(price|pricing|cost|how much|budget|rate)\b/)) {
        return responses.pricing;
    }

    if (input.match(/\b(tech|technology|technologies|stack|language|framework)\b/)) {
        return responses.technologies;
    }

    if (input.match(/\b(experience|years|background|resume|cv)\b/)) {
        return responses.experience;
    }

    if (input.match(/\b(timeline|time|duration|how long)\b/)) {
        return responses.timeline;
    }

    if (input.match(/\b(contact|reach|email|phone|whatsapp|call)\b/)) {
        return responses.contact;
    }

    if (input.match(/\b(portfolio|project|projects|work|example)\b/)) {
        return responses.portfolio;
    }

    if (input.match(/\b(support|maintenance|after)\b/)) {
        return responses.support;
    }

    if (input.match(/\b(location|where|based|office)\b/)) {
        return responses.location;
    }

    if (input.match(/\b(payment|pay|deposit|installment)\b/)) {
        return responses.payment;
    }

    return "I understand. Would you like me to send Joseph a message about your question?";
}

// Contact form
function showContactForm() {
    const formHTML = `
        <div class="contact-form">
            <h4 style="color: #fff; margin-bottom: 15px; font-size: 14px;">Let Joseph know about your project:</h4>
            <form id="contactFormChat" action="https://formspree.io/f/mblzvzjg" method="POST">
                <div class="form-group">
                    <label>Name *</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Phone (optional)</label>
                    <input type="tel" name="phone">
                </div>
                <div class="form-group">
                    <label>Project Details *</label>
                    <textarea name="message" required></textarea>
                </div>
                <input type="hidden" name="_subject" value="New Chat Lead from Portfolio">
                <button type="submit" class="submit-btn">Send to Joseph</button>
            </form>
        </div>
    `;

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = formHTML;

    chatMessages.insertBefore(messageDiv, typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    document.getElementById('contactFormChat').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            await fetch('https://formspree.io/f/mblzvzjg', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            messageDiv.remove();
            addBotMessage("Your message has been sent to Joseph. He will get back to you within 24 hours. You can also reach him on WhatsApp at +233 596 523 065");
        } catch (error) {
            addBotMessage("There was an issue sending your message. Please contact Joseph directly at Destoratech55@gmail.com");
        }
    });
}

// Send message
sendBtn.addEventListener('click', () => {
    handleUserInput(chatInput.value);
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput(chatInput.value);
    }
});
