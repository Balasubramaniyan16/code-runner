document.getElementById('run').addEventListener('click', async () => {
  const code = document.getElementById('code').value.trim();
  const language = document.getElementById('language').value;
  const outputEl = document.getElementById('output');
  
  if (!code) {
    outputEl.textContent = 'Error: Please enter some code';
    return;
  }

  outputEl.textContent = 'Executing...';
  
  try {
    const response = await fetch('/run', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ code, language })
    });
    
    const data = await response.json();
    outputEl.textContent = data.output || data.error;
    
  } catch (err) {
    outputEl.textContent = `Network Error: ${err.message}`;
  }
});
