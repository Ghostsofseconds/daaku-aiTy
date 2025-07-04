const OPENAI_API_KEY = "5109f31c6a904a99b9a6b755d19394e5";

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "hi-IN";
  speechSynthesis.speak(utterance);
}

function search() {
  const query = document.getElementById("userQuery").value;
  document.getElementById("response").innerText = "Searching...";
  speak("Searching for " + query);

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: query,
      max_tokens: 100,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const result = data.choices[0].text.trim();
      document.getElementById("response").innerText = result;
      speak("Yeh raha aapka result");
    })
    .catch((err) => {
      document.getElementById("response").innerText = "Error: " + err.message;
      speak("Kuch galat ho gaya...");
    });
}
