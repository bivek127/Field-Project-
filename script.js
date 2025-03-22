document.addEventListener("DOMContentLoaded", () => {
  // Handle navigation active state
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll("nav ul li a")

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href")
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active")
    }
  })

  // Load listings if on listings page
  if (currentPage === "listings.html" || currentPage === "listings") {
    loadListings()

    // Handle sorting
    const sortSelect = document.getElementById("sort-by")
    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        loadListings(this.value)
      })
    }
  }

  // Handle contact form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Form validation
      const name = document.getElementById("name").value.trim()
      const email = document.getElementById("email").value.trim()
      const message = document.getElementById("message").value.trim()
      const formMessage = document.getElementById("formMessage")

      if (!name || !email || !message) {
        formMessage.textContent = "Please fill in all required fields."
        formMessage.className = "form-message error"
        return
      }

      if (!isValidEmail(email)) {
        formMessage.textContent = "Please enter a valid email address."
        formMessage.className = "form-message error"
        return
      }

      // Submit form via AJAX
      const formData = new FormData(contactForm)

      fetch("php/contact.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            formMessage.textContent = "Thank you! Your message has been sent."
            formMessage.className = "form-message success"
            contactForm.reset()
          } else {
            formMessage.textContent = data.message || "An error occurred. Please try again."
            formMessage.className = "form-message error"
          }
        })
        .catch((error) => {
          formMessage.textContent = "An error occurred. Please try again."
          formMessage.className = "form-message error"
          console.error("Error:", error)
        })
    })
  }
})

// Function to load listings from the server
function loadListings(sortBy = "newest") {
  const listingsGrid = document.getElementById("listings-grid")
  if (!listingsGrid) return

  // Show loading indicator
  listingsGrid.innerHTML = '<div class="loading">Loading properties...</div>'

  // Fetch listings from the server
  fetch(`php/listings.php?sort=${sortBy}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success && data.listings.length > 0) {
        // Clear loading indicator
        listingsGrid.innerHTML = ""

        // Add each listing to the grid
        data.listings.forEach((listing) => {
          const listingCard = document.createElement("div")
          listingCard.className = "listing-card"

          listingCard.innerHTML = `
                        <div class="listing-image" style="background-image: url('${listing.image}')"></div>
                        <div class="listing-details">
                            <h3 class="listing-title">${listing.title}</h3>
                            <div class="listing-price">$${listing.price}/month</div>
                            <p class="listing-description">${listing.description}</p>
                            <button class="btn" onclick="bookProperty(${listing.id})">Book Now</button>
                        </div>
                    `

          listingsGrid.appendChild(listingCard)
        })
      } else {
        listingsGrid.innerHTML = '<div class="loading">No properties found.</div>'
      }
    })
    .catch((error) => {
      listingsGrid.innerHTML = '<div class="loading">Error loading properties. Please try again.</div>'
      console.error("Error:", error)
    })
}

// Function to book a property
function bookProperty(propertyId) {
  alert(`You're about to book property #${propertyId}. This feature is coming soon!`)
  // In a real application, this would redirect to a booking page or open a modal
}

// Email validation helper function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

