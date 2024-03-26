
const form = document.getElementById("form");
const spanError = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let data = {
    email: email,
    password: password,
  };

  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json", "accept": "application / json" },
    body: JSON.stringify(data),
    mode: "cors",
    credentials: "same-origin",
  };

  await fetch("http://localhost:5678/api/users/login", init)
    .then((response) => response.json())
      .then((data) => {
        if (data.success) {
        console.log("connectoin reussie");
      } else {
        spanError.classList.add("error");
        setTimeout(() => {
          spanError.classList.remove("error");
        }, 4000);
      }
    });
});

