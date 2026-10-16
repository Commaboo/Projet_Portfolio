/* =========================================================
   CHAT GITHUB
   - Projet avec lien GitHub : le chat devient un vrai lien
     (nouvel onglet) et une bulle invite à cliquer dessus.
   - Projet sans lien ou aucun projet : un message explique pourquoi.
   ========================================================= */

import { useEffect } from "react";

export default function GithubCat({ project, message, onMessage }) {
    // Le message disparaît tout seul ; un nouveau clic relance le délai.
    useEffect(() => {
        if (!message) return;
        const timer = window.setTimeout(() => onMessage(null), message.duration);
        return () => window.clearTimeout(timer);
    }, [message, onMessage]);

    const githubUrl = project?.github ?? null;

    function handleClick() {
        if (!project) {
            onMessage({ text: "Sélectionne d'abord un projet dans le registre.", duration: 3000 });
            return;
        }

        onMessage({
            text: `🐈‍⬛ Aucun grimoire GitHub n'est encore disponible pour « ${project.title} ».`,
            duration: 4000,
        });
    }

    return (
        <>
            {/* Bulle d'invitation : seulement si le projet a un dépôt et qu'aucun message n'est affiché. */}
            {githubUrl && !message && (
                <p className="github-cat-hint" aria-hidden="true">
                    Clique sur moi pour voir le code sur GitHub&nbsp;✦
                </p>
            )}

            {githubUrl ? (
                <a
                    id="github-cat"
                    className="github-cat has-link"
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ouvrir le GitHub de « ${project.title} » (nouvel onglet)`}
                    title="Voir le code sur GitHub"
                >
                    🐈‍⬛
                </a>
            ) : (
                <button
                    id="github-cat"
                    className="github-cat"
                    type="button"
                    aria-label="Voir le GitHub du projet"
                    onClick={handleClick}
                >
                    🐈‍⬛
                </button>
            )}

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
