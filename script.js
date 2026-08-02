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
    })
    .catch(err => alert("Data load කිරීමේ දෝෂයක් සිදු විය!"));
}
    });
}
// Load Reviews on Page Startup
document.addEventListener("DOMContentLoaded", fetchReviews);

function fetchReviews() {
    fetch(${SCRIPT_URL}?action=getReviews)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('reviewsContainer');
        container.innerHTML = "";
        
        if (!data || data.length === 0) {
            container.innerHTML = "<p style='text-align:center; color:#94a3b8;'>No reviews yet.</p>";
            return;
        }

        data.reverse().forEach(rev => {
            let stars = "⭐".repeat(rev.rating);
            let imgHtml = rev.imageUrl ? <img src="${rev.imageUrl}" style="max-width:100%; max-height:250px; border-radius:8px; margin-top:10px; border:1px solid #334155;" alt="Screenshot"> : '';
            
            container.innerHTML += `
                <div style="background: #0f172a; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #f59e0b;">
                    <div style="display: flex; justify-content: space-between;">
                        <strong style="color: #f59e0b;">${rev.name}</strong>
                        <span style="font-size: 12px; color: #94a3b8;">${rev.date || ''}</span>
                    </div>
                    <div style="margin: 5px 0;">${stars}</div>
                    <p style="margin: 5px 0; font-size: 14px; color: #cbd5e1;">${rev.comment}</p>
                    ${imgHtml}
                </div>
            `;
        });
    })
    .catch(() => {
        document.getElementById('reviewsContainer').innerHTML = "<p style='text-align:center; color:#ef4444;'>Error loading reviews.</p>";
    });
}

function submitReview() {
    const name = document.getElementById('revName').value.trim();
    const rating = document.getElementById('revRating').value;
    const comment = document.getElementById('revComment').value.trim();
    const fileInput = document.getElementById('revImage');
    const subBtn = document.getElementById('subBtn');

    if (!name || !comment) {
        alert("කරුණාකර නම සහ Comment එක ඇතුළත් කරන්න!");
        return;
    }

    subBtn.innerText = "Uploading...";
    subBtn.disabled = true;

    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            sendData(name, rating, comment, e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        sendData(name, rating, comment, "");
    }
}

function sendData(name, rating, comment, imageBase64) {
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment, image: imageBase64 })
    })
    .then(() => {
        alert("ඔබගේ Review එක සාර්ථකව එකතු විය! 🌟");
        document.getElementById('revName').value = "";
        document.getElementById('revComment').value = "";
        document.getElementById('revImage').value = "";
        document.getElementById('subBtn').innerText = "Submit Review";
        document.getElementById('subBtn').disabled = false;
        setTimeout(fetchReviews, 2000);
    })
    .catch(() => {
        alert("Error submitting review!");
        document.getElementById('subBtn').innerText = "Submit Review";
        document.getElementById('subBtn').disabled = false;
    });
}
