/* =========================================================
   PAGE PROJETS — point d'entrée React
   React ne gère que le bureau du mage (<section id="projects-root">).
   La navigation, le thème et le menu mobile restent dans main.js.
   ========================================================= */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProjectsDesk from "./ProjectsDesk.jsx";

const container = document.getElementById("projects-root");

if (container) {
    createRoot(container).render(
        <StrictMode>
            <ProjectsDesk />
        </StrictMode>
    );
}
