import { useEffect, useRef } from "react";

function ImagePreview({ image, language = "en", onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousActiveElement = document.activeElement;

    document.body.style.overflow = "hidden";
    document.body.classList.add("image-preview-open");
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("image-preview-open");
      window.removeEventListener("keydown", handleKeyDown);

      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus({ preventScroll: true });
      }
    };
  }, [onClose]);

  if (!image) return null;

  const isZh = language === "zh";
  const title = image.title || image.alt || "";
  const caption = image.caption || "";
  const dialogLabel = title
    ? `${isZh ? "图片预览" : "Image preview"}: ${title}`
    : isZh ? "图片预览" : "Image preview";

  return (
    <div
      className="image-preview"
      role="dialog"
      aria-modal="true"
      aria-label={dialogLabel}
      onClick={onClose}
    >
      <figure className="image-preview-panel" onClick={(event) => event.stopPropagation()}>
        <button
          ref={closeButtonRef}
          className="image-preview-close"
          type="button"
          onClick={onClose}
        >
          {isZh ? "关闭" : "Close"}
        </button>
        <div className="image-preview-media">
          <img
            src={image.src}
            alt={image.alt || title}
            loading="eager"
            decoding="async"
          />
        </div>
        {(title || caption) && (
          <figcaption className="image-preview-caption">
            {title && <strong>{title}</strong>}
            {caption && <span>{caption}</span>}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

export default ImagePreview;
