/* =========================================================
   BUREAU DU MAGE
   Tout l'état de la page vit ici. L'affichage en découle :
   aucun getElementById, aucune classe à ajouter/retirer à la main.
   ========================================================= */

import { useEffect, useRef, useState } from "react";
import Parchment from "./Parchment.jsx";
import Registry from "./Registry.jsx";
import GithubCat from "./GithubCat.jsx";

// projects : fourni par projects.astro depuis src/content/projects.yaml
export default function ProjectsDesk({ projects }) {
    // Au chargement : aucun projet, registre fermé, aucun détail ouvert.
    const [selectedId, setSelectedId] = useState(null);
    const [registryOpen, setRegistryOpen] = useState(false);
    const [detail, setDetail] = useState(null); // "journey" | "skills" | "preview" | null
    const [isDragging, setIsDragging] = useState(false);
    const [githubMessage, setGithubMessage] = useState(null);

    const draggedIdRef = useRef(null);
    const registryToggleRef = useRef(null);

    const project = projects.find((item) => item.id === selectedId) ?? null;

    function selectProject(projectId) {
        if (!projects.some((item) => item.id === projectId)) return;

        setSelectedId(projectId);
        setDetail(null);
        setGithubMessage(null);
        // Le registre se referme, mais selectedId reste mémorisé.
        setRegistryOpen(false);
    }

    function openDetail(type) {
        if (!project) return;

        if (type === "preview" && project.previewUrl) {
            window.location.href = new URL(project.previewUrl, window.location.href).href;
            return;
        }

        setDetail(type);
    }


    /* GLISSER-DÉPOSER */

    function handleDragStart(event, projectId) {
        draggedIdRef.current = projectId;
        event.dataTransfer.setData("text/plain", projectId);
        event.dataTransfer.effectAllowed = "move";
        setIsDragging(true);
    }

    function handleDragEnd() {
        draggedIdRef.current = null;
        setIsDragging(false);
    }

    function handleDragOver(event) {
        // N'active l'effet de dépôt que pour un projet venant du registre.
        if (!draggedIdRef.current) return;

        event.preventDefault();
        if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
        setIsDragging(true);
    }

    function handleDragLeave(event) {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsDragging(false);
        }
    }

    function handleDrop(event) {
        event.preventDefault();

        const projectId = event.dataTransfer?.getData("text/plain") || draggedIdRef.current;

        draggedIdRef.current = null;
        setIsDragging(false);

        if (projectId) selectProject(projectId);
    }


    /* CLAVIER : Échap ferme le détail ouvert, sinon le registre */

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key !== "Escape") return;

            if (detail) {
                setDetail(null);
            } else if (registryOpen) {
                setRegistryOpen(false);
                registryToggleRef.current?.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [detail, registryOpen]);


    return (
        <div
            className={isDragging ? "mage-desk drag-over" : "mage-desk"}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="desk-glow" aria-hidden="true"></div>

            <div className="desk-object desk-candle" aria-hidden="true">🕯️</div>
            <div className="desk-object desk-inkwell" aria-hidden="true">🖋️</div>
            <div className="desk-object desk-hat" aria-hidden="true">🎩</div>

            <Parchment
                project={project}
                detail={detail}
                onOpenDetail={openDetail}
                onCloseDetail={() => setDetail(null)}
            />

            <GithubCat
                project={project}
                message={githubMessage}
                onMessage={setGithubMessage}
            />

            <Registry
                projects={projects}
                selectedId={selectedId}
                open={registryOpen}
                isDragging={isDragging}
                toggleRef={registryToggleRef}
                onToggle={() => setRegistryOpen((isOpen) => !isOpen)}
                onOpen={() => setRegistryOpen(true)}
                onSelect={selectProject}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            />
        </div>
    );
}
