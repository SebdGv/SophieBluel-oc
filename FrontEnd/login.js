
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
  };
  try {
  
    let res = await fetch("http://localhost:5678/api/users/login", init);
    
    if (!res.ok) {
      throw new Error(`Erreur HTTP, status = ${res.status}`);
    }

    let result = await res.json();
  
    if (result.token) {
      sessionStorage.setItem("token", result.token);
      window.location.href = "index.html";
    } 
  } catch (error) {
      spanError.textContent = "Erreur dans l’identifiant ou le mot de passe";
      spanError.classList.add("error");
      setTimeout(() => {
        spanError.classList.remove("error");
      }, 4000);
    }
  
});





