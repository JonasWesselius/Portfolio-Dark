document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");
    const sidebarToggle = document.querySelector(".hamburger-menu input");
    const overlay = document.querySelector(".overlay");
    const icons = {
      home: { active: "images/icons/home-active.png", inactive: "images/icons/home.png" },
      projects: { active: "images/icons/project-active.png", inactive: "images/icons/project.png" },
      "learning-outcomes": { active: "images/icons/lo-active.png", inactive: "images/icons/lo.png" },
    };
  
    function setActivePage(activeId) {
      menuItems.forEach((item) => {
        const img = item.querySelector("img");
        const id = item.id;
  
        if (id === activeId) {
          item.classList.add("active");
          img.src = icons[id].active;
        } else {
          item.classList.remove("active");
          img.src = icons[id].inactive;
        }
      });
    }
  
    // Apply overlay and prevent clicks on background
    sidebarToggle.addEventListener("change", () => {
      if (sidebarToggle.checked) {
        overlay.style.pointerEvents = "auto";
      } else {
        overlay.style.pointerEvents = "none";
      }
    });
  
    // Close sidebar when overlay is clicked
    overlay.addEventListener("click", () => {
      sidebarToggle.checked = false;
      overlay.style.pointerEvents = "none";
    });
    
    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    }

    // Simulate setting the active page (e.g., based on navigation)
    setActivePage("home");
  });
  
// credit: https://www.youtube.com/watch?v=dAIVbLrAb_U