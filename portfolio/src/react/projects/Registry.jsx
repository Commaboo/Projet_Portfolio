/* =========================================================
   REGISTRE — liste des projets
   ========================================================= */

export default function Registry({
    projects,
    selectedId,
    open,
    isDragging,
    toggleRef,
    onToggle,
    onOpen,
    onSelect,
    onDragStart,
    onDragEnd,
}) {
    const listClasses = ["project-list"];
    if (open) listClasses.push("expanded");
    // Permet au CSS de garder la carte du projet en cours visible registre fermé.
    if (selectedId) listClasses.push("has-selection");

    return (
        <aside className="project-registry">
            <button
                ref={toggleRef}
                id="registry-toggle"
                className="registry-header"
                type="button"
                aria-expanded={open}
                aria-controls="project-list"
                onClick={onToggle}
            >
                <span>
                    <span className="registry-label">Registre</span>
                    <span className="registry-subtitle">Mes projets</span>
                </span>
                <span id="registry-arrow" className="registry-arrow" aria-hidden="true">
                    {open ? "↑" : "↓"}
                </span>
            </button>

            <div
                id="project-list"
                className={listClasses.join(" ")}
                role="group"
                aria-label="Liste des projets"
            >
                {projects.map((project) => {
                    const isSelected = project.id === selectedId;

                    return (
                        <button
                            key={project.id}
                            type="button"
                            className={isSelected ? "project-card-item selected" : "project-card-item"}
                            data-project-id={project.id}
                            draggable="true"
                            aria-pressed={isSelected}
                            onClick={() => {
                                // Registre fermé : seule la carte du projet en cours est visible.
                                // Un clic dessus rouvre le registre au lieu de recharger le projet.
                                if (!open) {
                                    onOpen();
                                    return;
                                }
                                onSelect(project.id);
                            }}
                            onDragStart={(event) => onDragStart(event, project.id)}
                            onDragEnd={onDragEnd}
                        >
                            <span className="project-card-title">{project.title}</span>
                            <span className="project-card-period">{project.period}</span>
                        </button>
                    );
                })}
            </div>

            <p id="drop-hint" className={isDragging ? "drop-hint visible" : "drop-hint"}>
                Dépose un projet sur le parchemin
            </p>
        </aside>
    );
}
