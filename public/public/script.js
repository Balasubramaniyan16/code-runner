document.getElementById('run').addEventListener('click', async () => {
  const code = document.getElementById('code').value;
  const language = document.getElementById('language').value;
  const outputDiv = document.getElementById('output');
  
  outputDiv.textContent = 'Executing...';
  
  try {
    const response = await fetch('/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language })
    });
    const result = await response.json();
    outputDiv.textContent = result.output || result.error;
  } catch (err) {
    outputDiv.textContent = `Error: ${err.message}`;
  }
});
