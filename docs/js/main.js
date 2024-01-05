(function () {
  "use strict";

  var treeviewMenu = $(".app-menu");

  // Toggle Sidebar
  $('[data-toggle="sidebar"]').click(function (event) {
    event.preventDefault();
    $(".app").toggleClass("sidenav-toggled");
  });

  // Activate sidebar treeview toggle
  $("[data-toggle='treeview']").click(function (event) {
    event.preventDefault();
    if (!$(this).parent().hasClass("is-expanded")) {
      treeviewMenu
        .find("[data-toggle='treeview']")
        .parent()
        .removeClass("is-expanded");
    }
    $(this).parent().toggleClass("is-expanded");
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  // Add an event listener to the login button
  document
    .getElementById("loginButton")
    .addEventListener("click", function (event) {
      event.preventDefault();
      // Get user credentials from the form
      var username = document.querySelector(".form-control[type='text']").value;
      var password = document.querySelector(
        ".form-control[type='password']"
      ).value;

      // Make API call to authenticate user
      fetch("127.0.0.1:5000/api/login", {
        method: "POST", // Adjust the method as needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Authentication failed");
          }
          return response.json();
        })
        .then((data) => {
          // Assuming your backend returns user information upon successful login
          handleLogin({
            name: data.username,
            designation: "Admin", // Replace with actual designation logic
          });

          // Redirect to dashboard.html or handle navigation as needed
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          console.error("Authentication error:", error);
          // Handle authentication error, display error message, etc.
        });

      var loggedInUserName = document.querySelector(
        ".form-control[type='text']"
      ).value;
      handleLogin({
        name: loggedInUserName,
        designation: "Admin", // Assuming Admin for now, update as needed
      });
    });

  // Login Page Flipbox control
  $('.login-content [data-toggle="flip"]').click(function () {
    $(".login-box").toggleClass("flipped");
    return false;
  });
});

// Reusable function to update user information
function updateUserInformation(user) {
  console.log("Seting name");
  var userNameElement = document.querySelector(".app-sidebar__user-name");
  var userDesignationElement = document.querySelector(
    ".app-sidebar__user-designation"
  );

  if (userNameElement && userDesignationElement) {
    userNameElement.textContent = user.name;
    userDesignationElement.textContent = user.designation;
  }
}

// Function to handle login and redirect to dashboard
function handleLogin(user) {
  // Update the user information in the sidebar
  updateUserInformation(user);
}
