"use strict";

// Check If There is Local Storage Color Option
var mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor); // Remove Active Class From All Colors List Items

  var activeClass = document.querySelectorAll(".colors-list li");
  activeClass.forEach(function (element) {
    element.classList.remove("active"); // Add Active Class on Element With Data-color === Local Storage Item

    if (element.dataset.color === mainColor) {
      // Add Active Class
      element.classList.add("active");
    }
  });
} // Start Settings Box
// Toggle Spin on Class Icon


var cogIcon = document.querySelector(".toggle-settings .fa-cog"),
    settingsBox = document.querySelector(".settings-box");

cogIcon.onclick = function () {
  // Toggle Class on (I ==> Icon) For Making it Rotate.
  this.classList.toggle("fa-spin"); // Toggle Class on (I ==> Icon) For Change Its Color.

  this.classList.toggle("colored"); // Toggle Class on (Settings Box) For Making the List Appear & DisAppear.

  settingsBox.classList.toggle("open");
}; // Start Switch Colors Of WebSite


var colorsLi = document.querySelectorAll(".colors-list li"); // Loop On Colors List 

colorsLi.forEach(function (li) {
  // Click On Every Color In List 
  li.addEventListener("click", function (e) {
    // Set Color On Root 
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color); // Set Color On Local Storage

    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e); // // Remove Active Class From All Childrens
    // let activeClass = e.target.parentElement.querySelectorAll(".active");
    // activeClass.forEach(element => {
    //     element.classList.remove("active");
    // });
    // // Add Class Active
    // e.target.classList.add("active");
  });
}); // End Switch Colors Of WebSite
// Random Background Option

var backgroundOption = true; // Variable To Control The Interval

var backgroundInterval; // Check If There's Local Storage Random Background Item

var backgroundLocalItem = localStorage.getItem("background_option"); // Check If Random Background Local Storage Is Not Empty

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === 'true') {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  } // Remove Active Class From All Spans


  var randomBK = document.querySelectorAll(".random-backgrounds span");
  randomBK.forEach(function (element) {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === 'true') {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
} // Start Random Background Of WebSite


var randomBackEl = document.querySelectorAll(".random-backgrounds span"); // Loop On All Spans

randomBackEl.forEach(function (span) {
  // Click On Every Span 
  span.addEventListener("click", function (e) {
    handleActive(e); // // Remove Active Class From All Spans
    // let activeClass = e.target.parentElement.querySelectorAll(".active");
    // activeClass.forEach(element => {
    //     element.classList.remove("active");
    // });
    // // Add Class Active
    // e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomzieImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
}); // End Random Background Of WebSite
// End Settings Box
// Start Landing Page
// Select Landing Page Element

var landingPage = document.querySelector(".landing-page"); // Array That Contain The Images , Going to Choose From Randomly

var imgsArray = ["landing1.jpg", "landing2.jpg", "landing3.jpg", "landing4.jpg", "landing5.jpg"]; // Function To Randomize Image 

function randomzieImgs() {
  if (backgroundOption === true) {
    // Put Timer To Change The Landing Image Every Period of Time
    backgroundInterval = setInterval(function () {
      // Get Random Number 
      var randomNumber = Math.floor(Math.random() * imgsArray.length); // Change Background Images Url

      landingPage.style.backgroundImage = 'url("../img/' + imgsArray[randomNumber] + '")';
    }, 10000);
  }
}

randomzieImgs(); // End Landing Page
// Start Skill Progress
// Select Skills Selector

var ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  var skillsOffsetTop = ourSkills.offsetTop; // Get Skills Outer Height

  var skillsOuterHeight = ourSkills.offsetHeight; // Get Window Height

  var windowHeight = this.innerHeight; // Get Window ScrollTop

  var windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    var allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach(function (skill) {
      skill.style.width = skill.dataset.progress;
    });
  }
}; // End Skill Progress
// Start Our Gallery
// Create Pop Up With The Images


var ourGallery = document.querySelectorAll(".gallery .images-box img");
ourGallery.forEach(function (img) {
  img.addEventListener("click", function (e) {
    // Create OverLay Element
    var overlay = document.createElement("div"); // Add Class To OverLay

    overlay.className = "popup-overlay"; // Append The OverLay To The Body

    document.body.appendChild(overlay); // Create The PopUp 

    var popupBox = document.createElement("div"); // Add Class To The Popup Box

    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading For The Image
      var imgHeading = document.createElement("h2"); // Create Text For The Heading 

      var imgText = document.createTextNode(img.alt); // Append The Text To The Heading 

      imgHeading.appendChild(imgText); // Append The Heading in Popup Box

      popupBox.appendChild(imgHeading);
    } // Create The Image Which Putted Inside Popup Box


    var popupImage = document.createElement("img"); // Set Or Change Image Source

    popupImage.src = img.src; // Append The Image In PopUp Box

    popupBox.appendChild(popupImage); // Append The Popup Box To The Body

    document.body.appendChild(popupBox); // Create Close Span To Close The PopUp Box

    var closeButton = document.createElement("span"); // Create The Close Button Text

    var closeButtonText = document.createTextNode("X"); // Append The Close Button Text To The Close Span

    closeButton.appendChild(closeButtonText); // Add Class To The Close Span 

    closeButton.className = "close-button"; // Append The Close Span to The Popup Box

    popupBox.appendChild(closeButton);
  });
}); // Close PopUp Box When Click On Close Button

document.addEventListener("click", function (e) {
  if (e.target.className == 'close-button') {
    // Remove The Current Pop Up
    e.target.parentNode.remove(); // Remove The OverLay 

    document.querySelector(".popup-overlay").remove();
  }
}); // End Our Gallery

/* Start Navigation Buulets */
// Select All Bullets

var allBullets = document.querySelectorAll(".nav-bullets .bullet"); // allBullets.forEach(bullet => {
//     bullet.addEventListener("click" , (e) => {
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: "smooth"
//         });
//     });
// });

/* End Navigation Buulets */

/* Start Our Nav Links */
// Select All Links

var allLinks = document.querySelectorAll(".links a"); // allLinks.forEach(link => {
//     link.addEventListener("click", (e) => {
//         e.preventDefault();
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: "smooth"
//         });
//     });
// });

function scrollTo(elements) {
  elements.forEach(function (element) {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
}
/* End Our Nav Links */


scrollTo(allBullets);
scrollTo(allLinks);
/* Start Handle Active State Function For All */

function handleActive(ev) {
  // Remove Active Class From All Spans
  var activeClass = ev.target.parentElement.querySelectorAll(".active");
  activeClass.forEach(function (element) {
    element.classList.remove("active");
  }); // Add Class Active

  ev.target.classList.add("active");
}
/* End Handle Active State Function For All */

/* Start Bullet Options Box */


var bulletsSpan = document.querySelectorAll(".bullets-option span");
var bulletsContainer = document.querySelector(".nav-bullets"); // Check Local Storage

var bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach(function (span) {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach(function (span) {
  span.addEventListener("click", function (e) {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});
/* End Bullet Options Box */

/* Start Reset Option Button */

document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear(); ==> Reset or Remove The Whole Data From the Local Storage.
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option"); // ==> Choose the Data You Want to Remove From or Just Remove The Data Of The Specified Item You Choosed or Remove The Data Of Item that His Name Exists Between The Brackets.

  window.location.reload(); // ==> Reload The Window After Reset
};
/* End Reset Option Button */

/* Start Toggle Menu & Button */
// Toggle Menu


var toggleBtn = document.querySelector(".toggle-menu");
var tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation(); // Toggle Class "menu-active" on Button

  this.classList.toggle("menu-active"); // Toggle Class "open" on Links

  tLinks.classList.toggle("open");
};
/* End Toggle Menu & Button */

/* Start Press Any Where To Close The Menu */


document.addEventListener("click", function (e) {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check if the Menu is Open
    if (tLinks.classList.contains("open")) {
      // Toggle Class "menu-active" on Button
      toggleBtn.classList.toggle("menu-active"); // Toggle Class "open" on Links

      tLinks.classList.toggle("open");
    }
  }
}); // Stop Propagation

tLinks.onclick = function (e) {
  e.stopPropagation();
};
/* End Press Any Where To Close The Menu */