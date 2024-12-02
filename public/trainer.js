// Fetch trainer details based on query parameter 'id' from URL
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const trainerId = params.get('id');

    if (!trainerId) {
        document.querySelector('.trainer-info').innerHTML = `<p>Trainer ID not specified.</p>`;
        return;
    }

    // Fetch trainer data from the backend
    
   
    fetch(`/api/trainers/${trainerId}`)
    

        .then(response => {
            if (!response.ok) {
                throw new Error('Trainer not found');
            }
            return response.json();
        })
        .then(trainer => {
            // Populate trainer details on the page
            document.getElementById('trainer-image').src = trainer.image;
            document.getElementById('trainer-name').textContent = trainer.name;
            document.getElementById('trainer-speciality').textContent = trainer.speciality;
            document.getElementById('trainer-bio').textContent = trainer.bio;
            document.getElementById('facebook-link').href = trainer.social.facebook || '#';
            document.getElementById('twitter-link').href = trainer.social.twitter || '#';
            document.getElementById('instagram-link').href = trainer.social.instagram || '#';
            document.getElementById('youtube-link').href = trainer.social.youtube || '#';
        })
        .catch(error => {
            console.error('Error fetching trainer data:', error);
            document.querySelector('.trainer-info').innerHTML = `<p>Trainer not found.</p>`;
        });
});
