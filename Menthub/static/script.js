// Global state management
let currentUser = null
let mentors = []
let mentorshipRequests = []
let passwordToggleInitialized = false

// Sample data for demonstration
const sampleMentors = [
  {
    id: 1,
    name: "Arjun Sharma",
    department: "CS",
    year: "4th",
    bio: "Passionate about web development and machine learning. Interned at Google and Microsoft. Love helping juniors with coding interviews and project guidance.",
    skills: ["Web Development", "Machine Learning", "DSA", "Internships"],
    email: "arjun.sharma@college.edu",
    linkedin: "https://linkedin.com/in/arjunsharma",
    whatsapp: "+91 9876543210",
    availability: true,
  },
  {
    id: 2,
    name: "Priya Patel",
    department: "IT",
    year: "3rd",
    bio: "Full-stack developer with experience in React and Node.js. Active in coding competitions and open source contributions. Happy to mentor on technical skills.",
    skills: ["React", "Node.js", "MongoDB", "Competitive Programming"],
    email: "priya.patel@college.edu",
    linkedin: "https://linkedin.com/in/priyapatel",
    whatsapp: "+91 9876543211",
    availability: true,
  },
  {
    id: 3,
    name: "Rahul Kumar",
    department: "Mechanical",
    year: "4th",
    bio: "Mechanical engineering student with interests in robotics and automation. Secured internship at ISRO. Can guide on core engineering subjects and career paths.",
    skills: ["Robotics", "CAD Design", "Project Management", "Research"],
    email: "rahul.kumar@college.edu",
    linkedin: "https://linkedin.com/in/rahulkumar",
    whatsapp: "+91 9876543212",
    availability: true,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    department: "Electronics",
    year: "3rd",
    bio: "Electronics enthusiast with expertise in embedded systems and IoT. Won multiple hackathons and technical competitions. Love sharing knowledge about electronics projects.",
    skills: ["Embedded Systems", "IoT", "Arduino", "Circuit Design"],
    email: "sneha.reddy@college.edu",
    linkedin: "https://linkedin.com/in/snehareddy",
    whatsapp: "+91 9876543213",
    availability: true,
  },
  {
    id: 5,
    name: "Vikash Singh",
    department: "Civil",
    year: "4th",
    bio: "Civil engineering student specializing in structural design and construction management. Interned at L&T. Can help with core subjects and industry insights.",
    skills: ["Structural Design", "AutoCAD", "Project Planning", "Site Management"],
    email: "vikash.singh@college.edu",
    linkedin: "https://linkedin.com/in/vikashsingh",
    whatsapp: "+91 9876543214",
    availability: true,
  },
  {
    id: 6,
    name: "Ananya Gupta",
    department: "IT",
    year: "4th",
    bio: "Data science enthusiast with experience in Python, R, and machine learning. Completed internships at startups and established companies. Passionate about mentoring in analytics.",
    skills: ["Data Science", "Python", "Machine Learning", "Statistics"],
    email: "ananya.gupta@college.edu",
    linkedin: "https://linkedin.com/in/ananyagupta",
    whatsapp: "+91 9876543215",
    availability: true,
  },
]

const sampleRequests = [
  {
    id: 1,
    menteeId: 101,
    menteeName: "Rohit Verma",
    menteeDepartment: "CS",
    menteeYear: "2nd",
    menteeBio: "Second year CS student interested in web development and competitive programming.",
    reason:
      "I want to learn web development from scratch and need guidance on building real-world projects. Also looking for tips on competitive programming.",
    helpTypes: ["Web Development", "Competitive Programming", "Projects"],
    preferredTime: "Evening",
    status: "pending",
    requestDate: "2024-01-15",
  },
  {
    id: 2,
    menteeId: 102,
    menteeName: "Kavya Nair",
    menteeDepartment: "IT",
    menteeYear: "1st",
    menteeBio: "First year IT student exploring different domains in technology.",
    reason:
      "As a first year student, I'm confused about which technology stack to focus on. Need guidance on career path and skill development.",
    helpTypes: ["Career Guidance", "Skill Development", "Academics"],
    preferredTime: "Weekend",
    status: "pending",
    requestDate: "2024-01-14",
  },
  {
    id: 3,
    menteeId: 103,
    menteeName: "Amit Joshi",
    menteeDepartment: "CS",
    menteeYear: "3rd",
    menteeBio: "Third year CS student preparing for placements and looking for internship opportunities.",
    reason:
      "I need help with interview preparation and resume building. Also looking for guidance on how to approach companies for internships.",
    helpTypes: ["Placements", "Interview Prep", "Resume Building"],
    preferredTime: "Flexible",
    status: "accepted",
    requestDate: "2024-01-13",
  },
]

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
  loadSampleData()
  setupPasswordToggles()
})

function initializeApp() {
  // Check if user is logged in (in real app, check localStorage/sessionStorage)
  const savedUser = localStorage.getItem("currentUser")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    showDashboard()
  } else {
    showAuthPage()
  }
}

function loadSampleData() {
  mentors = [...sampleMentors]
  mentorshipRequests = [...sampleRequests]
}

function setupEventListeners() {
  // Auth tab switching
  document.getElementById("loginTab").addEventListener("click", () => switchAuthTab("login"))
  document.getElementById("signupTab").addEventListener("click", () => switchAuthTab("signup"))

  // Form submissions
  document.getElementById("loginFormElement").addEventListener("submit", handleLogin)
  document.getElementById("signupFormElement").addEventListener("submit", handleSignup)
  document.getElementById("requestForm").addEventListener("submit", handleMentorshipRequest)

  // Navigation
  document.getElementById("dashboardBtn").addEventListener("click", showDashboard)
  document.getElementById("logoutBtn").addEventListener("click", handleLogout)

  // Search and filters
  document.getElementById("mentorSearch").addEventListener("input", filterMentors)
  document.getElementById("departmentFilter").addEventListener("change", filterMentors)
  document.getElementById("yearFilter").addEventListener("change", filterMentors)

  // Modal controls
  document.getElementById("closeModal").addEventListener("click", closeModal)
  document.getElementById("cancelRequest").addEventListener("click", closeModal)

  // Availability toggle
  document.getElementById("availabilityToggle").addEventListener("change", toggleAvailability)

  // Password toggle handled by a single delegated listener; no per-tab setup needed

  // Close modal when clicking outside
  document.getElementById("requestModal").addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal()
    }
  })
}

function setupPasswordToggles() {
  if (passwordToggleInitialized) return
  passwordToggleInitialized = true

  // One-time delegated listener works for both login and signup tabs
  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('.toggle-password')
    if (!toggle) return

    e.preventDefault()
    e.stopPropagation()

    const container = toggle.closest('.password-container')
    const passwordInput = container ? container.querySelector('input[type="password"], input[type="text"]') : null
    const icon = toggle.querySelector('i')

    if (!passwordInput || !icon) return

    const toText = passwordInput.type === 'password'
    passwordInput.type = toText ? 'text' : 'password'
    icon.classList.toggle('fa-eye', !toText)
    icon.classList.toggle('fa-eye-slash', toText)
  })
}

function switchAuthTab(tab) {
  const loginTab = document.getElementById("loginTab")
  const signupTab = document.getElementById("signupTab")
  const loginForm = document.getElementById("loginForm")
  const signupForm = document.getElementById("signupForm")

  if (tab === "login") {
    loginTab.classList.add("active")
    signupTab.classList.remove("active")
    loginForm.classList.add("active")
    signupForm.classList.remove("active")
  } else {
    signupTab.classList.add("active")
    loginTab.classList.remove("active")
    signupForm.classList.add("active")
    loginForm.classList.remove("active")
  }
  
  // No need to re-initialize password toggles; listener is delegated and initialized once
}

function handleLogin(e) {
  e.preventDefault()
  const formData = new FormData(e.target)
  const email = formData.get("email")
  const password = formData.get("password")

  // Simulate login (in real app, make API call)
  if (email && password) {
    // Create mock user based on email
    currentUser = {
      id: Date.now(),
      email: email,
      name: email
        .split("@")[0]
        .replace(".", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      role: email.includes("mentor") ? "Mentor" : "Mentee",
      department: "CS",
      year: "3rd",
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    showToast("Login successful!")
    showDashboard()
  }
}

function handleSignup(e) {
  e.preventDefault()
  const formData = new FormData(e.target)

  // Create user object
  currentUser = {
    id: Date.now(),
    name: formData.get("fullName"),
    email: formData.get("email"),
    department: formData.get("department"),
    year: formData.get("academicYear"),
    role: formData.get("role"),
    bio: formData.get("bio"),
    linkedin: formData.get("linkedinUrl"),
    whatsapp: formData.get("whatsappContact"),
  }

  localStorage.setItem("currentUser", JSON.stringify(currentUser))
  showToast("Account created successfully!")
  showDashboard()
}

function handleLogout() {
  currentUser = null
  localStorage.removeItem("currentUser")
  showAuthPage()
  showToast("Logged out successfully!")
}

function showAuthPage() {
  document.getElementById("authPage").style.display = "flex"
  document.getElementById("menteeDashboard").style.display = "none"
  document.getElementById("mentorDashboard").style.display = "none"
  document.getElementById("navbar").style.display = "none"
}

function showDashboard() {
  document.getElementById("authPage").style.display = "none"
  document.getElementById("navbar").style.display = "block"

  if (currentUser.role === "Mentor" || currentUser.role === "Both") {
    showMentorDashboard()
  } else {
    showMenteeDashboard()
  }
}

function showMenteeDashboard() {
  document.getElementById("menteeDashboard").style.display = "block"
  document.getElementById("mentorDashboard").style.display = "none"
  renderMentors()
}

function showMentorDashboard() {
  document.getElementById("mentorDashboard").style.display = "block"
  document.getElementById("menteeDashboard").style.display = "none"
  renderMentorshipRequests()
}

function renderMentors() {
  const mentorsGrid = document.getElementById("mentorsGrid")

  if (mentors.length === 0) {
    mentorsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-user-friends"></i>
                <h3>No mentors found</h3>
                <p>Try adjusting your search filters to find mentors.</p>
            </div>
        `
    return
  }

  mentorsGrid.innerHTML = mentors
    .map(
      (mentor) => `
        <div class="mentor-card" data-department="${mentor.department}" data-year="${mentor.year}">
            <div class="mentor-header">
                <div class="mentor-avatar">
                    ${mentor.name.charAt(0)}
                </div>
                <div class="mentor-info">
                    <h3>${mentor.name}</h3>
                    <p>${mentor.year} Year • ${mentor.department}</p>
                </div>
            </div>
            
            <div class="mentor-bio">
                ${mentor.bio}
            </div>
            
            <div class="mentor-skills">
                ${mentor.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
            </div>
            
            <div class="mentor-contacts">
                ${mentor.linkedin ? `<a href="${mentor.linkedin}" target="_blank" class="contact-btn contact-linkedin"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ""}
                <a href="mailto:${mentor.email}" class="contact-btn contact-email"><i class="fas fa-envelope"></i> Email</a>
                ${mentor.whatsapp ? `<a href="https://wa.me/${mentor.whatsapp.replace(/\D/g, "")}" target="_blank" class="contact-btn contact-whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>` : ""}
            </div>
            
            <button class="btn btn-primary" onclick="openRequestModal(${mentor.id})">
                <i class="fas fa-paper-plane"></i> Request Mentorship
            </button>
        </div>
    `,
    )
    .join("")
}

function renderMentorshipRequests() {
  const requestsContainer = document.getElementById("requestsContainer")

  if (mentorshipRequests.length === 0) {
    requestsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>No mentorship requests</h3>
                <p>When students request your mentorship, they'll appear here.</p>
            </div>
        `
    return
  }

  requestsContainer.innerHTML = mentorshipRequests
    .map(
      (request) => `
        <div class="request-card">
            <div class="request-header">
                <div class="request-info">
                    <h3>${request.menteeName}</h3>
                    <p>${request.menteeYear} Year • ${request.menteeDepartment}</p>
                    <p><strong>Preferred Time:</strong> ${request.preferredTime}</p>
                </div>
                <span class="request-status status-${request.status}">
                    ${request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
            </div>
            
            <div class="request-reason">
                <strong>Why they want mentorship:</strong><br>
                ${request.reason}
            </div>
            
            <div class="request-help-types">
                ${request.helpTypes.map((type) => `<span class="help-type-tag">${type}</span>`).join("")}
            </div>
            
            ${
              request.status === "pending"
                ? `
                <div class="request-actions">
                    <button class="btn btn-success" onclick="handleRequestAction(${request.id}, 'accepted')">
                        <i class="fas fa-check"></i> Accept
                    </button>
                    <button class="btn btn-danger" onclick="handleRequestAction(${request.id}, 'rejected')">
                        <i class="fas fa-times"></i> Reject
                    </button>
                </div>
            `
                : ""
            }
        </div>
    `,
    )
    .join("")
}

function filterMentors() {
  const searchTerm = document.getElementById("mentorSearch").value.toLowerCase()
  const departmentFilter = document.getElementById("departmentFilter").value
  const yearFilter = document.getElementById("yearFilter").value

  const mentorCards = document.querySelectorAll(".mentor-card")

  mentorCards.forEach((card) => {
    const mentorName = card.querySelector("h3").textContent.toLowerCase()
    const mentorSkills = Array.from(card.querySelectorAll(".skill-tag"))
      .map((tag) => tag.textContent.toLowerCase())
      .join(" ")
    const mentorDepartment = card.dataset.department
    const mentorYear = card.dataset.year

    const matchesSearch = mentorName.includes(searchTerm) || mentorSkills.includes(searchTerm)
    const matchesDepartment = !departmentFilter || mentorDepartment === departmentFilter
    const matchesYear = !yearFilter || mentorYear === yearFilter

    if (matchesSearch && matchesDepartment && matchesYear) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

function openRequestModal(mentorId) {
  document.getElementById("mentorId").value = mentorId
  document.getElementById("requestModal").classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeModal() {
  document.getElementById("requestModal").classList.remove("active")
  document.body.style.overflow = "auto"
  document.getElementById("requestForm").reset()
}

function handleMentorshipRequest(e) {
  e.preventDefault()
  const formData = new FormData(e.target)
  const mentorId = Number.parseInt(formData.get("mentorId"))
  const reason = formData.get("reason")
  const helpTypes = formData.getAll("helpType")
  const preferredTime = formData.get("preferredTime")

  // Create new request
  const newRequest = {
    id: Date.now(),
    mentorId: mentorId,
    menteeId: currentUser.id,
    menteeName: currentUser.name,
    menteeDepartment: currentUser.department,
    menteeYear: currentUser.year,
    menteeBio: currentUser.bio || "",
    reason: reason,
    helpTypes: helpTypes,
    preferredTime: preferredTime,
    status: "pending",
    requestDate: new Date().toISOString().split("T")[0],
  }

  mentorshipRequests.push(newRequest)
  closeModal()
  showToast("Mentorship request sent successfully!")
}

function handleRequestAction(requestId, action) {
  const request = mentorshipRequests.find((r) => r.id === requestId)
  if (request) {
    request.status = action
    renderMentorshipRequests()
    showToast(`Request ${action} successfully!`)
  }
}

function toggleAvailability() {
  const toggle = document.getElementById("availabilityToggle")
  const isAvailable = toggle.checked

  // Update mentor availability in the system
  if (currentUser) {
    currentUser.availability = isAvailable
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
  }

  showToast(isAvailable ? "You are now accepting new mentees" : "You are not accepting new mentees")
}

function showToast(message) {
  const toast = document.getElementById("successToast")
  const toastMessage = document.getElementById("toastMessage")

  toastMessage.textContent = message
  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Utility function to get initials from name
function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
}

// Utility function to format date
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Add some sample interaction animations
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    e.target.style.transform = "scale(0.95)"
    setTimeout(() => {
      e.target.style.transform = ""
    }, 150)
  }
})

// Add loading states for better UX
function showLoading(element) {
  element.classList.add("loading")
}

function hideLoading(element) {
  element.classList.remove("loading")
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Escape key to close modal
  if (e.key === "Escape") {
    closeModal()
  }

  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault()
    const searchInput = document.getElementById("mentorSearch")
    if (searchInput && searchInput.offsetParent !== null) {
      searchInput.focus()
    }
  }
})

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = "smooth"

// Initialize tooltips and other interactive elements
function initializeInteractiveElements() {
  // Add hover effects to cards
  const cards = document.querySelectorAll(".mentor-card, .request-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })
}

// Call initialization after DOM is loaded
document.addEventListener("DOMContentLoaded", initializeInteractiveElements)
