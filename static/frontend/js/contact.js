(function(){
  const toggle=document.getElementById('mobileToggle');
  const navMenu=document.getElementById('navMenu');
  const navContent=document.getElementById('navContent');
  
  if(toggle){
    toggle.addEventListener('click',()=>{
      navMenu.classList.toggle('active');
      navContent.classList.toggle('active');
      toggle.classList.toggle('active');
    });
  }
  
  // Contact Form API Integration
  const form=document.getElementById('contactForm');
  const formCard = document.querySelector('.contact-form-card');
  
  if(form){
    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          validateField(input);
        }
      });
    });

    // Submit button gating based on message length (> 12 chars)
    const messageField = form.querySelector('textarea[name="message"]');
    const submitButton = form.querySelector('button[type="submit"]');

    function updateSubmitState(){
      const length = (messageField?.value || '').trim().length;
      const canSubmit = length > 12;
      if (submitButton){
        submitButton.disabled = !canSubmit;
        submitButton.classList.toggle('hidden', !canSubmit);
      }
    }

    if (messageField){
      messageField.addEventListener('input', () => {
        // revalidate message if needed and update submit visibility
        if (messageField.classList.contains('error')) {
          validateField(messageField);
        }
        updateSubmitState();
      });
      // Initialize state on load
      updateSubmitState();
    }
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Enforce message min length client-side as well
      const currentMessage = (form.querySelector('textarea[name="message"]').value || '').trim();
      if (currentMessage.length <= 12) {
        showNotification('Please enter at least 13 characters in the message.', 'error');
        if (messageField) {
          messageField.classList.add('error');
        }
        updateSubmitState();
        return;
      }
      
      // Validate all fields before submission
      let isValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });
      
      if (!isValid) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
      }
      
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      // Show loading state
      submitButton.innerHTML = 'Sending... <span>⏳</span>';
      submitButton.disabled = true;
      formCard.classList.add('loading');
      
      try {
        // Get form data
        const formData = new FormData(form);
        const contactData = {
          name: formData.get('name').trim(),
          email: formData.get('email').trim(),
          subject: formData.get('subject')?.trim() || 'Contact Form Submission from Northern Star Logistics',
          phone: formData.get('phone')?.trim() || '',
          message: formData.get('message')?.trim() || ''
        };
        
        // Validate required fields
        if (!contactData.name || !contactData.email) {
          throw new Error('Name and email are required');
        }
        
        // Send to backend API
        const response = await fetch('https://nothern-star-logistic-inc-backend.vercel.app/api/email/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(contactData)
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error('API Error Response:', errorData);
          throw new Error(`Server error: ${response.status} - ${errorData}`);
        }
        
        const result = await response.json();
        console.log('Contact form sent successfully:', result);
        
        // Show success state
        formCard.classList.add('success');
        showNotification('Thank you for reaching out! We will contact you shortly. 🎉', 'success');
        form.reset();
        updateSubmitState();
        
        // Remove success state after animation
        setTimeout(() => {
          formCard.classList.remove('success');
        }, 3000);
        
      } catch (error) {
        console.error('Failed to send contact form:', error);
        
        // Show appropriate error message
        let errorMessage = 'Failed to send message. Please try again or contact us directly.';
        if (error.message.includes('Network')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (error.message.includes('400')) {
          errorMessage = 'Invalid form data. Please check your information and try again.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Server error. Please try again later or contact us directly.';
        }
        
        showNotification(errorMessage, 'error');
      } finally {
        // Reset button and loading state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        formCard.classList.remove('loading');
      }
    });
  }
  
  // Field validation function
  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Check required fields
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = `${field.placeholder || field.name} is required`;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    
    // Phone validation (optional but if provided should be valid)
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-()+]+$/;
      if (!phoneRegex.test(value) || value.length < 10) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }
    
    // Name validation
    if (field.name === 'name' && value && value.length < 2) {
      isValid = false;
      errorMessage = 'Name must be at least 2 characters long';
    }

    // Message min length (> 12 characters)
    if (field.name === 'message') {
      if (value.length <= 12) {
        isValid = false;
        errorMessage = 'Message must be at least 13 characters long';
      }
    }
    
    if (!isValid) {
      field.classList.add('error');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.textContent = errorMessage;
      field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
  }
  
  // Notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
      color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
      border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
      border-radius: 8px;
      padding: 15px 20px;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      font-family: 'Inter', sans-serif;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);
  }
  
  // Dropdown functionality
  const dropdownToggles=document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach((t)=>{
    t.addEventListener('click',(e)=>{
      e.preventDefault();
      t.closest('.dropdown').classList.toggle('open');
    });
  });
})(); 