document.getElementById('analyze-button').addEventListener('click', analyzeImage);

async function analyzeImage() {
    const fileInput = document.getElementById('image-input');
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (fileInput.files.length === 0) {
        alert('Please select an image file.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function(event) {
        const base64String = event.target.result.split(',')[1];

        const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requests: [
                    {
                        image: {
                            content: base64String
                        },
                        features: [
                            {
                                type: 'LABEL_DETECTION',
                                maxResults: 10
                            }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();
        const labels = data.responses[0].labelAnnotations;

        labels.forEach(label => {
            const p = document.createElement('p');
            p.textContent = `${label.description} (score: ${label.score})`;
            resultsDiv.appendChild(p);
        });
    };

    reader.readAsDataURL(file);
}
