var selLang = "en-US";
var chatArea = document.getElementById("chatArea");
var inputField = document.getElementById("inputField");
var prevRes = "";

//get time and date
function getTimeStamp() {
  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var time = hours + ":" + minutes + " " + amOrPm;
  return time;
}

inputField.addEventListener('keydown', function(event) {
  // Check if the "Enter" key was pressed
  if (event.key === 'Enter') {
    // Call your function here
    sendMessage();
  }
});

var OPENAI_API_KEY = "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";
document.getElementById("ccon").innerHTML = "<p style='opacity:80%;color: #222525; padding:-5px;font-size:10px;margin-bottom:-2px; text-align: center;'><b>Made with ❤️ By <a style='color:#006412' href='https://sohanlalkush.pharmalite.in'>Sohan Lal</a> </b></p>";


function sendMessage() {
  var message = inputField.value;
  if (message === "") {
    alert("Type in your message!");
    return;
  }
  chatArea.innerHTML += "<div class='message sent'><strong>You:</strong> " + message + "<span class='metadata' ><span class='time'>" + getTimeStamp() + "</span><span class='tick tick-animation'> <svg xmlns='http://www.w3.org/2000/svg' width='16' height='15' id='msg-dblcheck' x='2047' y='2061'><path d='M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z' fill='#92a58c'/></svg> <svg xmlns='http://www.w3.org/2000/svg' width='16' height='15' id='msg-dblcheck-ack' x='2063' y='2076'><path d='M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z' fill='#4fc3f7'/></svg> </span></span></div>";
document.getElementById('status').innerText= 'typing...';
animateMessage();
  var answer = getAnswer(message);
  if (answer !== null) {
    // display answer from qaData
    chatArea.innerHTML += "<div class='message received'><span class='p'><strong>Pharmalite:</strong> " + answer + "</span><span class='metadata' ><span class='time'>" + getTimeStamp() + "</span></span></div>";
    document.getElementById('status').innerHTML = '<nbsp style="color:#00e93d">● </nbsp>online';
    var messageResponse = answer;
   
    // Save chat history to localStorage
  const messageObj = {
    type: 'sent',
    text: message,
    timeStamp: getTimeStamp()
  };
  
  const messageResponseObj = {
    type: 'received',
    text: messageResponse,
    timeStamp: getTimeStamp()
  };
  
  const chatHistory = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY)) || [];
  chatHistory.push(messageObj);
  if (messageResponse !== null) {
    chatHistory.push(messageResponseObj);
  }
  
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
  
  } else {

  var http = new XMLHttpRequest();
  http.open("POST", "https://demoexpress.team-4345595.repl.co/");
  http.setRequestHeader("Accept", "application/json");
  http.setRequestHeader("Content-Type", "application/json");
  http.setRequestHeader("Authorization", "Bearer " + OPENAI_API_KEY);

  http.onreadystatechange = function() {
    if (http.readyState === 4) {
      var response = {};
      if (chatArea.innerHTML !== "") chatArea.innerHTML += "<br/>";

     
        response = JSON.parse(http.responseText);
        console.log(JSON.stringify(response));
     if (response.status === false ) {
        var messageResponse = "Sorry😔, It's an error please send your question again.";
        const llr = 'https://api.pawan.krd/resetip';
const headersip = {
    'Authorization': 'Bearer pk-aMWiVVdxaVYluEFHbslyKQEuHPNeNZZIzCRzXhuOAhMJopsP',
    'Content-Type': 'application/json'
  };
  fetch(llr, {
    method: 'POST',
    headers: headersip,
  });
        } 
        else if (response.choices && response.choices[0].text) {
        var messageResponse = response.choices[0].text;
        }

        if (selLang.value !== "en-US") {
          var a = messageResponse.split("?\n");
          if (a.length == 2) {
            messageResponse = a[1];
          }

        if (messageResponse === "") messageResponse = "No response";
        
        // Create a new message element
var newMessage = document.createElement("div");
newMessage.classList.add("message", "received");

// Create a message content element
var messageContent = document.createElement("span");
messageContent.classList.add("p");
messageContent.innerHTML = "<strong>Pharmalite:</strong> " + messageResponse;

// Create a metadata element with a timestamp
var metadata = document.createElement("span");
metadata.classList.add("metadata");
metadata.innerHTML = "<span class='time'>" + getTimeStamp() + "</span>";

// Add the message content and metadata to the new message element
newMessage.appendChild(messageContent);
newMessage.appendChild(metadata);

// Append the new message element to the chat area
chatArea.appendChild(newMessage);

 prevRes = messageResponse;        
  document.getElementById('status').innerHTML = '<nbsp style="color:#00e93d">● </nbsp>online';
  buttonClicked();
  
 // Save chat history to localStorage
  const messageObj = {
    type: 'sent',
    text: message,
    timeStamp: getTimeStamp()
  };
  
  const messageResponseObj = {
    type: 'received',
    text: messageResponse,
    timeStamp: getTimeStamp()
  };
  
  const chatHistory = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY)) || [];
  chatHistory.push(messageObj);
  if (messageResponse !== null) {
    chatHistory.push(messageResponseObj);
  }
  
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));  
      }
    }
  };
  var supmsg = message +" "+ prevRes +" "+stream;
  var model = "text-davinci-003";
  var maxTokens = 2048;
  var userId = "11";
  var temperature = 0.5;

  var data = {
    model: model,
    prompt: supmsg,
    max_tokens: maxTokens,
    user: userId,
    temperature: temperature,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["#", ";"]
  }

 http.send(JSON.stringify(data));
 
  


 }
 

  inputField.value = "";
  
}
//do anything here
var chatBody = document.querySelector('.conversation-container');

function scrollToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}

chatBody.addEventListener('DOMNodeInserted', scrollToBottom);


function getAnswer(message) {
  // search for matching question in qaData
  var closestMatch = "";
  var highestScore = -Infinity;
  for (var question in qaData) {
    var score = stringSimilarity.compareTwoStrings(message.toLowerCase(), question.toLowerCase());
    if (score > highestScore) {
      closestMatch = question;
      highestScore = score;
    }
  }

  if (highestScore > 0.85) { // found a close enough match
    var closestMatchAnswer = qaData[closestMatch];
    var randomIndex = Math.floor(Math.random() * closestMatchAnswer.length);
    return closestMatchAnswer[randomIndex];
  } else { // no matching question found
    return null;
  }
}

function animateMessage() {
    setTimeout(function() {
     var elements = document.getElementsByClassName("tick tick-animation");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("tick-animation") }

    }, 300); // 1-second delay
  }

const CHAT_HISTORY_KEY = 'chatHistory';

// Display chat history from localStorage
if (localStorage.getItem(CHAT_HISTORY_KEY)) {
  const chatHistory = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY));
  chatHistory.forEach(message => {
    if (message.type === 'sent') {
      chatArea.innerHTML += "<div class='message sent'><strong>You:</strong> " + message.text + "<span class='metadata'><span class='time'>" + message.timeStamp + "</span></span></div>";
    } else if (message.type === 'received') {
      chatArea.innerHTML += "<div class='message received'><span class='p'><strong>Pharmalite:</strong> " + message.text + "</span><span class='metadata'><span class='time'>" + message.timeStamp + "</span></span></div>";
    }
  });
}

function clearChatHistory() {
    localStorage.removeItem(CHAT_HISTORY_KEY);
    window.location.reload();
}
