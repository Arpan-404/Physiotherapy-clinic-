// Application State
let appState = {
  isAdmin: false,
  clinic: {
    name: "Physio - The Therapeutic Moves",
    tagline: "We add life in your days.",
    phone: "+91 9641568109",
    email: "Dr.ArpanDas.PT@gmail.com",
    address: "123 Health Street, Medical District, City - 123456",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iIzIxNzFCNSIvPgo8bGluZSB4MT0iMTUiIHkxPSIxNSIgeDI9IjQ1IiB5Mj0iNDUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIvPgo8bGluZSB4MT0iNDUiIHkxPSIxNSIgeDI9IjE1IiB5Mj0iNDUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIvPgo8L3N2Zz4K",
    heroImage: "https://pplx-res.cloudinary.com/image/upload/v1755579259/pplx_project_search_images/cb9c3bf6c6d78c1b72b77e9a9b15d29fc88b3d8e.png"
  },
  team: [
    {
      id: 1,
      name: "Dr. Arpan Das",
      qualification: "BPT",
      specialization: "General Physiotherapy",
      photo: "https://pplx-res.cloudinary.com/image/upload/v1755579259/pplx_project_search_images/b7c4e13f9b8a16c17b8b8e8f9c8b8e8f9c8b8e8f.png",
      experience: "8+ years"
    },
    {
      id: 2, 
      name: "Dr. Apurba Das",
      qualification: "DPT", 
      specialization: "Orthopedic Physiotherapy",
      photo: "https://pplx-res.cloudinary.com/image/upload/v1755579259/pplx_project_search_images/b7c4e13f9b8a16c17b8b8e8f9c8b8e8f9c8b8e8f.png",
      experience: "6+ years"
    },
    {
      id: 3,
      name: "Dr. Jharna Das", 
      qualification: "DPT",
      specialization: "Neurological Physiotherapy",
      photo: "https://pplx-res.cloudinary.com/image/upload/v1755579259/pplx_project_search_images/b7c4e13f9b8a16c17b8b8e8f9c8b8e8f9c8b8e8f.png",
      experience: "5+ years"
    }
  ],
  products: [
    {
      id: 1,
      name: "Lumbar Support Belt",
      category: "L-S Belts",
      price: 1250,
      description: "High-quality lumbar support belt for lower back pain relief and posture support.",
      image: "https://pplx-res.cloudinary.com/image/upload/v1755579259/pplx_project_search_images/de4844f9e65e1eb30ca95e88a23840acfe630676.png",
      inStock: true
    },
    {
      id: 2,
      name: "Cervical Neck Collar",
      category: "Neck Collars", 
      price: 850,
      description: "Soft cervical collar for neck support and injury recovery.",
      image: "https://pplx-res.cloudinary.com/image/upload/v1755579259/pplx_project_search_images/438e7837ea28e0a533b46c91d617afc87b0fe54e.png",
      inStock: true
    },
    {
      id: 3,
      name: "Knee Support Brace",
      category: "Braces",
      price: 1100,
      description: "Adjustable knee brace for sports injuries and joint support.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c123?w=300", 
      inStock: true
    },
    {
      id: 4,
      name: "TENS Machine",
      category: "Equipment",
      price: 5500,
      description: "Transcutaneous electrical nerve stimulation device for pain management.",
      image: "https://pplx-res.cloudinary.com/image/upload/v1755579259/pplx_project_search_images/d14bc9ab61a5e7a3e1e8b8c8d8e8f9c8b8e8f9c8.png",
      inStock: true
    },
    {
      id: 5,
      name: "Wrist Support Brace",
      category: "Braces",
      price: 650,
      description: "Comfortable wrist brace for carpal tunnel and repetitive strain injuries.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3789?w=300",
      inStock: true
    },
    {
      id: 6,
      name: "Thoracic Support Belt",
      category: "L-S Belts",
      price: 1500,
      description: "Upper back support belt for thoracic spine alignment and posture correction.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c456?w=300",
      inStock: true
    }
  ],
  admin: { username: "admin", password: "admin123" },
  editingProduct: null,
  editingTeamMember: null
};

// Utility Functions
function showMessage(message, type = 'success') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message message--${type}`;
  messageDiv.textContent = message;
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 3000);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close mobile menu after navigation
    closeMobileMenu();
  }
}

// Mobile Menu Functions
function toggleMobileMenu() {
  const slideMenu = document.getElementById('slideMenu');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  
  if (slideMenu && hamburgerBtn) {
    const isOpen = slideMenu.classList.contains('open');
    
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
}

function openMobileMenu() {
  const slideMenu = document.getElementById('slideMenu');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  
  if (slideMenu && hamburgerBtn) {
    slideMenu.classList.add('open');
    hamburgerBtn.classList.add('active');
    
    // Create and show overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay active';
    overlay.id = 'menuOverlay';
    overlay.addEventListener('click', closeMobileMenu);
    document.body.appendChild(overlay);
  }
}

function closeMobileMenu() {
  const slideMenu = document.getElementById('slideMenu');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const overlay = document.getElementById('menuOverlay');
  
  if (slideMenu && hamburgerBtn) {
    slideMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
  }
  
  if (overlay) {
    overlay.remove();
  }
}

// WhatsApp Functions - Make them global from the start
window.bookAppointmentWithDoctor = function(doctorName) {
  const message = encodeURIComponent(`Hi, I would like to book an appointment with ${doctorName} at Physio - The Therapeutic Moves`);
  const phoneNumber = appState.clinic.phone.replace(/[^0-9]/g, '');
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
};

window.buyProductViaWhatsApp = function(productName) {
  const message = encodeURIComponent(`Hi, I'm interested in purchasing ${productName} from Physio - The Therapeutic Moves`);
  const phoneNumber = appState.clinic.phone.replace(/[^0-9]/g, '');
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
};

window.generalAppointmentBooking = function() {
  const message = encodeURIComponent('Hi, I would like to book an appointment at Physio - The Therapeutic Moves');
  const phoneNumber = appState.clinic.phone.replace(/[^0-9]/g, '');
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
};

// Content Update Functions
function updateUI() {
  updateClinicInfo();
  updateTeamDisplay();
  updateProductsDisplay();
  if (appState.isAdmin) {
    updateAdminPanel();
  }
}

function updateClinicInfo() {
  const clinic = appState.clinic;
  const elements = {
    clinicName: document.getElementById('clinicName'),
    clinicTagline: document.getElementById('clinicTagline'),
    heroTitle: document.getElementById('heroTitle'),
    heroTagline: document.getElementById('heroTagline'),
    heroPhone: document.getElementById('heroPhone'),
    heroEmail: document.getElementById('heroEmail'),
    clinicPhone: document.getElementById('clinicPhone'),
    clinicEmail: document.getElementById('clinicEmail'),
    clinicAddress: document.getElementById('clinicAddress'),
    clinicLogo: document.getElementById('clinicLogo'),
    heroImage: document.getElementById('heroImage')
  };
  
  Object.entries(elements).forEach(([key, element]) => {
    if (element) {
      if (key === 'clinicLogo') {
        element.src = clinic.logo;
      } else if (key === 'heroImage') {
        element.src = clinic.heroImage;
      } else if (key === 'heroPhone') {
        element.textContent = clinic.phone;
        element.href = `tel:${clinic.phone.replace(/[^0-9]/g, '')}`;
      } else if (key === 'heroEmail') {
        element.textContent = clinic.email;
        element.href = `mailto:${clinic.email}`;
      } else {
        const value = key.includes('clinic') ? 
          clinic[key.replace('clinic', '').toLowerCase()] || clinic[key.replace('Clinic', '').toLowerCase()] :
          key === 'heroTitle' ? clinic.name :
          key === 'heroTagline' ? clinic.tagline :
          clinic[key.replace('clinic', '').toLowerCase()];
        element.textContent = value;
      }
    }
  });
}

function updateTeamDisplay() {
  const doctorsGrid = document.getElementById('doctorsGrid');
  if (!doctorsGrid) return;
  
  doctorsGrid.innerHTML = '';
  
  appState.team.forEach(member => {
    const doctorCard = document.createElement('div');
    doctorCard.className = 'doctor-card';
    doctorCard.innerHTML = `
      <img src="${member.photo}" alt="${member.name}" class="doctor-photo" onerror="this.src='https://via.placeholder.com/100x100?text=${member.name.charAt(0)}'">
      <h3 class="doctor-name">${member.name}</h3>
      <p class="doctor-qualification">${member.qualification}</p>
      <p class="doctor-specialization">${member.specialization}</p>
      <p class="doctor-experience">${member.experience}</p>
      <button class="book-appointment-btn" onclick="bookAppointmentWithDoctor('${member.name.replace(/'/g, "\\'")}')">
        Book Appointment
      </button>
    `;
    doctorsGrid.appendChild(doctorCard);
  });
}

function updateProductsDisplay(filter = 'all') {
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;
  
  productsGrid.innerHTML = '';
  
  const filteredProducts = filter === 'all' 
    ? appState.products 
    : appState.products.filter(product => product.category === filter);
  
  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300'">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">₹${product.price}</span>
          <button class="buy-now-btn" onclick="buyProductViaWhatsApp('${product.name.replace(/'/g, "\\'")}')">
            Buy Now
          </button>
        </div>
      </div>
    `;
    productsGrid.appendChild(productCard);
  });
}

// Admin Functions
function adminLogin(username, password) {
  if (username === appState.admin.username && password === appState.admin.password) {
    appState.isAdmin = true;
    closeModal('adminLoginModal');
    showAdminPanel();
    showMessage('Admin login successful!');
    return true;
  }
  showMessage('Invalid admin credentials!', 'error');
  return false;
}

function logout() {
  appState.isAdmin = false;
  showMainContent();
  showMessage('Logged out successfully!');
}

function showAdminPanel() {
  const mainContent = document.getElementById('mainContent');
  const adminPanel = document.getElementById('adminPanel');
  if (mainContent) mainContent.classList.add('hidden');
  if (adminPanel) adminPanel.classList.remove('hidden');
  updateAdminPanel();
}

function showMainContent() {
  const mainContent = document.getElementById('mainContent');
  const adminPanel = document.getElementById('adminPanel');
  if (mainContent) mainContent.classList.remove('hidden');
  if (adminPanel) adminPanel.classList.add('hidden');
}

function updateAdminPanel() {
  // Update statistics
  const totalProductsEl = document.getElementById('totalProducts');
  const totalTeamEl = document.getElementById('totalTeam');
  
  if (totalProductsEl) totalProductsEl.textContent = appState.products.length;
  if (totalTeamEl) totalTeamEl.textContent = appState.team.length;
  
  // Update clinic form
  const clinic = appState.clinic;
  const adminFields = {
    adminClinicName: clinic.name,
    adminClinicTagline: clinic.tagline,
    adminClinicPhone: clinic.phone,
    adminClinicEmail: clinic.email,
    adminClinicAddress: clinic.address,
    logoUrl: clinic.logo,
    heroImageUrl: clinic.heroImage
  };
  
  Object.entries(adminFields).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.value = value;
  });
  
  updateAdminProductsList();
  updateAdminTeamList();
}

function updateAdminProductsList() {
  const productsList = document.getElementById('adminProductsList');
  if (!productsList) return;
  
  productsList.innerHTML = '';
  
  appState.products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'admin-product-card';
    productCard.innerHTML = `
      <div class="admin-product-info">
        <h4>${product.name}</h4>
        <p>${product.category} - ₹${product.price}</p>
      </div>
      <div class="admin-product-actions">
        <button class="btn btn--outline btn--sm" onclick="editProduct(${product.id})">Edit</button>
        <button class="btn btn--outline btn--sm" onclick="deleteProduct(${product.id})">Delete</button>
      </div>
    `;
    productsList.appendChild(productCard);
  });
}

function updateAdminTeamList() {
  const teamList = document.getElementById('adminTeamList');
  if (!teamList) return;
  
  teamList.innerHTML = '';
  
  appState.team.forEach(member => {
    const teamCard = document.createElement('div');
    teamCard.className = 'admin-team-card';
    teamCard.innerHTML = `
      <div class="admin-team-info">
        <h4>${member.name}</h4>
        <p>${member.qualification} - ${member.specialization}</p>
      </div>
      <div class="admin-team-actions">
        <button class="btn btn--outline btn--sm" onclick="editTeamMember(${member.id})">Edit</button>
        <button class="btn btn--outline btn--sm" onclick="deleteTeamMember(${member.id})">Delete</button>
      </div>
    `;
    teamList.appendChild(teamCard);
  });
}

// Product Management
function addProduct() {
  appState.editingProduct = null;
  const titleEl = document.getElementById('productModalTitle');
  if (titleEl) titleEl.textContent = 'Add Product';
  
  const form = document.getElementById('productForm');
  if (form) form.reset();
  openModal('productModal');
}

// Make admin functions global
window.editProduct = function(productId) {
  const product = appState.products.find(p => p.id === productId);
  if (product) {
    appState.editingProduct = product;
    const titleEl = document.getElementById('productModalTitle');
    if (titleEl) titleEl.textContent = 'Edit Product';
    
    const fields = {
      productName: product.name,
      productCategory: product.category,
      productPrice: product.price,
      productDescription: product.description,
      productImage: product.image
    };
    
    Object.entries(fields).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.value = value;
    });
    
    openModal('productModal');
  }
};

window.deleteProduct = function(productId) {
  if (confirm('Are you sure you want to delete this product?')) {
    appState.products = appState.products.filter(p => p.id !== productId);
    updateAdminProductsList();
    updateProductsDisplay();
    showMessage('Product deleted successfully!');
  }
};

function saveProduct(formData) {
  if (appState.editingProduct) {
    // Update existing product
    Object.assign(appState.editingProduct, formData);
    showMessage('Product updated successfully!');
  } else {
    // Add new product
    const newProduct = {
      id: Math.max(...appState.products.map(p => p.id)) + 1,
      ...formData,
      inStock: true
    };
    appState.products.push(newProduct);
    showMessage('Product added successfully!');
  }
  
  updateAdminProductsList();
  updateProductsDisplay();
  closeModal('productModal');
}

// Team Management
function addTeamMember() {
  appState.editingTeamMember = null;
  const titleEl = document.getElementById('teamMemberModalTitle');
  if (titleEl) titleEl.textContent = 'Add Team Member';
  
  const form = document.getElementById('teamMemberForm');
  if (form) form.reset();
  openModal('teamMemberModal');
}

window.editTeamMember = function(memberId) {
  const member = appState.team.find(m => m.id === memberId);
  if (member) {
    appState.editingTeamMember = member;
    const titleEl = document.getElementById('teamMemberModalTitle');
    if (titleEl) titleEl.textContent = 'Edit Team Member';
    
    const fields = {
      memberName: member.name,
      memberQualification: member.qualification,
      memberSpecialization: member.specialization,
      memberExperience: member.experience,
      memberPhoto: member.photo
    };
    
    Object.entries(fields).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.value = value;
    });
    
    openModal('teamMemberModal');
  }
};

window.deleteTeamMember = function(memberId) {
  if (confirm('Are you sure you want to delete this team member?')) {
    appState.team = appState.team.filter(m => m.id !== memberId);
    updateAdminTeamList();
    updateTeamDisplay();
    showMessage('Team member deleted successfully!');
  }
};

function saveTeamMember(formData) {
  if (appState.editingTeamMember) {
    // Update existing member
    Object.assign(appState.editingTeamMember, formData);
    showMessage('Team member updated successfully!');
  } else {
    // Add new member
    const newMember = {
      id: Math.max(...appState.team.map(m => m.id)) + 1,
      ...formData
    };
    appState.team.push(newMember);
    showMessage('Team member added successfully!');
  }
  
  updateAdminTeamList();
  updateTeamDisplay();
  closeModal('teamMemberModal');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initialize app
  updateUI();
  
  // Hamburger menu
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }
  
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMobileMenu);
  }
  
  // Navigation
  const adminLoginBtn = document.getElementById('adminLoginBtn');
  if (adminLoginBtn) {
    adminLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('adminLoginModal');
      closeMobileMenu();
    });
  }
  
  const bookAppointmentBtn = document.getElementById('bookAppointmentBtn');
  if (bookAppointmentBtn) {
    bookAppointmentBtn.addEventListener('click', (e) => {
      e.preventDefault();
      generalAppointmentBooking();
    });
  }
  
  // Menu links
  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const sectionId = href.substring(1);
        scrollToSection(sectionId);
      }
    });
  });
  
  // Product filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      updateProductsDisplay(e.target.dataset.category);
    });
  });
  
  // Admin navigation
  document.querySelectorAll('.admin-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const section = e.target.dataset.section;
      const sectionId = 'admin' + section.charAt(0).toUpperCase() + section.slice(1);
      
      document.querySelectorAll('.admin-section').forEach(section => section.classList.add('hidden'));
      const targetSection = document.getElementById(sectionId);
      if (targetSection) targetSection.classList.remove('hidden');
    });
  });
  
  // Form submissions
  const adminLoginForm = document.getElementById('adminLoginForm');
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('adminUsername').value;
      const password = document.getElementById('adminPassword').value;
      adminLogin(username, password);
    });
  }
  
  const clinicForm = document.getElementById('clinicForm');
  if (clinicForm) {
    clinicForm.addEventListener('submit', (e) => {
      e.preventDefault();
      appState.clinic = {
        ...appState.clinic,
        name: document.getElementById('adminClinicName').value,
        tagline: document.getElementById('adminClinicTagline').value,
        phone: document.getElementById('adminClinicPhone').value,
        email: document.getElementById('adminClinicEmail').value,
        address: document.getElementById('adminClinicAddress').value
      };
      updateClinicInfo();
      showMessage('Clinic information updated successfully!');
    });
  }
  
  const logoForm = document.getElementById('logoForm');
  if (logoForm) {
    logoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      appState.clinic.logo = document.getElementById('logoUrl').value;
      updateClinicInfo();
      showMessage('Logo updated successfully!');
    });
  }
  
  const heroImageForm = document.getElementById('heroImageForm');
  if (heroImageForm) {
    heroImageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      appState.clinic.heroImage = document.getElementById('heroImageUrl').value;
      updateClinicInfo();
      showMessage('Hero image updated successfully!');
    });
  }
  
  const productForm = document.getElementById('productForm');
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseInt(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value
      };
      saveProduct(formData);
    });
  }
  
  const teamMemberForm = document.getElementById('teamMemberForm');
  if (teamMemberForm) {
    teamMemberForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        name: document.getElementById('memberName').value,
        qualification: document.getElementById('memberQualification').value,
        specialization: document.getElementById('memberSpecialization').value,
        experience: document.getElementById('memberExperience').value,
        photo: document.getElementById('memberPhoto').value
      };
      saveTeamMember(formData);
    });
  }
  
  // Button events
  const addProductBtn = document.getElementById('addProductBtn');
  if (addProductBtn) {
    addProductBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addProduct();
    });
  }
  
  const addTeamMemberBtn = document.getElementById('addTeamMemberBtn');
  if (addTeamMemberBtn) {
    addTeamMemberBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addTeamMember();
    });
  }
  
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
  
  // Close modal buttons
  ['closeAdminLoginBtn', 'closeProductBtn', 'closeTeamMemberBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = btn.closest('.modal');
        if (modal) modal.classList.add('hidden');
      });
    }
  });
  
  // Close modals on outside click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
  
  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
});