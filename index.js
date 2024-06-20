const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require('readline');

// Set up readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const askQuestion = () => {
console.log('\n\n _______');
  rl.question('\nEnter your prompt (type EXIT to quit):', async (prompt) => {
    if (prompt === 'EXIT') {
      console.log('SEE YOU SOON ');
      rl.close();
      return;
    }

  console.log('\n\n _______');
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });


    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log(text);
    } catch (error) {
      console.error('Error generating content:', error);
    }

    // Ask the next question
    askQuestion();
  });
};

askQuestion();
