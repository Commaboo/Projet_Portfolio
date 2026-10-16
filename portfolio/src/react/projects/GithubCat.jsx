/* =========================================================
   CHAT GITHUB
   ========================================================= */

import { useEffect } from "react";

export default function GithubCat({ project, message, onMessage }) {
    // Le message disparaît tout seul ; un nouveau clic relance le délai.
    useEffect(() => {
        if (!message) return;
        const timer = window.setTimeout(() => onMessage(null), message.duration);
        return () => window.clearTimeout(timer);
    }, [message, onMessage]);

    function handleClick() {
        if (!project) {
            onMessage({ text: "Sélectionne d'abord un projet dans le registre.", duration: 3000 });
            return;
        }

        if (project.github) {
            window.open(project.github, "_blank", "noopener,noreferrer");
            return;
        }

        onMessage({
            text: `🐈‍⬛ Aucun grimoire GitHub n'est encore disponible pour « ${project.title} ».`,
            duration: 4000,
        });
    }

    return (
        <>
            <button
                id="github-cat"
                className="github-cat"
                type="button"
                aria-label="Voir le GitHub du projet"
                onClick={handleClick}
            >
                🐈‍⬛
            </button>

            {/* Toujours présent dans le DOM pour que l'annonce role="status" soit lue. */}
            <div
                id="github-message"
                className={message ? "github-message" : "github-message hidden"}
                role="status"
            >
                {message?.text}
            </div>
        </>
    );
}
