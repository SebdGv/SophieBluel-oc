const response = await fetch("http://localhost:5678/api/works");
const projects = await response.json();

const sectionFilters = document.querySelector(".btn-filters");
let connected = false;

// ========== GENERATION CARDS PROJECTS ========== //

const generateCards = (projects) => {
  if (!projects || !projects.length) {
    console.log("Aucun projet à afficher.");
    return;
  }
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const sectionProjects = document.querySelector(".gallery");

    const viewProject = document.createElement("figure");

    const imageZoom = document.createElement("div");
    const imageProject = document.createElement("img");
    const captionProject = document.createElement("figcaption");

    imageZoom.classList.add("zoom");
    imageProject.src = project.imageUrl;
    captionProject.innerText = project.title;

    sectionProjects.appendChild(viewProject);
    viewProject.appendChild(imageZoom);
    imageZoom.appendChild(imageProject);
    viewProject.appendChild(captionProject);
  }
};

// ========== CREATION FILTERS BUTTONS ========== //

const generateBtnsFilter = async () => {
  const res = await fetch("http://localhost:5678/api/categories");
  const categories = await res.json();

  const sectionFilters = document.querySelector(".btn-filters");

  const btnFilter = document.createElement("button");
  btnFilter.className = "filter";
  btnFilter.dataset.id = 0;
  btnFilter.innerText = "Tous";
  btnFilter.classList.add("active");
  sectionFilters.appendChild(btnFilter);

  for (let i = 0; i < categories.length; i++) {
    const filter = categories[i];
    const btnFilter = document.createElement("button");
    btnFilter.className = "filter";
    btnFilter.dataset.id = filter.id;
    btnFilter.innerText = filter.name;

    sectionFilters.appendChild(btnFilter);
  }
  projectsFilter();
};

// ========== FILTERS FUNCTION ========== //

const projectsFilter = () => {
  const btnsFilter = document.querySelectorAll("button");

  btnsFilter.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Ajouter class active au clique
      btnsFilter.forEach((otherBtn) => {
        otherBtn.classList.remove("active");
      });
      e.target.classList.add("active");

      const id = e.target.dataset.id;
      let filteredProjects;

      if (id === "0") {
        filteredProjects = projects;
      } else {
        filteredProjects = projects.filter(
          (project) => project.categoryId.toString() === id
        );
      }

      document.querySelector(".gallery").innerHTML = "";
      generateCards(filteredProjects);
    });
  });
};
generateBtnsFilter();
generateCards(projects);

// ========== Edition mode  ========== //

const editBtn = document.querySelector(".edit-btn");

const isConnected = () => {
  if (sessionStorage.getItem("token")) {
    connected = true;
  }
};
const editPage = () => {
  logout.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
  });

  if (connected) {
    editBanner.style.display = "flex";
    editBtn.style.display = "flex";
    sectionFilters.style.transform = "translateX(-3000px)";
    login.style.display = "none";
    logout.style.display = "flex";
  }
};
isConnected();
editPage();

// ==========  MODALS => Open & close  ========== //

let modal = null;

const openModal = (e, selector) => {
  e.preventDefault();

  const target = document.querySelector(selector);

  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".closeModal").addEventListener("click", closeModal);
  modal.querySelector(".modalStop").addEventListener("click", stopPropagation);
};

const closeModal = () => {
  if (modal === null) return;
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".closeModal").removeEventListener("click", closeModal);
  modal = null;
  location.reload();
};

const stopPropagation = (e) => {
  e.stopPropagation();
};

// ==========  MODALS :  Navigation button  ========== //
const modalListImage = document.querySelector(".modal01");
const modalAddImage = document.querySelector(".modal02");
const leftArrow = document.querySelector(".fa-arrow-left");

editBtn.addEventListener("click", (e) => {
  openModal(e, "#modalGallery");
  modalListImage.classList.remove("hidden");
});

addPictureBtn.addEventListener("click", (e) => {
  modalListImage.classList.add("hidden");
  modalAddImage.classList.remove("hidden");
  leftArrow.style.transform = "translateX(0px)";
});

leftArrow.addEventListener("click", (e) => {
  modalAddImage.classList.add("hidden");
  modalListImage.classList.remove("hidden");
  leftArrow.style.transform = "translateX(-3000px)";
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});
// ==========  MODALS 01 = Gallery   ========== //

const editGallery = (projects) => {
  if (!projects || !projects.length) {
    console.log("Aucun projet à afficher.");
    return;
  }
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const sectionProjects = document.querySelector(".edit-gallery");

    const viewProject = document.createElement("figure");
    const imageProject = document.createElement("img");
    const deleteIcon = document.createElement("a");

    imageProject.src = project.imageUrl;
    deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteIcon.setAttribute("data-id", project.id);

    sectionProjects.appendChild(viewProject);
    viewProject.appendChild(imageProject);
    viewProject.appendChild(deleteIcon);
  }
};

editGallery(projects);

// ==========  MODALS 01 = Delete  ========== //

const deleteProject = async (id) => {
  const init = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const response = await fetch(`http://localhost:5678/api/works/${id}`, init);
  if (response.ok) {
    document
      .querySelector(`[data-id="${id}"]`)
      .closest("figure").style.display = "none";
  } else {
    console.error("Erreur lors de la suppression du projet");
  }
};
document.querySelectorAll(".fa-trash-can").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const projectId = e.target.closest("[data-id]").getAttribute("data-id");
    deleteProject(projectId);
  });
});

// ==========  MODALS 02 = Create new Project  ========== //

const previewContainer = document.querySelector(".preview-container");
const fichierInput = document.getElementById("addPicJoin");
let title = document.getElementById("addTitle");

// change color background modal input
const updateValidateBtn = () => {
  if (title.value.trim() !== "" && fichierInput.files.length > 0) {
    modalValidateBtn.classList.add("modal-hover");
    spanError.textContent = "";
  }
};

// Preview image display
fichierInput.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
      previewContainer.style.display = "none";
      updateValidateBtn();
    };

    reader.readAsDataURL(this.files[0]);
  }
});

title.addEventListener("input", updateValidateBtn);

//Change upload image
previewImage.addEventListener("click", function () {
  fichierInput.click();
});

const spanError = document.getElementById("error");

const sendProject = () => {
  formNewProject.addEventListener("submit", async (e) => {
    e.preventDefault();

    let fichier;
    if (fichierInput.files.length > 0) {
      fichier = fichierInput.files[0];
    } else if (fichierInput.files.length === 0) {
      spanError.textContent = "Ajoutez un fichier";
      spanError.classList.add("error");
      console.log(erreur);
      return;
    }

    let titleValue = title.value;
    if (!titleValue) {
      spanError.textContent = "Ajoutez un titre";
      spanError.classList.add("error");
      return;
    }

    let categorySelect = document.getElementById("categorySelect");
    let categoryId = categorySelect.value;
    let formData = new FormData();
    if (fichier) {
      formData.append("image", fichier);
    }
    formData.append("title", titleValue);
    formData.append("category", categoryId);

    const initPic = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: formData,
    };
    try {
      const res = await fetch("http://localhost:5678/api/works", initPic);

      if (!res.ok) {
        throw new Error(`Erreur HTTP, status = ${res.status}`);
      }

      const result = await res.json();
      closeModal();

      console.log(result);

      if (result.token) {
        sessionStorage.setItem("token", result.token);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
    }
  });
};
sendProject();
