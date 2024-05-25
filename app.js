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

        const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/oDqyxGp3cGVD\nU0CklFOnq3ApLcjwjXBTVFL0ijm6NCpT1iaOlXJYC94/h0jzce3u9rfDNhIznd5h\nKEtikGqxJ/TxOahJWdpbWwPKjrpQbqF7AoVHpSYH2ZpX1VjNwggAblPHTowk/Nxo\niKBNnknb4ILNjKen+gMRze0cA4/Wnkm6rnLXF+3w6whh45E/jo0py8n/BMnbPa3g\nx/VUC7muRrtTkWgZeH6Aa88QciYcrwdNIl3CgXxMIm7QtpJGsPc8dLPHuxyjmdnS\n/qCH7YaaFS0dxhddwuYPNMjHTrmenoP+70cpfRPUwlfLp79xQd4Nb5a7UvmD1EYC\nlXlAqcNfAgMBAAECggEAWSt19RcKVf8S2BPnCk7NaMIRpM/d5/ZhNR2RpqKlvzyk\nD7Qg6AuqFEediaFp9ILpDeB33ZqNOMC3KS3nenuqcjqeNBw4770kq4s8RedJ0sDQ\nWt3u6Ep02oVLWaD5PHIUaCLu0FmARHv4Epq1QbktNGiSZZUUtUlVYVUah4Uuy1a3\nyHQUkZ0/CjMLPv/3IZH5KlICL9HIFW1tSYlFY9iWS1ohwYORIx2yp8a9iBxBUeNC\n/yYyGxBOvX70e8m8JOmVI/L9h6r6Y58lmLQ2VAnyigL5PR/XgJEgu7LtihcLU8Fe\nnwZ8Xh1G4AQtG3tces1sxA+vilqEzh9WXUNQtm9+LQKBgQD/jWCtAYCOYhKC3miT\ndyGTJ+9aSBtAoJMHDnSHgunc80zf4Dr3YVaYsYeJSxOLN65H1YscjHABlOSmz5/P\n9gKVKqyJtt22z/MfuaebylDybm/wMVXfJYedhAl7FObMUG/MzqXk3RwsW3RkfQIX\nC3VOBQMFenXjjDvZOFdFeZ04vQKBgQC/9i3LSxOmsmQlagBrWK2w+CJ7ww0C+cYI\nSyVmHCDKb25hCsYzwNwatKse732CeEYQ0W4rnUpzG5/LZdL6npEYNPHo7Zu3GtGZ\ne9h+Wj6nM3GaFXlGrxl2yA5/AFSdyF2YXYCR1+rjKBrfpWyuXEn8sLHOy+/8Bvst\nRu+pAv70SwKBgQDhVQzon8l2Qr2lzWySktn1AqKHjcsR6kSaVUGk92c0nweq4/G6\njYao7ujew2dBO2CeEIowKxjcHCidebelzHssgktOxwKqnqP21mIW+Yb0rTJgrW/V\naicxWepuL9juUQKzqYcXzWt5JU71CFEedskBeWPXocpvUQi4mXhCV2CtVQKBgAoO\nMj3o8+GSjK5tDBKTdZ3EkcHb6M2UGeyLSy07IfiYt7Z7owBJBP6dIi2fq/pupHTz\nE4tTVPgMpWU5M0EPl1gmRdnGwJZp4DrjAuczgP6vMi85Gr46I+JV/nRmpwgQ295E\nX5zEK7i0fBvlBXloujNzag0EH9Ea6INpqNo4nvRbAoGBANgLquSoe2WR1izX+Wfy\ndGKoGf6V/ICNuJaookGm3cA7i2TkFfHqK3m6B+b/ueSdf9db+zqhIeBHb0tdLjkJ\nnHAARBvI12IF0z2+9228LTLJAJtNHTa57qvItcAhgbmhMKxMeIpAl8V5y1tCUlqe\n8ZxLFuh3zcnMtC6FFsYc4Hgm', {
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
