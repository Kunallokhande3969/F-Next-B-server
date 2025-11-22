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
    
    // Try multiple models
    const modelsToTry = [
      "gemini-1.5-pro-latest",
      "gemini-1.5-flash-latest", 
      "gemini-1.0-pro-latest",
      "gemini-1.0-pro-001",
      "gemini-pro"
    ];

    for (const modelName of modelsToTry) {
      try {
        console.log(`\n🔧 Testing model: ${modelName}`);
        
        const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
        
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
        
        console.log(`✅ SUCCESS with ${modelName}`);
        console.log("Response:", response.data.candidates[0].content.parts[0].text);
        return true;
        
      } catch (error) {
        console.log(`❌ ${modelName} failed: ${error.response?.data?.error?.message || error.message}`);
      }
    }
    
    console.log("\n💥 All models failed!");
    return false;
    
  } catch (error) {
    console.log("❌ General Error:", error.message);
    return false;
  }
}

// Run the test
testDirectAPI().then(success => {
  if (success) {
    console.log("\n🎉 Test passed! Now update your geminiService.js");
  } else {
    console.log("\n💥 Test failed! Check API key and try again.");
  }
});