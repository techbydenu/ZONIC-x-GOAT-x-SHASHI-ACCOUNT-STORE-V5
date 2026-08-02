// Hide Loader when page loads
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 800);
});

// Mobile Navbar Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu on clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// Live Search Filter for Accounts
const searchInput = document.getElementById('searchInput');
const accountGrid = id = document.getElementById('accountGrid');

if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = accountGrid.getElementsByClassName('card');

        Array.from(cards).forEach(card => {
            const tags = card.getAttribute('data-tags') || '';
            const textContent = card.textContent.toLowerCase();

            if (tags.toLowerCase().includes(searchTerm) || textContent.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Google Sheet API Link
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwchSye8Vs9CiUUfb2jS-KDpmo-Z7y1OlGd6OMgs5J6DB12vlMdYG9cSl-qrJnUGLnN-g/exec"; 

function checkPayment() {
    const query = document.getElementById('searchInput').value.trim();
    if(!query) {
        alert("කරුණාකර Phone Number එකක් ඇතුළත් කරන්න!");
        return;
    }

    fetch(SCRIPT_URL + "?phone=" + query)
    .then(res => res.json())
    .then(data => {
        if(data.status === "success") {
            document.getElementById('resName').innerText = data.name;
            document.getElementById('resAcc').innerText = data.accId;
            document.getElementById('resTotal').innerText = "LKR " + data.total;
            document.getElementById('resPaid').innerText = "LKR " + data.paid;
            document.getElementById('resDue').innerText = "LKR " + data.due;
            document.getElementById('resultBox').style.display = "block";
        } else {
            alert("විස්තර හමු වූයේ නැත! කරුණාකර Phone Number එක පරීක්ෂා කරන්න.");
        }
   
