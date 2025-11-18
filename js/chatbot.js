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

        // Knowledge base
        const responses = {
            greetings: [
                "Hello! I'm Destora AI, Joseph's virtual assistant. How can I help you today?",
                "Hi there! 👋 I'm here to help you learn about Joseph's services. What would you like to know?"
            ],
            services: "Joseph offers Full-Stack Web Development, API Development & Integration, Frontend Engineering with React/Next.js, and AI & Chatbot Development. Which service interests you?",
            pricing: "Project pricing varies based on complexity:\n\n• Simple websites: $500-$1,500\n• E-commerce sites: $2,000-$5,000\n• Custom web apps: $3,000-$10,000+\n• AI chatbots: $1,000-$3,000\n\nWould you like to discuss your specific project?",
            technologies: "Joseph works with: Flask, Python, Next.js, React, PHP, JavaScript, Webflow, HTML/CSS, FastAPI, and C++. He also integrates APIs like Stripe, Paystack, and Google Maps.",
            experience: "Joseph has 4+ years of experience in software engineering and web development. He's completed 20+ projects for 10+ happy clients, including Travel Afric and Annuva Homes.",
            timeline: "Project timelines typically are:\n\n• Simple websites: 1-2 weeks\n• Medium projects: 3-4 weeks\n• Complex applications: 4-8 weeks\n\nTimelines depend on project scope and your feedback speed.",
            contact: "You can reach Joseph through:\n\n📧 Email: Destoratech55@gmail.com\n📱 Phone: +233 593 4258 54\n💬 WhatsApp: +233 596 523 065\n\nWould you like me to send him a message about your inquiry?",
            portfolio: "Joseph has worked on impressive projects including:\n\n• Travel Afric - Full travel booking platform with payment integration\n• Annuva Homes - AI chatbot for property management\n• SaaS Dashboards - Analytics and client management tools\n\nWant to see more details?",
            support: "All projects include 30 days of free support for bug fixes and minor adjustments. Extended support and maintenance packages are available separately.",
            location: "Joseph is based in Gomoa Fetteh, Ghana, but works with clients worldwide through remote collaboration.",
            payment: "Joseph accepts:\n\n• 50% deposit to start\n• Milestone payments during development\n• Final payment upon completion\n\nPayment methods: Bank transfer, PayPal, Stripe, or Paystack"
        };

        const quickReplies = [
            { text: "💰 Pricing", keyword: "pricing" },
            { text: "🛠️ Services", keyword: "services" },
            { text: "⏱️ Timeline", keyword: "timeline" },
            { text: "📞 Contact", keyword: "contact" }
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
            
            // Remove typing indicator
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
            
            showTyping();
            
            setTimeout(() => {
                const response = getResponse(input.toLowerCase());
                addBotMessage(response);
                
                // Add follow-up suggestions
                if (response.includes('specific project') || response.includes('message about your inquiry')) {
                    showContactForm();
                }
            }, 1000 + Math.random() * 1000);
        }

        // Get response
        function getResponse(input) {
            // Greetings
            if (input.match(/\b(hi|hello|hey|greetings)\b/)) {
                return responses.greetings[1];
            }
            
            // Services
            if (input.match(/\b(service|services|what do you do|what can you do|offer)\b/)) {
                return responses.services;
            }
            
            // Pricing
            if (input.match(/\b(price|pricing|cost|how much|budget|rate)\b/)) {
                return responses.pricing;
            }
            
            // Technologies
            if (input.match(/\b(tech|technology|technologies|stack|language|framework)\b/)) {
                return responses.technologies;
            }
            
            // Experience
            if (input.match(/\b(experience|years|background|resume|cv)\b/)) {
                return responses.experience;
            }
            
            // Timeline
            if (input.match(/\b(timeline|time|how long|duration|when)\b/)) {
                return responses.timeline;
            }
            
            // Contact
            if (input.match(/\b(contact|reach|email|phone|whatsapp|call)\b/)) {
                return responses.contact;
            }
            
            // Portfolio
            if (input.match(/\b(portfolio|project|projects|work|example)\b/)) {
                return responses.portfolio;
            }
            
            // Support
            if (input.match(/\b(support|maintenance|after|warranty)\b/)) {
                return responses.support;
            }
            
            // Location
            if (input.match(/\b(location|where|based|office)\b/)) {
                return responses.location;
            }
            
            // Payment
            if (input.match(/\b(payment|pay|deposit|installment)\b/)) {
                return responses.payment;
            }
            
            // Default response
            return "That's a great question! I'm still learning, but I can connect you directly with Joseph for a detailed answer. Would you like me to send him a message with your question?";
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
            
            // Handle form submission
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
                    addBotMessage("✅ Perfect! Your message has been sent to Joseph. He'll get back to you within 24 hours. You can also reach him directly on WhatsApp: +233 596 523 065");
                } catch (error) {
                    addBotMessage("❌ Oops! There was an error. Please email Joseph directly at Destoratech55@gmail.com");
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