let selectionTimeout = null;

console.log("tvoja mama");

document.addEventListener("selectionchange", () => {
    let url = window.location.href;
    clearTimeout(selectionTimeout);

    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText.length > 0) {
        selectionTimeout = setTimeout(() => {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('ai_selection', selectedText);
            window.history.pushState({}, '', currentUrl.toString());
            console.log(currentUrl.toString());
            console.log("Selected for 5 seconds:", selectedText);

            const requestBody = {
                selectedText: selectedText
            }

            fetch('http://127.0.0.1:8000/selected', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(requestBody) 
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Server response:', data);
            })
            .catch(error => {
                console.error('Error sending POST request or processing response:', error);
            
            });


        }, 5000);
    }
});
