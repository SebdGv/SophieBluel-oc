const response = await fetch("http://localhost:5678/api/works");
const projects = await response.json();

const sectionFilters = document.querySelector(".btn-filters");
let connected = false;


// ========== GENERATION CARDS PROJECTS ========== //

const generateCards= (projects) => {
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
}

// ========== CREATION FILTERS BUTTONS ========== //

const generateBtnsFilter = async () => {
  const res = await fetch("http://localhost:5678/api/categories");
  const categories = await res.json();

  const sectionFilters = document.querySelector(".btn-filters");
  
  const btnFilter = document.createElement("button");
  btnFilter.className = "filter";
  btnFilter.dataset.id = 0;
  btnFilter.innerText = "Tous";
  sectionFilters.appendChild(btnFilter);
  
  for (let i = 0; i < categories.length; i++) {
    const filter = categories[i];
    const btnFilter = document.createElement("button");
    btnFilter.className = "filter";
    btnFilter.dataset.id = filter.id;
    btnFilter.innerText = filter.name;

    sectionFilters.appendChild(btnFilter);
  }  
  projectsFilter()
}

// ========== FILTERS FUNCTION ========== //

const projectsFilter = ()=>{
  const btnsFilter = document.querySelectorAll("button");

  btnsFilter.forEach((btn) => {
    btn.addEventListener("click", (e) => {
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
}
generateBtnsFilter();
generateCards(projects);


// ========== Edition mode  ========== //

const editBtn = document.querySelector('.edit-btn');


const isConnected = () => {
  if (sessionStorage.getItem("token")) {
    connected = true;
  }
}
const editPage = () => {

  logout.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = "index.html";
    })

  if (connected) {
    editBanner.style.display = "flex";
    editBtn.style.display = "flex";
    sectionFilters.style.transform = "translateX(-3000px)";
    login.style.display = "none";
    logout.style.display = "flex";
  }
}
isConnected();
editPage();

// ==========  MODALS  ========== //

let modal = null;

const openModal = (e) => {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.style.display = null;
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', 'true')
  modal = target;
  modal.addEventListener('click', closeModal)
  modal.querySelector(".closeModal").addEventListener('click', closeModal);
  modal.querySelector(".modalStop").addEventListener('click', stopPropagation);
}

const closeModal = (e) => {
  if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".closeModal").removeEventListener("click", closeModal);
    modal = null;
}
const stopPropagation = (e) => {
  e.stopPropagation();
}

editBtn.addEventListener("click", openModal)

window.addEventListener('keyup', (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
    console.log(e, e.key);
 }
  
})

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
        'accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      }
    };
  await fetch(`http://localhost:5678/api/works/${id}`, init);


}
document.querySelectorAll(".fa-trash-can").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const icon = e.target.closest("[data-id]");
    const projectId = icon.getAttribute("data-id");
    deleteProject(projectId);
  });
});

// ==========  MODALS 02 = Create new Project  ========== //



// ==========  MODALS 03 = Validate  ========== //
