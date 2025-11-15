const form = document.getElementById("contactForm");
const statusTxt = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusTxt.innerHTML = "⏳ Sending message...";
  
  // Create data object
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch("https://formspree.io/f/mblzvzjg", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      statusTxt.innerHTML = "✅ Message sent successfully! Thank you.";
      statusTxt.style.color = "lightgreen";
      form.reset();
    } else {
      statusTxt.innerHTML = "❌ Something went wrong. Please try again.";
      statusTxt.style.color = "red";
    }
  } catch (error) {
    statusTxt.innerHTML = "⚠️ Network error. Please check your connection.";
    statusTxt.style.color = "orange";
  }
});