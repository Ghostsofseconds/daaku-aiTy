const OPENAI_API_KEY = "sk-temp-6H9TestKey-OpenAi-Working-Response-123456";

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "hi-IN";
  speechSynthesis.speak(utterance);
}

function search() {
  const query = document.getElementById("userQuery").value.trim();
  if (!query) return;

  document.getElementById("response").innerText = "Searching...";
  speak("Searching for " + query);

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: query }],
      max_tokens: 150,
      temperature: 0.7,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const result = data.choices?.[0]?.message?.content?.trim();
      if (result) {
        document.getElementById("response").innerText = result;
        speak("Yeh raha aapka result");
      } else {
        document.getElementById("response").innerText = "❌ No response received.";
        speak("Kuch response nahi mila");
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("response").innerText = "Error: " + err.message;
      speak("Kuch galat ho gaya...");
    });
}
