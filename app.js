document.getElementById('analyze-button').addEventListener('click', analyzeImage);

const apiKey = 'ab9110e16c7593eadee1ddd4d5b9be0cd8a64120'; 

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
        console.log('Base64 String:', base64String);

        try {
            const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
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

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            if (data.responses && data.responses[0].labelAnnotations) {
                const labels = data.responses[0].labelAnnotations;
                labels.forEach(label => {
                    const p = document.createElement('p');
                    p.textContent = `${label.description} (score: ${label.score})`;
                    resultsDiv.appendChild(p);
                });
            } else {
                resultsDiv.innerHTML = 'No labels detected.';
            }
        } catch (error) {
            console.error('Error:', error);
            resultsDiv.innerHTML = 'Error analyzing the image.';
        }
    };

    reader.readAsDataURL(file);
}
