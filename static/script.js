document.getElementById("emotion-form").addEventListener("submit", function (event) {
  event.preventDefault();

  var text = document.getElementById("textToAnalyze").value;
  var resultDiv = document.getElementById("result");
  var url = "/emotionDetector?textToAnalyze=" + encodeURIComponent(text);

  fetch(url)
    .then(function (response) {
      return response.text().then(function (data) {
        resultDiv.textContent = data;
        resultDiv.style.color = response.ok ? "#333333" : "#b00020";
      });
    })
    .catch(function (error) {
      resultDiv.textContent = "Error: " + error;
      resultDiv.style.color = "#b00020";
    });
});
