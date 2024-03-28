
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
    headers: {
      "accept": "application / json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    // mode: "cors",
    // credentials: "same-origin",
  };

  let res = await fetch("http://localhost:5678/api/users/login", init)
  let result = await res.json()

      if (result.success) {
        localStorage.setItem("token", result.token);
        console.log("connectoin reussie");
      } else {
        spanError.classList.add("error");
        setTimeout(() => {
          spanError.classList.remove("error");
        }, 4000);
  }
});





