const vm = require('vm');

export default async (req, res) => {
  const { code, language } = JSON.parse(req.body);

  try {
    let output;
    switch(language) {
      case 'python':
        output = `Python execution simulated: ${code.slice(0, 50)}...`;
        break;

      case 'javascript':
        const sandbox = {
          console: { log: (...args) => args.join(' ') },
          Math: {},
          Array: {}
        };
        
        output = vm.runInNewContext(code, sandbox, { timeout: 2000 });
        break;

      default:
        output = `${language} not configured`;
    }

    res.status(200).json({ output: String(output) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
