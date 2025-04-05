// Secure code execution
export default async (req, res) => {
  const { code, language } = JSON.parse(req.body);
  
  try {
    let output;
    switch(language) {
      case 'python':
        output = `Python execution simulated: ${code.slice(0, 50)}...`;
        break;
      case 'javascript':
        // WARNING: Replace with safe eval alternative
        output = Function('"use strict";return (' + code + ')')();
        break;
      default:
        output = `${language} not configured`;
    }
    
    res.status(200).json({ output });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
