// Function to update time
function updateTime() {
    const timeNode = document.getElementById("time");
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
    timeNode.innerText = formattedTime;
}

// Initial time update
updateTime();
setInterval(updateTime, 1000);

//for mode transitions
let currentClass = null;

        function showClass(className) {
            if (currentClass === className) {
                // If the same class is clicked again, hide it
                document.querySelector(`.${className}`).style.transform = 'translateY(100%)';
                currentClass = null;
            } else {
                if (currentClass) {
                    // Hide the current class completely
                    document.querySelector(`.${currentClass}`).style.transform = 'translateY(100%)';
                }
                // Show the new class
                document.querySelector(`.${className}`).style.transform = 'translateY(0)';
                currentClass = className;
            }
        }

// Function to update battery bars based on percentage
function updateBatteryBars(percentage) {
    const bar1 = document.getElementById("bar1");
    const bar2 = document.getElementById("bar2");
    const bar3 = document.getElementById("bar3");
  
    if (percentage > 70) {
      bar1.classList.add("battery-bar");
      bar2.classList.add("battery-bar");
      bar3.classList.add("battery-bar");
    } else if (percentage <= 70 && percentage >= 40) {
      bar1.classList.add("battery-bar");
      bar2.classList.add("battery-bar");
      bar3.classList.remove("battery-bar");
    } else if (percentage > 20 && percentage <40) {
      bar1.classList.add("battery-bar");
      bar2.classList.remove("battery-bar");
      bar3.classList.remove("battery-bar");
    }
    else{
      bar1.classList.add("red-bar");
      bar2.classList.remove("battery-bar");
      bar3.classList.remove("battery-bar");
    }
  }
  
  // Function to update battery percentage display
  function updateBatteryPercentageDisplay(percentage) {
    const batteryPercentageElement = document.getElementById("battery-percentage");
    batteryPercentageElement.textContent = percentage + "%";
  }
  
  // Function to retrieve battery percentage
  function retrieveBatteryPercentage() {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(function(battery) {
        const batteryPercentage = (battery.level * 100).toFixed(0);
        updateBatteryBars(batteryPercentage);
        updateBatteryPercentageDisplay(batteryPercentage);
      });
    } else {
      // Battery Status API not supported, display a message
      const batteryPercentageElement = document.getElementById("battery-percentage");
      batteryPercentageElement.textContent = 'Battery Status API not supported';
    }
  }
let range = 0; // Initialize the "range" variable

// Function to update battery percentage display
function updateBatteryPercentageDisplay(percentage) {
  const batteryPercentageElement = document.getElementById("battery-percentage");
  range = (percentage * 1.1).toFixed(0); // Multiply the percentage by 2 and store it in the "range" variable
  batteryPercentageElement.textContent = percentage + "%";
  
  // Update the range display
  const rangeValueElement = document.getElementById("range-value");
  rangeValueElement.textContent = range;
}


  // Call retrieveBatteryPercentage initially to set the initial battery percentage
  retrieveBatteryPercentage();
  
  // Call retrieveBatteryPercentage every 10 seconds to keep it updated
  setInterval(retrieveBatteryPercentage, 10000);
  


  const buttons = document.querySelectorAll('.b1, .b2, .b3');
  const subDivs = document.querySelectorAll('.n');

  let currentSubDivIndex = -1; // To keep track of the currently displayed sub-div

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (currentSubDivIndex === index) {
      // If the same button is clicked again, hide its sub-div
      hideCurrentSubDiv(index);
    } else {
      // Otherwise, show the selected sub-div
      hideCurrentSubDiv(index, () => {
        showSelectedSubDiv(index);
      });
    }
  });
});

function hideCurrentSubDiv(index, callback) {
  if (currentSubDivIndex !== -1) {
    subDivs[currentSubDivIndex].style.opacity = 0;
    setTimeout(() => {
      currentSubDivIndex = -1;
      if (callback) {
        callback();
      }
    }, 500); // Adjust the delay time as needed
  } else if (callback) {
    callback();
  }
}

function showSelectedSubDiv(index) {
  subDivs.forEach((subDiv, i) => {
    if (i === index) {
      subDiv.style.opacity = 1;
    } else {
      subDiv.style.opacity = 0;
    }
  });
  currentSubDivIndex = index; // Update the current sub-div index
}


// Function to read text from a div 
function readTextFromDiv(className, index) {
  const divs = document.querySelectorAll('.' + className);
  if (index >= 0 && index < divs.length) {
    const textToSpeak = divs[index].textContent;
    const synth = window.speechSynthesis;

    synth.cancel(); // Cancel any ongoing speech synthesis
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    synth.speak(utterance);
  } else {
    console.error('Invalid index.');
  }
}


const buttonz = document.querySelectorAll('.b1, .b2, .b3');
  const rule = document.querySelectorAll('.r');

  let currentruleindex = -1; // To keep track of the currently displayed sub-div

buttonz.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (currentruleindex === index) {
      // If the same button is clicked again, hide its sub-div
      hideCurrentRule(index);
    } else {
      // Otherwise, show the selected sub-div
      hideCurrentRule(index, () => {
        showSelectedRule(index);
      });
    }
  });
});

function hideCurrentRule(index, callback) {
  if (currentruleindex !== -1) {
    rule[currentruleindex].style.opacity = 0;
    setTimeout(() => {
      currentruleindex = -1;
      if (callback) {
        callback();
      }
    }, 500); // Adjust the delay time as needed
  } else if (callback) {
    callback();
  }
}

function showSelectedRule(index) {
  rule.forEach((rule, i) => {
    if (i === index) {
      rule.style.opacity = 1;
    } else {
      rule.style.opacity = 0;
    }
  });
  currentruleindex = index; // Update the current sub-div index
}