// Time-based greeting
function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;
    
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = "Good Morning!";
    } else if (hour < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }
    
    greetingElement.textContent = greeting;
}

// Image slider functionality
function setupSlider() {
    const slider = document.querySelector('.slider');
    if (!slider) return;
    
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }
    
    // Auto-slide every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// Random gardening tip functionality
function setupRandomTip() {
    const tipButton = document.getElementById('tip-button');
    const tipText = document.getElementById('random-tip');
    
    if (!tipButton || !tipText) return;
    
    const tips = [
        "Water deeply but less frequently to encourage deep root growth.",
        "Add compost to your soil in spring and fall for healthier plants.",
        "Mulch around plants to conserve water and reduce weeds.",
        "Plant native species that are adapted to your local climate.",
        "Position plants with similar water needs together for efficient irrigation.",
        "Plant drought-resistant species to reduce water consumption.",
        "Install a rain barrel to collect water for your garden.",
        "Consider a drip irrigation system to reduce water waste."
    ];
    
    tipButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * tips.length);
        tipText.textContent = tips[randomIndex];
        tipText.style.display = 'block';
    });
}

// Form validation
function setupFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formStatus = document.getElementById('form-status');
    const previousSubmissions = document.getElementById('previous-submissions');
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function loadPreviousSubmissions() {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
        
        if (submissions.length > 0) {
            previousSubmissions.innerHTML = '<h4>Previous Submissions:</h4>';
            previousSubmissions.style.display = 'block';
            
            const lastSubmission = submissions[submissions.length - 1];
            nameInput.value = lastSubmission.name || '';
            emailInput.value = lastSubmission.email || '';
            
            const submissionInfo = document.createElement('p');
            submissionInfo.textContent = `Last submitted: ${lastSubmission.date} as ${lastSubmission.name}`;
            previousSubmissions.appendChild(submissionInfo);
        }
    }
    
    loadPreviousSubmissions();
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Reset errors
        nameError.style.display = 'none';
        emailError.style.display = 'none';
        messageError.style.display = 'none';
        formStatus.className = '';
        formStatus.style.display = 'none';
        
        // Validate name
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Please enter your name';
            nameError.style.display = 'block';
            isValid = false;
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Please enter your email';
            emailError.style.display = 'block';
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            isValid = false;
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            messageError.textContent = 'Please enter your message';
            messageError.style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // Form is valid, save to local storage
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: document.getElementById('service').value,
                message: messageInput.value.trim(),
                date: new Date().toLocaleString()
            };
            
            // Save to local storage
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
            submissions.push(formData);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
            // Show success message
            formStatus.textContent = 'Your message has been sent successfully! We will contact you soon.';
            formStatus.className = 'success';
            formStatus.style.display = 'block';
            
            // Clear form
            messageInput.value = '';
            document.getElementById('phone').value = '';
            document.getElementById('service').selectedIndex = 0;
        } else {
            // Show error message
            formStatus.textContent = 'Please correct the errors in the form.';
            formStatus.className = 'error';
            formStatus.style.display = 'block';
        }
    });
}

// Chatbot functionality
function setupChatbot() {
    const chatButton = document.getElementById('chat-button');
    const chatbot = document.getElementById('chatbot');
    const closeChat = document.getElementById('close-chat');
    const sendMessage = document.getElementById('send-message');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatButton || !chatbot) return;
    
    const botResponses = {
        "hello": "Hello! How can I help you with your landscaping needs today?",
        "hi": "Hi there! How can I assist you with your garden project?",
        "services": "We offer garden design, landscape installation, garden maintenance, and outdoor living spaces. You can find more details on our Services page.",
        "price": "Our prices vary depending on the project scope. Garden design starts at GHC1,500, landscape installation at GHC3,000, and maintenance at GHC200/month. For a detailed quote, please fill out our contact form.",
        "contact": "You can reach us at (233) 545996596, email us at info@greengrow.com, or fill out the contact form on our Contact page.",
        "hours": "We're open Monday through Friday from 8am to 6pm, Saturday from 9am to 4pm, and we're closed on Sundays.",
        "appointment": "To schedule an appointment, please fill out our contact form with your preferred date and time, and we'll get back to you to confirm."
    };
    
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        for (const keyword in botResponses) {
            if (message.includes(keyword)) {
                return botResponses[keyword];
            }
        }
        
        return "I'm not sure I understand. Please ask about our services, pricing, contact information, or business hours. Or you can fill out our contact form for more specific inquiries.";
    }
    
    chatButton.addEventListener('click', () => {
        chatbot.style.display = 'block';
    });
    
    closeChat.addEventListener('click', () => {
        chatbot.style.display = 'none';
    });
    
    sendMessage.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            
            // Simulate typing delay
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response, false);
            }, 500);
        }
    });
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage.click();
        }
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    updateGreeting();
    setupSlider();
    setupRandomTip();
    setupFormValidation();
    setupChatbot();
});