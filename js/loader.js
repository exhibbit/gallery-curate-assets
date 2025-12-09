// Complete loader.js with overlay injection system

// Track current mode
let currentMode = null;

// Load and inject HANG overlay
async function loadHang() {
  const stageMode = document.getElementById('stageMode');
  
  // If already in HANG mode, do nothing
  if (currentMode === 'hang') return;
  
  try {
    // Clear any existing content
    stageMode.innerHTML = '';
    
    // Remove any previously loaded overlay CSS
    removeOverlayCSS();
    
    // Load hang.css
    loadCSS('overlays/hang.css', 'hang-css');
    
    // Fetch hang.html
    const response = await fetch('overlays/hang.html');
    const html = await response.text();
    
    // Inject the HTML
    stageMode.innerHTML = html;
    
    // Update current mode
    currentMode = 'hang';
    
    // Update button states
    updateButtonStates('hang');
    
    // Calculate positioning (if needed for responsive adjustments)
    calculateHangPosition();
    
  } catch (error) {
    console.error('Error loading HANG overlay:', error);
    stageMode.innerHTML = '<p style="color: red;">Error loading HANG mode</p>';
  }
}

// Load and inject CUSTOMISE overlay
async function loadCustomise() {
  const stageMode = document.getElementById('stageMode');
  
  // If already in CUSTOMISE mode, do nothing
  if (currentMode === 'customise') return;
  
  try {
    // Clear any existing content
    stageMode.innerHTML = '';
    
    // Remove any previously loaded overlay CSS
    removeOverlayCSS();
    
    // Load customise.css
    loadCSS('overlays/customise.css', 'customise-css');
    
    // Fetch customise.html
    const response = await fetch('overlays/customise.html');
    const html = await response.text();
    
    // Inject the HTML
    stageMode.innerHTML = html;
    
    // Update current mode
    currentMode = 'customise';
    
    // Update button states
    updateButtonStates('customise');
    
  } catch (error) {
    console.error('Error loading CUSTOMISE overlay:', error);
    stageMode.innerHTML = '<p style="color: red;">Error loading CUSTOMISE mode</p>';
  }
}

// Dynamically load CSS file
function loadCSS(href, id) {
  // Check if already loaded
  if (document.getElementById(id)) return;
  
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

// Remove overlay CSS files
function removeOverlayCSS() {
  const hangCSS = document.getElementById('hang-css');
  const customiseCSS = document.getElementById('customise-css');
  
  if (hangCSS) hangCSS.remove();
  if (customiseCSS) customiseCSS.remove();
}

// Update button visual states
function updateButtonStates(activeMode) {
  const buttons = document.querySelectorAll('.stage__btn');
  
  buttons.forEach(btn => {
    const btnText = btn.textContent.trim().toLowerCase();
    
    if (btnText === activeMode) {
      // Active state: black background, white text
      btn.style.background = '#000000';
      btn.style.color = '#FFFFFF';
      btn.style.fontWeight = '600';
    } else {
      // Inactive state: white background, black text
      btn.style.background = '#FFFFFF';
      btn.style.color = '#000000';
      btn.style.fontWeight = '500';
    }
  });
}

// Calculate positioning (optional - for dynamic adjustments)
function calculateHangPosition() {
  const customiseBtn = document.querySelector('.stage__btn:nth-child(2)');
  const root = document.documentElement;
  
  if (customiseBtn) {
    root.style.setProperty('--hang-left', customiseBtn.offsetLeft + 'px');
    root.style.setProperty('--plan-left-correction', (10 - customiseBtn.offsetLeft) + 'px');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Optionally load HANG mode by default
  // loadHang();
});