import cls from './Btn.module.scss';

// TODO: вернуть обычные классы
function BtnLink({ children, label, link, className }) {
  return (
    <a
      href={link}
      type="button"
      className={`btn ${cls.btn} ${className ? className : ''}`}
      aria-label={label}
      target="_blank"
      rel="nofollow noreferrer"
    >
      {children}
    </a>
  );
}

export default BtnLink;
