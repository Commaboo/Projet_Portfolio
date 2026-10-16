/* =========================================================
   PARCHEMIN — message d'accueil ou fiche du projet
   ========================================================= */

import { useEffect, useRef, useState } from "react";
import DetailPanel from "./DetailPanel.jsx";
import Placeholder from "./Placeholder.jsx";

function ProjectImage({ project }) {
    const [failed, setFailed] = useState(false);

    if (!project.image || failed) {
        return (
            <Placeholder title="Aperçu indisponible">
                L'illustration de cette aventure sera bientôt dévoilée.
            </Placeholder>
        );
    }

    return (
        <img
            src={project.image}
            alt={"Aperçu du projet " + project.title}
            className="project-preview-image"
            onError={() => setFailed(true)}
        />
    );
}

export default function Parchment({ project, detail, onOpenDetail, onCloseDetail }) {
    const scrollRef = useRef(null);

    // Remet le parchemin en haut lorsque l'on change de projet.
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, [project?.id]);

    return (
        <article
            ref={scrollRef}
            id="project-scroll"
            className="project-scroll"
            aria-live="polite"
            aria-label="Détails du projet sélectionné"
        >
            {!project ? (
                <div id="project-empty" className="project-empty">
                    <span className="project-empty-icon" aria-hidden="true">✦</span>
                    <h2>Choisis ton aventure</h2>
                    <p>
                        Clique sur un projet dans le registre ou glisse-le
                        sur le parchemin pour découvrir son histoire.
                    </p>
                </div>
            ) : (
                <div id="project-content" className="scroll-content">
                    <div className="project-header">
                        <div>
                            <p
                                id="project-status"
                                className={project.statusType === "in-progress" ? "project-status in-progress" : "project-status"}
                            >
                                {project.status}
                            </p>
                            <h2 id="project-title">{project.title}</h2>
                            <p id="project-period" className="project-period">{project.period}</p>
                        </div>
                        <span className="project-seal" aria-hidden="true">✦</span>
                    </div>

                    <div className="project-preview">
                        <div id="project-image" className="project-magic-card magic-theme-ember" aria-hidden="true">
                            {/* key : l'état « image en erreur » repart de zéro à chaque projet */}
                            <ProjectImage key={project.id} project={project} />
                        </div>
                    </div>

                    <p id="project-description" className="project-description">{project.description}</p>

                    <div id="project-technologies" className="project-tags">
                        {project.technologies.map((technology) => (
                            <span key={technology} className="project-tag">{technology}</span>
                        ))}
                    </div>

                    <div className="project-actions">
                        <button type="button" className="btn btn-primary project-action" data-action="journey" onClick={() => onOpenDetail("journey")}>
                            Parcours
                        </button>
                        <button type="button" className="btn btn-secondary project-action" data-action="skills" onClick={() => onOpenDetail("skills")}>
                            Compétences
                        </button>
                        <button type="button" className="btn btn-secondary project-action" data-action="preview" onClick={() => onOpenDetail("preview")}>
                            Preview
                        </button>
                    </div>

                    {detail && (
                        <DetailPanel project={project} type={detail} onClose={onCloseDetail} />
                    )}
                </div>
            )}
        </article>
    );
}
