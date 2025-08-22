// Firebase Configuration (same as before)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, get, set, push, remove, update, onValue } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { getAuth, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyAuk3feAZjoHF2VwdWtA0F4lhQKarU0w-4",
    authDomain: "clinic-bdf92.firebaseapp.com",
    databaseURL: "https://clinic-bdf92-default-rtdb.firebaseio.com",
    projectId: "clinic-bdf92",
    storageBucket: "clinic-bdf92.firebasestorage.app",
    messagingSenderId: "302452317883",
    appId: "1:302452317883:web:6585bf22ea1a7f3a96939e",
    measurementId: "G-XZXEVNMVRS"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// ✅ FIXED LOADING MANAGEMENT
window.loadingState = { isLoading: true };

setTimeout(() => {
    console.log('✅ Force hiding loading overlay after 1.3 seconds');
    hideLoadingOverlay();
}, 1300);

function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 500);
        window.loadingState.isLoading = false;
    }
}

function hideSkeletons() {
    ['doctorsSkeleton', 'servicesSkeleton', 'productsSkeleton'].forEach(id => {
        document.getElementById(id)?.classList.add('hidden');
    });
}

// ✅ UPDATED: Site data with WhatsApp number
window.siteData = {
    hero: {
        clinicName: "Physio - The Therapeutic Moves",
        title: "Therapeutic Moves",
        tagline: '"We add life in your days."',
        phone: "+91 9641568109",
        whatsappNumber: "+919641568109", // ✅ NEW: Configurable WhatsApp number
        email: "DrArpanDas.PT@gmail.com",
        logoUrl: "",
        bannerImageUrl: ""
    },
    doctors: [
        {
            id: 1,
            name: "Dr. Arpan Das",
            qualification: "BPT",
            fees: "₹500",
            details: "Experienced physiotherapist specializing in sports injuries and rehabilitation.",
            photoUrl: ""
        },
        {
            id: 2,
            name: "Dr. Jhunu Das",
            qualification: "DPT",
            fees: "₹600",
            details: "Expert in neurological rehabilitation and pediatric physiotherapy.",
            photoUrl: ""
        },
        {
            id: 3,
            name: "Dr. Apurba Das",
            qualification: "DPT",
            fees: "₹600",
            details: "Specialist in orthopedic conditions and manual therapy techniques.",
            photoUrl: ""
        }
    ],
    services: [
        {
            id: 1,
            title: "Physical Therapy",
            description: "Comprehensive physical rehabilitation and therapeutic exercises.",
            icon: "🏃‍♂️",
            bannerImageUrl: "",
            tests: [
                { id: 1, name: "Movement Assessment", price: "₹300" },
                { id: 2, name: "Strength Testing", price: "₹250" },
                { id: 3, name: "Range of Motion Test", price: "₹200" }
            ]
        },
        {
            id: 2,
            title: "Pain Management",
            description: "Specialized treatment for chronic and acute pain conditions.",
            icon: "💊",
            bannerImageUrl: "",
            tests: [
                { id: 4, name: "Pain Assessment", price: "₹400" },
                { id: 5, name: "Trigger Point Therapy", price: "₹600" },
                { id: 6, name: "TENS Therapy", price: "₹500" }
            ]
        },
        {
            id: 3,
            title: "Sports Rehabilitation",
            description: "Recovery programs for sports-related injuries and performance enhancement.",
            icon: "⚽",
            bannerImageUrl: "",
            tests: [
                { id: 7, name: "Sports Injury Assessment", price: "₹500" },
                { id: 8, name: "Performance Analysis", price: "₹700" },
                { id: 9, name: "Return to Sport Testing", price: "₹600" }
            ]
        }
    ],
    products: [
        {
            id: 1,
            name: "Lumbar Support Belt",
            description: "Medical grade lumbar support for back pain relief. Provides excellent support for lower back during work and exercise.",
            price: "₹1200",
            profilePhoto: "",
            images: []
        },
        {
            id: 2,
            name: "Knee Support Brace",
            description: "Adjustable knee brace for injury support and prevention. Features adjustable straps and compression padding.",
            price: "₹800",
            profilePhoto: "",
            images: []
        },
        {
            id: 3,
            name: "Resistance Bands Set",
            description: "Professional resistance bands for rehabilitation exercises. Includes 5 different resistance levels.",
            price: "₹600",
            profilePhoto: "",
            images: []
        }
    ]
};

window.currentServiceId = null;

// ✅ NEW: Get WhatsApp number helper
function getWhatsAppNumber() {
    return window.siteData.hero?.whatsappNumber || "+919641568109";
}

// Utility functions
function isValidUrl(string) {
    try { new URL(string); return true; } catch (_) { return false; }
}

function isImageUrl(url) {
    return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url) || 
           url.includes('i.ibb.co') || url.includes('imgur.com');
}

// Firebase listeners and basic setup (same as before)
const siteRef = ref(database, 'site');
onValue(siteRef, (snapshot) => {
    try {
        if (snapshot.exists()) {
            const data = snapshot.val();
            window.siteData = { ...window.siteData, ...data };
        }
        renderSite();
        updateAdminForm();
        updateStats();
        updateHeroBackground();
        hideSkeletons();
    } catch (error) {
        console.error('Firebase error:', error);
        renderSite();
        updateStats();
        hideSkeletons();
    }
}, (error) => {
    console.error('Firebase permission error:', error);
    renderSite();
    updateStats();
    hideSkeletons();
});

// Scroll handler and page navigation (same as before)
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.loadingState.isLoading) return;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 80) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

window.currentPage = 'home';

window.showPage = function(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId + 'Page').classList.add('active');
    window.currentPage = pageId;
    if (document.getElementById('mobileMenu').classList.contains('active')) {
        toggleMenu();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Admin functions
function initAdminTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    const panels = document.querySelectorAll('.tab-panel');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab + '-panel').classList.add('active');
        });
    });
}

window.previewImage = function(input, previewId) {
    const preview = document.getElementById(previewId);
    if (input.value && isImageUrl(input.value)) {
        preview.src = input.value;
        preview.style.display = 'block';
        preview.onerror = () => preview.style.display = 'none';
    } else {
        preview.style.display = 'none';
    }
}

// Data functions
function updateStats() {
    document.getElementById('totalDoctors').textContent = window.siteData.doctors?.length || 0;
    document.getElementById('totalServices').textContent = window.siteData.services?.length || 0;
    document.getElementById('totalProducts').textContent = window.siteData.products?.length || 0;
}

// ✅ UPDATED: Admin form with WhatsApp number
function updateAdminForm() {
    if (window.siteData.hero) {
        const hero = window.siteData.hero;
        document.getElementById('adminClinicName').value = hero.clinicName || '';
        document.getElementById('adminTagline').value = hero.tagline || '';
        document.getElementById('adminPhone').value = hero.phone || '';
        document.getElementById('adminWhatsApp').value = hero.whatsappNumber || '';
        document.getElementById('adminEmail').value = hero.email || '';
        document.getElementById('adminLogoUrl').value = hero.logoUrl || '';
        document.getElementById('bannerImageUrl').value = hero.bannerImageUrl || '';

        if (hero.logoUrl) {
            const logoImg = document.getElementById('clinicLogo');
            if (logoImg) logoImg.src = hero.logoUrl;
            previewImage(document.getElementById('adminLogoUrl'), 'logoPreview');
        }
        if (hero.bannerImageUrl) {
            previewImage(document.getElementById('bannerImageUrl'), 'bannerPreview');
        }
    }
}

function updateHeroBackground() {
    const heroSection = document.getElementById('heroSection');
    if (window.siteData.hero?.bannerImageUrl) {
        heroSection.style.backgroundImage = `url('${window.siteData.hero.bannerImageUrl}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
    } else {
        heroSection.style.backgroundImage = 'linear-gradient(135deg, #2c8577 0%, #4a9b8c 100%)';
    }
}

// ✅ UPDATED: Update clinic info with WhatsApp number
window.updateClinicInfo = async function() {
    const heroData = {
        clinicName: document.getElementById('adminClinicName').value.trim(),
        title: document.getElementById('adminClinicName').value.trim(),
        tagline: document.getElementById('adminTagline').value.trim(),
        phone: document.getElementById('adminPhone').value.trim(),
        whatsappNumber: document.getElementById('adminWhatsApp').value.trim(),
        email: document.getElementById('adminEmail').value.trim(),
        logoUrl: document.getElementById('adminLogoUrl').value.trim(),
        bannerImageUrl: document.getElementById('bannerImageUrl').value.trim()
    };
    
    try {
        await update(ref(database, 'site/hero'), heroData);
        window.siteData.hero = { ...window.siteData.hero, ...heroData };
        renderHero();
        updateHeroBackground();
        
        if (heroData.logoUrl) {
            const logoImg = document.getElementById('clinicLogo');
            if (logoImg) logoImg.src = heroData.logoUrl;
        }
        
        alert('Clinic information updated successfully!');
    } catch (error) {
        console.error('Error updating clinic information:', error);
        alert('Error updating clinic information: ' + error.message);
    }
}

// Render functions
function renderSite() {
    renderHero();
    renderDoctorsPreview();
    renderServicesPreview();
    renderProductsPreview();
    renderDoctors();
    renderServices();
    renderProducts();
    renderAdminLists();
}

function renderHero() {
    if (window.siteData.hero) {
        document.getElementById('clinicName').textContent = window.siteData.hero.clinicName;
        document.getElementById('heroTitle').textContent = window.siteData.hero.title;
        document.getElementById('heroTagline').textContent = window.siteData.hero.tagline;
        document.getElementById('phoneNumber').innerHTML = `📞 ${window.siteData.hero.phone}`;
    }
}

function renderDoctorsPreview() {
    const container = document.getElementById('doctorsPreview');
    if (!container) return;
    container.innerHTML = '';
    
    window.siteData.doctors?.forEach(doctor => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor-preview-card';
        doctorCard.onclick = () => showDoctorDetails(doctor);
        
        const avatarContent = doctor.photoUrl ? 
            `<div class="doctor-preview-avatar"><img src="${doctor.photoUrl}" alt="${doctor.name}" loading="lazy"></div>` :
            '<div class="doctor-preview-avatar">👨‍⚕️</div>';
        
        doctorCard.innerHTML = `
            ${avatarContent}
            <div class="doctor-preview-name">${doctor.name.replace('Dr. ', '')}</div>
            <div class="doctor-preview-qualification">${doctor.qualification}</div>
        `;
        container.appendChild(doctorCard);
    });
}

// ✅ UPDATED: Services preview with buy buttons
function renderServicesPreview() {
    const container = document.getElementById('servicesPreview');
    if (!container) return;
    container.innerHTML = '';
    
    window.siteData.services?.slice(0, 3).forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-preview-card';
        
        const imageContent = service.bannerImageUrl ?
            `<img src="${service.bannerImageUrl}" alt="${service.title}" style="width: 100%; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 0.8rem;" loading="lazy">` :
            `<div class="service-preview-icon">${service.icon}</div>`;
        
        serviceCard.innerHTML = `
            ${imageContent}
            <div class="service-preview-title">${service.title}</div>
            <div class="service-preview-description">${service.description}</div>
            <div class="service-buttons">
                <button class="btn btn-secondary" onclick="showServiceDetails(${JSON.stringify(service).replace(/"/g, '&quot;')})">Details</button>
                <button class="btn btn-primary" onclick="buyService('${service.title}')">Appointment</button>
            </div>
        `;
        container.appendChild(serviceCard);
    });
}

// ✅ UPDATED: Products preview with side-by-side buttons
function renderProductsPreview() {
    const container = document.getElementById('productsPreview');
    if (!container) return;
    container.innerHTML = '';
    
    window.siteData.products?.slice(0, 3).forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-preview-card';
        
        let photoContent = '';
        if (product.profilePhoto) {
            photoContent = `<div class="product-profile-photo">
                <img src="${product.profilePhoto}" alt="${product.name}" loading="lazy">
            </div>`;
        } else {
            photoContent = `<div class="product-profile-photo product-no-photo">
                <span>📦</span>
            </div>`;
        }
        
        productCard.innerHTML = `
            ${photoContent}
            <div class="product-preview-title">${product.name}</div>
            <div class="product-preview-price">${product.price}</div>
            <div class="product-preview-buttons">
                <button class="btn btn-secondary" onclick="viewProductInternal(${product.id})">View</button>
                <button class="btn btn-primary" onclick="buyProduct('${product.name}')">🛒 Buy</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Product view functions (same as before)
window.viewProductInternal = function(productId) {
    const product = window.siteData.products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productViewModal');
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.getElementById('productImageThumbnails');
    
    document.getElementById('productViewName').textContent = product.name;
    document.getElementById('productViewPrice').textContent = product.price;
    document.getElementById('productViewDescription').textContent = product.description;
    
    document.getElementById('productViewBuyBtn').onclick = () => {
        buyProduct(product.name);
        closeProductView();
    };
    
    if (product.images && product.images.length > 0) {
        const firstImage = product.images[0];
        mainImage.innerHTML = `<img src="${firstImage}" alt="${product.name}">`;
        
        thumbnails.innerHTML = '';
        product.images.forEach((imageUrl, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `product-thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${imageUrl}" alt="${product.name}">`;
            
            thumbnail.onclick = () => {
                mainImage.innerHTML = `<img src="${imageUrl}" alt="${product.name}">`;
                thumbnails.querySelectorAll('.product-thumbnail').forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            };
            
            thumbnails.appendChild(thumbnail);
        });
    } else if (product.profilePhoto) {
        mainImage.innerHTML = `<img src="${product.profilePhoto}" alt="${product.name}">`;
        thumbnails.innerHTML = '';
    } else {
        mainImage.innerHTML = '<div style="color: #999; font-size: 1.5rem; text-align: center;">No images available</div>';
        thumbnails.innerHTML = '';
    }
    
    modal.style.display = 'block';
}

window.closeProductView = function() {
    document.getElementById('productViewModal').style.display = 'none';
}

// Render full pages
function renderDoctors() {
    const container = document.getElementById('doctorsContainer');
    if (!container) return;
    container.innerHTML = '';
    
    window.siteData.doctors?.forEach(doctor => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor-card';
        
        const avatarContent = doctor.photoUrl ?
            `<div class="doctor-avatar"><img src="${doctor.photoUrl}" alt="${doctor.name}" loading="lazy"></div>` :
            `<div class="doctor-avatar">👨‍⚕️</div>`;
        
        doctorCard.innerHTML = `
            ${avatarContent}
            <div class="doctor-name">${doctor.name}</div>
            <div class="doctor-qualification">${doctor.qualification}</div>
            <div class="doctor-fees">${doctor.fees}</div>
            <p style="margin: 1rem 0; color: #666; font-size: 0.9rem;">${doctor.details}</p>
            <button class="btn btn-primary" onclick="bookDoctorAppointment('${doctor.name}')">
                Book Appointment
            </button>
        `;
        container.appendChild(doctorCard);
    });
}

// ✅ UPDATED: Services with buy buttons
function renderServices() {
    const container = document.getElementById('servicesContainer');
    if (!container) return;
    container.innerHTML = '';
    
    window.siteData.services?.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        const imageContent = service.bannerImageUrl ?
            `<div class="service-image" style="background-image: url('${service.bannerImageUrl}')"></div>` :
            `<div class="service-image">${service.icon}</div>`;
        
        serviceCard.innerHTML = `
            ${imageContent}
            <div class="service-title">${service.title}</div>
            <div class="service-description">${service.description}</div>
            <div class="service-buttons">
                <button class="btn btn-secondary" onclick="showServiceDetails(${JSON.stringify(service).replace(/"/g, '&quot;')})">View Details</button>
                <button class="btn btn-primary" onclick="buyService('${service.title}')">Appointment</button>
            </div>
        `;
        container.appendChild(serviceCard);
    });
}

// ✅ UPDATED: Products with side-by-side buttons
function renderProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    container.innerHTML = '';
    
    window.siteData.products?.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        let photoContent = '';
        if (product.profilePhoto) {
            photoContent = `<div class="product-image">
                <img src="${product.profilePhoto}" alt="${product.name}" loading="lazy">
            </div>`;
        } else {
            photoContent = `<div class="product-image product-no-photo">
                <span style="font-size: 3rem;">📦</span>
            </div>`;
        }
        
        productCard.innerHTML = `
            ${photoContent}
            <div class="product-title">${product.name}</div>
            <div class="product-description">${product.description.substring(0, 100)}...</div>
            <div class="product-price">${product.price}</div>
            <div class="product-buttons">
                <button class="btn btn-secondary" onclick="viewProductInternal(${product.id})">View Product</button>
                <button class="btn btn-primary" onclick="buyProduct('${product.name}')">🛒 Buy Now</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Admin lists rendering (same as before - keeping short for space)
function renderAdminLists() {
    renderDoctorsAdminList();
    renderServicesAdminList();
    renderProductsAdminList();
}

function renderDoctorsAdminList() {
    const container = document.getElementById('doctorsAdminList');
    if (!container) return;
    container.innerHTML = '';
    
    window.siteData.doctors?.forEach(doctor => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <div class="item-info">
                <h4>${doctor.name}</h4>
                <p>${doctor.qualification} - ${doctor.fees}</p>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editDoctor(${doctor.id})">Edit</button>
                <button class="delete-btn" onclick="deleteDoctor(${doctor.id})">Delete</button>
            </div>
        `;
        container.appendChild(item);
    });
}

function renderServicesAdminList() {
    const container = document.getElementById('servicesAdminList');
    if (!container) return;
    container.innerHTML = '';
    
    window.siteData.services?.forEach(service => {
        const testsCount = service.tests?.length || 0;
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <div class="item-info">
                <h4>${service.title}</h4>
                <p>${service.description} (${testsCount} sub-services)</p>
            </div>
            <div class="item-actions-extended">
                <button class="manage-sub-services-btn" onclick="manageSubServices(${service.id})">Sub-Services</button>
                <button class="edit-btn" onclick="editService(${service.id})">Edit</button>
                <button class="delete-btn" onclick="deleteService(${service.id})">Delete</button>
            </div>
        `;
        container.appendChild(item);
    });
}

function renderProductsAdminList() {
    const container = document.getElementById('productsAdminList');
    if (!container) return;
    container.innerHTML = '';
    
    window.siteData.products?.forEach(product => {
        const imagesCount = product.images?.length || 0;
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <div class="item-info">
                <h4>${product.name}</h4>
                <p>${product.price} - ${imagesCount} images</p>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        `;
        container.appendChild(item);
    });
}

// Sub-services management (same as before)
window.manageSubServices = function(serviceId) {
    const service = window.siteData.services.find(s => s.id === serviceId);
    if (!service) return;
    
    window.currentServiceId = serviceId;
    
    document.getElementById('subServicesTitle').textContent = `Manage Sub-Services: ${service.title}`;
    renderSubServicesList(service.tests || []);
    document.getElementById('subServicesModal').style.display = 'block';
}

// ✅ UPDATED: Sub-services list with buy buttons
function renderSubServicesList(tests) {
    const container = document.getElementById('subServicesList');
    container.innerHTML = '';
    
    if (tests.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem;">No sub-services available. Add one below.</p>';
        return;
    }
    
    tests.forEach((test, index) => {
        const testItem = document.createElement('div');
        testItem.className = 'sub-service-item';
        testItem.innerHTML = `
            <div class="sub-service-item-content">
                <div class="sub-service-info">
                    <div class="sub-service-name">${test.name}</div>
                </div>
                <div class="sub-service-price-buy">
                    <div class="sub-service-price">${test.price}</div>
                    <button class="btn-buy-small" onclick="buySubService('${test.name}', '${test.price}')">Buy</button>
                </div>
                <div class="sub-service-actions">
                    <button class="edit-sub-service" onclick="editSubService(${index})">Edit</button>
                    <button class="delete-sub-service" onclick="deleteSubService(${index})">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(testItem);
    });
}

window.addSubService = function() {
    const name = document.getElementById('newSubServiceName').value.trim();
    const price = document.getElementById('newSubServicePrice').value.trim();
    
    if (!name || !price) {
        alert('Please enter both name and price');
        return;
    }
    
    const service = window.siteData.services.find(s => s.id === window.currentServiceId);
    if (!service.tests) service.tests = [];
    
    service.tests.push({ 
        id: Date.now(), 
        name, 
        price: price.startsWith('₹') ? price : `₹${price}`
    });
    
    updateServiceInFirebase(service);
    
    document.getElementById('newSubServiceName').value = '';
    document.getElementById('newSubServicePrice').value = '';
    renderSubServicesList(service.tests);
}

window.editSubService = function(index) {
    const service = window.siteData.services.find(s => s.id === window.currentServiceId);
    const test = service.tests[index];
    
    const newName = prompt('Edit test name:', test.name);
    const newPrice = prompt('Edit price:', test.price);
    
    if (newName && newPrice) {
        service.tests[index] = { 
            ...test, 
            name: newName, 
            price: newPrice.startsWith('₹') ? newPrice : `₹${newPrice}`
        };
        updateServiceInFirebase(service);
        renderSubServicesList(service.tests);
    }
}

window.deleteSubService = function(index) {
    if (confirm('Are you sure you want to delete this sub-service?')) {
        const service = window.siteData.services.find(s => s.id === window.currentServiceId);
        service.tests.splice(index, 1);
        updateServiceInFirebase(service);
        renderSubServicesList(service.tests);
        renderServicesAdminList();
    }
}

async function updateServiceInFirebase(service) {
    try {
        await update(ref(database, 'site'), { services: window.siteData.services });
        console.log('Service updated successfully');
    } catch (error) {
        console.error('Error updating service:', error);
        alert('Error updating service');
    }
}

window.closeSubServicesModal = function() {
    document.getElementById('subServicesModal').style.display = 'none';
    window.currentServiceId = null;
}

// Management functions (add/edit/delete) - keeping short for space
window.addNewDoctor = () => showEditModal('doctor', null);
window.editDoctor = (id) => showEditModal('doctor', window.siteData.doctors?.find(d => d.id === id));
window.deleteDoctor = async (id) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
        window.siteData.doctors = window.siteData.doctors.filter(d => d.id !== id);
        await update(ref(database, 'site'), { doctors: window.siteData.doctors });
        renderAdminLists(); renderSite(); updateStats();
    }
};

window.addNewService = () => showEditModal('service', null);
window.editService = (id) => showEditModal('service', window.siteData.services?.find(s => s.id === id));
window.deleteService = async (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
        window.siteData.services = window.siteData.services.filter(s => s.id !== id);
        await update(ref(database, 'site'), { services: window.siteData.services });
        renderAdminLists(); renderSite(); updateStats();
    }
};

window.addNewProduct = () => showEditModal('product', null);
window.editProduct = (id) => showEditModal('product', window.siteData.products?.find(p => p.id === id));
window.deleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
        window.siteData.products = window.siteData.products.filter(p => p.id !== id);
        await update(ref(database, 'site'), { products: window.siteData.products });
        renderAdminLists(); renderSite(); updateStats();
    }
};

// Edit modal and save functions (same as before, keeping short for space)
function showEditModal(type, item) {
    const modal = document.getElementById('editModal');
    const title = document.getElementById('editModalTitle');
    const content = document.getElementById('editModalContent');
    
    title.textContent = item ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    
    let formHtml = '';
    
    if (type === 'doctor') {
        formHtml = `
            <div class="form-row"><div class="form-field"><label>Name</label><input type="text" id="editName" value="${item ? item.name : ''}" required></div></div>
            <div class="form-row two-col">
                <div class="form-field"><label>Qualification</label><input type="text" id="editQualification" value="${item ? item.qualification : ''}" required></div>
                <div class="form-field"><label>Consultation Fees</label><input type="text" id="editFees" value="${item ? item.fees : ''}" required></div>
            </div>
            <div class="form-row"><div class="form-field"><label>Photo URL</label><input type="url" id="editPhotoUrl" value="${item ? item.photoUrl || '' : ''}" oninput="previewImage(this, 'editPhotoPreview')"><img id="editPhotoPreview" class="image-preview" style="display: none;"></div></div>
            <div class="form-row"><div class="form-field"><label>Description/Details</label><textarea id="editDetails" required>${item ? item.details : ''}</textarea></div></div>
            <button class="update-btn" onclick="saveDoctor(${item ? item.id : 'null'})">Save Doctor</button>
        `;
    } else if (type === 'service') {
        formHtml = `
            <div class="form-row"><div class="form-field"><label>Title</label><input type="text" id="editTitle" value="${item ? item.title : ''}" required></div></div>
            <div class="form-row"><div class="form-field"><label>Icon (Emoji)</label><input type="text" id="editIcon" value="${item ? item.icon : ''}" maxlength="5"></div></div>
            <div class="form-row"><div class="form-field"><label>Description</label><textarea id="editDescription" required>${item ? item.description : ''}</textarea></div></div>
            <div class="form-row"><div class="form-field"><label>Banner Image URL</label><input type="url" id="editBannerImageUrl" value="${item ? item.bannerImageUrl || '' : ''}" oninput="previewImage(this, 'editBannerPreview')"><img id="editBannerPreview" class="image-preview" style="display: none;"></div></div>
            <button class="update-btn" onclick="saveService(${item ? item.id : 'null'})">Save Service</button>
        `;
    } else if (type === 'product') {
        const imagesValue = item && item.images ? item.images.join(', ') : '';
        formHtml = `
            <div class="form-row"><div class="form-field"><label>Product Name</label><input type="text" id="editProductName" value="${item ? item.name : ''}" required></div></div>
            <div class="form-row"><div class="form-field"><label>Price</label><input type="text" id="editPrice" value="${item ? item.price : ''}" required></div></div>
            <div class="form-row"><div class="form-field"><label>Description</label><textarea id="editProductDescription" required>${item ? item.description : ''}</textarea></div></div>
            <div class="form-row"><div class="form-field"><label>Profile Photo URL</label><input type="url" id="editProfilePhoto" value="${item ? item.profilePhoto || '' : ''}" oninput="previewImage(this, 'editProfilePreview')"><img id="editProfilePreview" class="image-preview" style="display: none;"><small style="color: #666;">Main product photo for cards</small></div></div>
            <div class="form-row"><div class="form-field"><label>Gallery Images (comma separated URLs)</label><textarea id="editProductImages" placeholder="https://i.ibb.co/image1.jpg, https://i.ibb.co/image2.jpg" rows="3">${imagesValue}</textarea><small style="color: #666;">Multiple image URLs for product gallery</small></div></div>
            <button class="update-btn" onclick="saveProduct(${item ? item.id : 'null'})">Save Product</button>
        `;
    }
    
    content.innerHTML = formHtml;
    modal.style.display = 'block';
}

// Save functions (keeping short)
window.saveDoctor = async (id) => {
    const doctorData = {
        id: id || Date.now(),
        name: document.getElementById('editName').value,
        qualification: document.getElementById('editQualification').value,
        fees: document.getElementById('editFees').value,
        photoUrl: document.getElementById('editPhotoUrl').value,
        details: document.getElementById('editDetails').value
    };
    
    if (id) {
        const index = window.siteData.doctors.findIndex(d => d.id === id);
        window.siteData.doctors[index] = doctorData;
    } else {
        window.siteData.doctors.push(doctorData);
    }
    
    try {
        await update(ref(database, 'site'), { doctors: window.siteData.doctors });
        closeEditModal(); renderAdminLists(); renderSite(); updateStats();
        alert('Doctor saved successfully!');
    } catch (error) {
        alert('Error saving doctor'); console.error(error);
    }
};

window.saveService = async (id) => {
    const serviceData = {
        id: id || Date.now(),
        title: document.getElementById('editTitle').value,
        icon: document.getElementById('editIcon').value,
        description: document.getElementById('editDescription').value,
        bannerImageUrl: document.getElementById('editBannerImageUrl').value,
        tests: id ? window.siteData.services.find(s => s.id === id).tests || [] : []
    };
    
    if (id) {
        const index = window.siteData.services.findIndex(s => s.id === id);
        window.siteData.services[index] = serviceData;
    } else {
        window.siteData.services.push(serviceData);
    }
    
    try {
        await update(ref(database, 'site'), { services: window.siteData.services });
        closeEditModal(); renderAdminLists(); renderSite(); updateStats();
        alert('Service saved successfully!');
    } catch (error) {
        alert('Error saving service'); console.error(error);
    }
};

window.saveProduct = async (id) => {
    const imagesText = document.getElementById('editProductImages').value;
    const imagesArray = imagesText ? imagesText.split(',').map(url => url.trim()).filter(Boolean) : [];
    
    const productData = {
        id: id || Date.now(),
        name: document.getElementById('editProductName').value,
        price: document.getElementById('editPrice').value,
        description: document.getElementById('editProductDescription').value,
        profilePhoto: document.getElementById('editProfilePhoto').value,
        images: imagesArray
    };
    
    if (id) {
        const index = window.siteData.products.findIndex(p => p.id === id);
        window.siteData.products[index] = productData;
    } else {
        window.siteData.products.push(productData);
    }
    
    try {
        await update(ref(database, 'site'), { products: window.siteData.products });
        closeEditModal(); renderAdminLists(); renderSite(); updateStats();
        alert(`Product saved successfully!\nImages: ${imagesArray.length}`);
    } catch (error) {
        alert('Error saving product'); console.error(error);
    }
};

window.closeEditModal = () => document.getElementById('editModal').style.display = 'none';

// ✅ UPDATED: Global functions with configurable WhatsApp
window.toggleMenu = function() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
}

window.bookAppointment = function() {
    const whatsappNum = getWhatsAppNumber().replace('+', '');
    const message = encodeURIComponent("Hello, I would like to book an appointment with Physio - The Therapeutic Moves.");
    window.open(`https://wa.me/${whatsappNum}?text=${message}`, '_blank');
}

window.bookDoctorAppointment = function(doctorName) {
    const whatsappNum = getWhatsAppNumber().replace('+', '');
    const message = encodeURIComponent(`Hello, I would like to book an appointment with ${doctorName} at Physio - The Therapeutic Moves.`);
    window.open(`https://wa.me/${whatsappNum}?text=${message}`, '_blank');
}

// ✅ NEW: Buy service function
window.buyService = function(serviceName) {
    const whatsappNum = getWhatsAppNumber().replace('+', '');
    const message = encodeURIComponent(`I would like to book ${serviceName} service. Please provide more details.`);
    window.open(`https://wa.me/${whatsappNum}?text=${message}`, '_blank');
}

// ✅ NEW: Buy sub-service function
window.buySubService = function(testName, price) {
    const whatsappNum = getWhatsAppNumber().replace('+', '');
    const message = encodeURIComponent(`I would like to book "${testName}" for ${price}. Please provide more details.`);
    window.open(`https://wa.me/${whatsappNum}?text=${message}`, '_blank');
}

window.buyProduct = function(productName) {
    const whatsappNum = getWhatsAppNumber().replace('+', '');
    const message = encodeURIComponent(`I would like to buy ${productName}. Please provide details about availability and delivery.`);
    window.open(`https://wa.me/${whatsappNum}?text=${message}`, '_blank');
}

// Modal functions
window.showDoctorDetails = function(doctor) {
    document.getElementById('modalDoctorName').textContent = doctor.name;
    document.getElementById('modalDoctorQualification').textContent = doctor.qualification;
    document.getElementById('modalDoctorFees').textContent = `Consultation Fee: ${doctor.fees}`;
    document.getElementById('modalDoctorDetails').textContent = doctor.details;
    
    const avatar = document.getElementById('modalDoctorAvatar');
    if (doctor.photoUrl) {
        avatar.innerHTML = `<img src="${doctor.photoUrl}" alt="${doctor.name}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;" loading="lazy">`;
    } else {
        avatar.innerHTML = '👨‍⚕️';
        avatar.style.fontSize = '2.2rem';
    }
    
    document.getElementById('modalBookingBtn').onclick = () => {
        bookDoctorAppointment(doctor.name);
        closeDoctorDetails();
    };
    
    document.getElementById('doctorDetailsModal').style.display = 'block';
}

window.closeDoctorDetails = () => document.getElementById('doctorDetailsModal').style.display = 'none';

// ✅ UPDATED: Service details with sub-service buy buttons
window.showServiceDetails = function(service) {
    document.getElementById('serviceDetailsTitle').textContent = service.title;
    const content = document.getElementById('serviceDetailsContent');
    content.innerHTML = `
        <p style="margin-bottom: 1rem; color: #666;">${service.description}</p>
        <h4 style="color: #2c8577; margin-bottom: 1rem;">Available Tests & Treatments:</h4>
        ${service.tests?.map(test => `
            <div class="test-item">
                <div class="test-item-info">
                    <span>${test.name}</span>
                </div>
                <div class="test-item-actions">
                    <span class="test-item-price">${test.price}</span>
                    <button class="btn-buy-small" onclick="buySubService('${test.name}', '${test.price}')">Buy</button>
                </div>
            </div>
        `).join('') || '<p style="color: #666;">No sub-services available.</p>'}
    `;
    document.getElementById('serviceDetailsModal').style.display = 'block';
}

window.closeServiceDetails = () => document.getElementById('serviceDetailsModal').style.display = 'none';

window.showAdminLogin = function() {
    document.getElementById('adminModal').style.display = 'block';
    if (document.getElementById('mobileMenu').classList.contains('active')) {
        toggleMenu();
    }
}

window.closeAdminModal = () => document.getElementById('adminModal').style.display = 'none';

// Admin login
document.getElementById('adminLoginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        await signInWithEmailAndPassword(auth, username, password);
        document.getElementById('adminModal').style.display = 'none';
        document.getElementById('adminDashboard').classList.add('active');
        document.querySelector('.main').style.display = 'none';
        initAdminTabs();
        renderAdminLists();
        updateAdminForm();
    } catch (error) {
        alert('Invalid credentials');
    }
});

window.logout = function() {
    signOut(auth);
    document.getElementById('adminDashboard').classList.remove('active');
    document.querySelector('.main').style.display = 'block';
}

// Initialize
renderSite();
updateStats();
hideSkeletons();

// Modal click handlers
window.onclick = function(event) {
    const modals = [
        'adminModal', 'serviceDetailsModal', 'doctorDetailsModal', 
        'editModal', 'productViewModal', 'subServicesModal'
    ];
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target == modal) {
            modal.style.display = 'none';
            if (modalId === 'productViewModal') closeProductView();
            if (modalId === 'subServicesModal') closeSubServicesModal();
        }
    });
}
