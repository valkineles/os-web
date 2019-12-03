import * as materialize from 'materialize-css';

import { authFirebase } from '../../assets/js/auth';
import { navigateTo } from '../../assets/js/navigation';

init();

function init() {
  configureMaterializeSideNav();

  showUserData();
}

function configureMaterializeSideNav() {
  // inicializa a sidenav
  const sidenavs = document.querySelectorAll(".sidenav");
  materialize.Sidenav.init(sidenavs, {
    draggable: true
  });

  // inicializa o dropdown
  const dropdowns = document.querySelectorAll(".dropdown-trigger");
  materialize.Dropdown.init(dropdowns, {
    hover: true,
    constrainWidth: false,
    coverTrigger: false
  });
}

function showUserData() {
  if (!authFirebase || !authFirebase.isLogged()) {
    console.warn("usuário não autenticado...");
    return;
  }

  document
    .querySelectorAll("#avatar")
    .forEach(item => (item.src = authFirebase.userLogged.photoURL));
  document.getElementById("txtName").innerText =
    authFirebase.userLogged.displayName;
  document.getElementById("txtEmail").innerText = authFirebase.userLogged.email;
}

document.querySelectorAll("#btnSair").forEach(item => {
  item.addEventListener("click", async () => {
    if (await authFirebase.logout()) {
      navigateTo("/login");
    }
  });
});
