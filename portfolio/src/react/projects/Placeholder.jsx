/* Encadré « indisponible » réutilisé pour l'image et la preview. */

export default function Placeholder({ title, children }) {
    return (
        <div className="project-image-placeholder">
            <span className="placeholder-icon" aria-hidden="true">✦</span>
            <h3 className="placeholder-title">{title}</h3>
            <p className="placeholder-description">{children}</p>
        </div>
    );
}
