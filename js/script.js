const languageColors = {
    "JavaScript": "#f1e05a",
    "TypeScript": "#2b7489",
    "Python": "#3572A5",
    "Java": "#b07219",
    "C#": "#178600",
    "PHP": "#4F5D95",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "Ruby": "#701516",
    "Go": "#00ADD8",
    "Rust": "#dea584",
    "Shell": "#89e051",
    "C++": "#f34b7d",
    "C": "#555555"
};

function createProjectCards(repos) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';

    if (!repos.length) {
        container.innerHTML = '<div class="error-message">No repositories found.</div>';
        return;
    }

    const projectsGrid = document.createElement('div');
    projectsGrid.className = 'projects-grid';

    repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'project-card';

        const languageColor = languageColors[repo.language] || '#858585';

        const topicsHTML = repo.topics && repo.topics.length 
            ? `<div class="project-tags">
                ${repo.topics.map(topic => `<span class="tag">${topic}</span>`).join('')}
              </div>`
            : '';

        card.innerHTML = `
            <div class="project-content">
                <h3 class="project-title">${repo.name}</h3>
                <p class="project-language">
                    <span class="language-color" style="background-color: ${languageColor};"></span>
                    ${repo.language || 'Unknown'}
                </p>
                <p class="project-description">${repo.description || 'No description available.'}</p>
                ${topicsHTML}
                <div class="project-links">
                    <a class="project-link" href="${repo.html_url}" target="_blank">View on GitHub</a>
                    ${repo.homepage ? `<a class="project-link" href="${repo.homepage}" target="_blank">Live Demo</a>` : ''}
                </div>
            </div>
        `;

        projectsGrid.appendChild(card);
    });

    container.appendChild(projectsGrid);
}

// Fetch repos from GitHub
fetch('https://api.github.com/users/B-a-y-a-n-d-a/repos')
    .then(res => res.json())
    .then(data => {
        createProjectCards(data);
    })
    .catch(err => {
        const container = document.getElementById('projects-container');
        container.innerHTML = '<div class="error-message">Failed to load GitHub projects. Please try again later.</div>';
        console.error(err);
    });

    // Initialize EmailJS
(function() {
    // EmailJS user ID
    emailjs.init("QRMZp4Zq_LCCUcn4t");
    
    // Add form submission event handler
    document.getElementById('joinForm').addEventListener('submit', handleSubmit);
})();
 
/**
* Handles the form submission
* @param {Event} event - The form submission event
*/
function handleSubmit(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Show loading state
    const submitButton = document.getElementById('submit-button');
    const formStatus = document.getElementById('form-status');
    
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;
    formStatus.textContent = "";
    
    // Collect form data
    const params = {
        gamertag: document.getElementById('gamertag').value,
        real_name: document.getElementById('realName').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        platform: document.getElementById('platform').value,
        location: document.getElementById('location').value,
        kd_ratio: document.getElementById('kd').value,
        hours_available: document.getElementById('hours').value,
        experience: document.getElementById('experience').value,
        why_join: document.getElementById('why').value,
        commitment: document.getElementById('commitment').checked ? 'Yes' : 'No',
        requirements: document.getElementById('requirements').checked ? 'Yes' : 'No',
        subject: '[SANDF] New Clan Application'
    };
    
    // Send email using EmailJS
   emailjs.send('service_cmpibbi','template_glshxor', params)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            // Redirect to thank you page
            window.location.href = "thank-you.html";
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            formStatus.textContent = 'Failed to send form. Please try again later.';
            submitButton.textContent = "Submit Application";
            submitButton.disabled = false;
        });
}