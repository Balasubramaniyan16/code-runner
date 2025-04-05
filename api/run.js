const { VM } = require('vm2');

module.exports = async (req, res) => {
  try {
    // Parse input
    const { code, language } = typeof req.body === 'string' 
      ? JSON.parse(req.body) 
      : req.body;

    // Validate input
    if (!code || !language) {
      throw new Error('Missing code or language');
    }

    // Execute code
    let output;
    switch(language.toLowerCase()) {
      case 'javascript':
        const vm = new VM({
          timeout: 2000,
          sandbox: { 
            console: { log: (...args) => args.join(' ') }
          }
        });
        output = await vm.run(code);
        break;
        
      case 'python':
        output = `Python simulated: ${code.substring(0, 50)}...`;
        break;
        
      default:
        output = `${language} execution simulated`;
    }

    // Send response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ output: String(output) });
    
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Block direct execution
if (require.main === module) {
  console.error('This script cannot be run directly');
  process.exit(1);
}
