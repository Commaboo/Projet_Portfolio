/* =========================================================
   DÉTAIL — Parcours, Compétences ou Preview indisponible
   ========================================================= */

import Placeholder from "./Placeholder.jsx";

function getTitle(project, type) {
    if (type === "journey") return "Parcours";
    if (type === "preview") return "Preview";
    return project.statusType === "completed" ? "Compétences acquises" : "Objectifs d'apprentissage";
}

export default function DetailPanel({ project, type, onClose }) {
    return (
        <div id="project-detail" className="project-detail">
            <div className="project-detail-header">
                <h3 id="detail-title">{getTitle(project, type)}</h3>
                <button id="close-detail" type="button" aria-label="Fermer les détails" onClick={onClose}>
                    ×
                </button>
            </div>

            <div id="detail-content">
                {type === "journey" && <p>{project.journey}</p>}

                {type === "skills" && (
                    <ul>
                        {project.skills.map((skill) => (
                            <li key={skill}>{skill}</li>
                        ))}
                    </ul>
                )}

                {type === "preview" && (
                    <Placeholder title="Preview indisponible">
                        Il n'y a pas encore de page de démonstration pour ce projet.
                    </Placeholder>
                )}
            </div>
        </div>
    );
}
