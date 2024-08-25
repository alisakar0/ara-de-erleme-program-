document.addEventListener('DOMContentLoaded', function() {
    var backButton = document.getElementById('back-button');
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = '/'; 
        });
    } else {
        console.error('Geri dönüş butonu bulunamadı!');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointment-form');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const formData = new FormData(form); 

        try {
            const response = await fetch('/appointment', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                successMessage.style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/'; 
                }, 3000); 
            } else {
                alert('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    });
});