/**
 * ЛЕНДИНГ — единственный скрипт страницы.
 *
 * Ни React, ни сборки состояния здесь нет: лендингу нужны только
 * появление секций при прокрутке и мобильное меню. Стили живут в
 * landing.css, чтобы страница оставалась статической и грузилась сразу.
 */

// Жизнь без анимаций: если система просит покоя, показываем всё сразу.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Появление секций при прокрутке.
const revealTargets = document.querySelectorAll<HTMLElement>('[data-reveal]')

if (reduceMotion || typeof IntersectionObserver === 'undefined') {
  revealTargets.forEach((el) => el.classList.add('is-visible'))
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  )
  revealTargets.forEach((el) => observer.observe(el))
}

// Мобильное меню: бургер открывает панель, якорь — закрывает.
const menuButton = document.querySelector<HTMLButtonElement>('#menu-button')
const menu = document.querySelector<HTMLElement>('#nav-menu')

const setMenuOpen = (open: boolean): void => {
  menu?.classList.toggle('is-open', open)
  menuButton?.setAttribute('aria-expanded', String(open))
}

menuButton?.addEventListener('click', () => {
  setMenuOpen(!menu?.classList.contains('is-open'))
})

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false))
})
