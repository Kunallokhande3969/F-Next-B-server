// test-gemini-direct.js
const axios = require('axios');
require('dotenv').config();

async function testDirectAPI() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.log("❌ GEMINI_API_KEY missing in .env file");
      return false;
    }

    console.log("🔑 API Key found, testing...");
    
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const response = await axios.post(url, {
      contents: [{ 
        parts: [{ 
          text: "Say 'Hello World' in Hindi and English" 
        }] 
      }]
    }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000
    });
    
    console.log("✅ DIRECT API SUCCESS!");
    console.log("Response:", response.data.candidates[0].content.parts[0].text);
    return true;
  } catch (error) {
    console.log("❌ DIRECT API FAILED:");
    console.log("Status Code:", error.response?.status);
    console.log("Error Message:", error.response?.data?.error?.message || error.message);
    return false;
  }
}

// Run the test
testDirectAPI().then(success => {
  if (success) {
    console.log("🎉 Test passed! Now update your geminiService.js");
  } else {
    console.log("💥 Test failed! Check API key and try again.");
  }
});