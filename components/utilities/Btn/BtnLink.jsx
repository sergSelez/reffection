import './Btn.scss';

function BtnLink({ children, label, link, className, target }) {
  return (
    <a
      href={link}
      type="button"
      className={`btn ${className ? className : ''}`}
      aria-label={label}
      target={target ? '' : '_blank'}
      rel="nofollow noreferrer"
    >
      {children}
    </a>
  );
}

export default BtnLink;
