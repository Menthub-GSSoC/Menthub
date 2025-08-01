// Global state management
let currentUser = null;
let currentTheme = localStorage.getItem('theme') || 'light';

// Theme management
function initializeTheme() {
  // Set initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Create theme toggle button if it doesn't exist
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu && !document.querySelector('.theme-toggle')) {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `
      <i class="fas ${currentTheme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
      <span>${currentTheme === 'dark' ? 'Light' : 'Dark'}</span>
    `;
    themeToggle.addEventListener('click', toggleTheme);
    
    // Insert before the last element (logout button)
    const logoutBtn = navMenu.querySelector('#logoutBtn');
    if (logoutBtn) {
      navMenu.insertBefore(themeToggle, logoutBtn);
    } else {
      navMenu.appendChild(themeToggle);
    }
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  
  // Update toggle button
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');
    
    if (currentTheme === 'dark') {
      icon.className = 'fas fa-sun';
      text.textContent = 'Light';
    } else {
      icon.className = 'fas fa-moon';
      text.textContent = 'Dark';
    }
  }
}

// --- MOCK DATA ---
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
// --- END MOCK DATA ---


// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
  setupEventListeners();
});

function initializeApp() {
  // Initialize theme
  initializeTheme();
  
  const userElement = document.body;
  const userDataString = userElement.dataset.user;

  if (userDataString) {
    try {
      currentUser = JSON.parse(userDataString);
      showDashboard();
    } catch (e) {
      console.error("Failed to parse user data:", e);
      // If parsing fails, the user is not properly logged in.
      window.location.href = '/login';
    }
  } else {
    // This is a fallback. If no user data, the user isn't logged in.
    // The backend's @login_required should prevent this page from loading anyway.
    window.location.href = '/login';
  }
}

function setupEventListeners() {
  // Navigation
  document.getElementById("dashboardBtn").addEventListener("click", showDashboard);
  document.getElementById("profileBtn").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior
    window.location.href = '/profile'; // Navigate to profile page
  });
  document.getElementById("logoutBtn").addEventListener("click", () => {
    // Redirect to the backend logout route
    window.location.href = '/logout';
  });

  // Form submissions
  document.getElementById("requestForm").addEventListener("submit", handleMentorshipRequest);

  // Search and filters
  document.getElementById("mentorSearch").addEventListener("input", filterMentors);
  document.getElementById("departmentFilter").addEventListener("change", filterMentors);
  document.getElementById("yearFilter").addEventListener("change", filterMentors);

  // Modal controls
  document.getElementById("closeModal").addEventListener("click", closeModal);
  document.getElementById("cancelRequest").addEventListener("click", closeModal);
  document.getElementById("requestModal").addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });

  // Availability toggle for mentors
  const availabilityToggle = document.getElementById("availabilityToggle");
  if(availabilityToggle) {
    availabilityToggle.addEventListener("change", toggleAvailability);
  }
}

function showDashboard() {
  document.getElementById("navbar").style.display = "block";
  document.getElementById("menteeDashboard").style.display = "none";
  document.getElementById("mentorDashboard").style.display = "none";

  // Display dashboards based on the user's role from the backend
  if (currentUser.role === "Mentor" || currentUser.role === "Both") {
    showMentorDashboard();
  }
  if (currentUser.role === "Mentee" || currentUser.role === "Both") {
    showMenteeDashboard();
  }
}

function showMenteeDashboard() {
  const menteeDashboard = document.getElementById("menteeDashboard");
  if(menteeDashboard) {
    menteeDashboard.style.display = "block";
    renderMentors(); // Render with mock data
  }
}

function showMentorDashboard() {
  const mentorDashboard = document.getElementById("mentorDashboard");
  if(mentorDashboard) {
    mentorDashboard.style.display = "block";
    renderMentorshipRequests(); // Render with mock data
  }
}

function renderMentors() {
  const mentorsGrid = document.getElementById("mentorsGrid");
  if (!mentorsGrid) return;

  const mentorsToRender = sampleMentors.filter(mentor => mentor.id !== currentUser.id);

  if (mentorsToRender.length === 0) {
    mentorsGrid.innerHTML = `<div class="empty-state"><h3>No other mentors found</h3></div>`;
    return;
  }

  mentorsGrid.innerHTML = mentorsToRender.map(mentor => `
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
  `).join("");
}

function renderMentorshipRequests() {
  const requestsContainer = document.getElementById("requestsContainer");
  if (!requestsContainer) return;

  if (sampleRequests.length === 0) {
    requestsContainer.innerHTML = `<div class="empty-state"><h3>No mentorship requests</h3></div>`;
    return;
  }

  requestsContainer.innerHTML = sampleRequests.map(request => `
    <div class="request-card">
        <div class="request-header">
            <div class="request-info">
                <h3>${request.menteeName}</h3>
                <p>${request.menteeYear} Year • ${request.menteeDepartment}</p>
            </div>
            <span class="request-status status-${request.status}">${request.status}</span>
        </div>
        <div class="request-reason"><strong>Reason:</strong><br>${request.reason}</div>
        <div class="request-help-types">${request.helpTypes.map(type => `<span class="help-type-tag">${type}</span>`).join("")}</div>
        ${request.status === "pending" ? `
            <div class="request-actions">
                <button class="btn btn-success" onclick="handleRequestAction(${request.id}, 'accepted')"><i class="fas fa-check"></i> Accept</button>
                <button class="btn btn-danger" onclick="handleRequestAction(${request.id}, 'rejected')"><i class="fas fa-times"></i> Reject</button>
            </div>` : ""
        }
    </div>
  `).join("");
}

function filterMentors() {
  const searchTerm = document.getElementById("mentorSearch").value.toLowerCase();
  const departmentFilter = document.getElementById("departmentFilter").value;
  const yearFilter = document.getElementById("yearFilter").value;
  const mentorCards = document.querySelectorAll(".mentor-card");

  mentorCards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    const skills = Array.from(card.querySelectorAll(".skill-tag")).map(tag => tag.textContent.toLowerCase()).join(" ");
    const department = card.dataset.department;
    const year = card.dataset.year;

    const matchesSearch = name.includes(searchTerm) || skills.includes(searchTerm);
    const matchesDept = !departmentFilter || department === departmentFilter;
    const matchesYear = !yearFilter || year === yearFilter;

    card.style.display = (matchesSearch && matchesDept && matchesYear) ? "block" : "none";
  });
}

function openRequestModal(mentorId) {
  document.getElementById("mentorId").value = mentorId;
  document.getElementById("requestModal").classList.add("active");
}

function closeModal() {
  document.getElementById("requestModal").classList.remove("active");
  document.getElementById("requestForm").reset();
}

function handleMentorshipRequest(e) {
  e.preventDefault();
  closeModal();
  showToast("Mentorship request sent successfully! (Demo)");
}

function handleRequestAction(requestId, action) {
  const request = sampleRequests.find(r => r.id === requestId);
  if (request) {
    request.status = action;
    renderMentorshipRequests();
    showToast(`Request ${action} successfully! (Demo)`);
  }
}

function toggleAvailability() {
  showToast("Availability updated! (Demo)");
}

function showToast(message) {
  const toast = document.getElementById("successToast");
  const toastMessage = document.getElementById("toastMessage");
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
