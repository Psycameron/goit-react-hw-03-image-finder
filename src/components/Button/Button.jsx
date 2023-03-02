import css from './Button.module.css';

export function Button() {
  return (
    <button type="button" className={css.Button}>
      <span>Load more</span>
    </button>
  );
}
