const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  toggleSwitch.addEventListener("change", switchTheme, false);

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const contactForm = document.getElementById("contact-form");
  const errorElement = document.getElementById("error");
  const successMsg = document.getElementById("success-msg");

  contactForm.addEventListener("submit", (e) => {
    let messages = [];

    if (!email.value.includes(".")) {
      messages.push("Please write a valid email address.");
    }

    if (message.value.length < 15) {
      messages.push("Please write a longer message.");
    }

    if (messages.length > 1) {
      errorElement.innerText = messages.join(" ");
    }

    e.preventDefault();

    if (email.value.includes(".") && messages.length >= 1) {
      errorElement.innerText = "Please write a longer message.";
    }

    if (messages.length === 0) {
      errorElement.innerText = "";
      var contact = document.getElementById("c");
      contact.remove();

      //var svg = document.getElementsByTagName('svg')[0];
      //var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      //newElement.setAttribute('');
    }

    e.preventDefault();
    setTimeout(function () {
      successMsg.innerText = "";
    }, 8000);
  });

  //code for mail animation
  var tl = new TimelineMax({ repeat: -1, repeatDelay: 1 });
  TweenMax.to("#wind", 0.5, {
    strokeDashoffset: -60,
    repeat: -1,
    ease: Linear.easeNone,
  });

  tl.set("#lid", { transformOrigin: "center top" });
  tl.set("#letter, #positive-mask", { transformOrigin: "center top" });

  tl.fromTo(
    "#letter",
    0.5,
    { opacity: 0 },
    { opacity: 1, ease: Power4.easeOut },
    0
  );
  tl.fromTo(
    "#letter, #positive-mask",
    0.5,
    { scale: 1 },
    { scale: 1, ease: Power4.easeOut },
    0
  );
  tl.to("#letter, #positive-mask", 1.5, { y: 250 }, 0);
  tl.fromTo(
    "#envelope, #negative-mask",
    0.5,
    { opacity: 0 },
    { opacity: 1 },
    0
  );
  tl.fromTo(
    "#envelope, #negative-mask",
    1,
    { y: 200 },
    { y: 0, ease: Power2.easeOut },
    0
  );
  tl.fromTo("#lid", 0.5, { scaleY: -1 }, { scaleY: 1 }, "-=0.4");
  tl.to(
    "#wind, #envelope",
    0.3,
    { x: 0, ease: Power2.easeInOut },
    "-=0.4"
  );
  tl.fromTo("#wind", 2, { opacity: 0 }, { opacity: 3 }, "-=0.4");
  tl.to("#wind, #envelope", 10, { x: 1000 }, "+2");