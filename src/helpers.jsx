export const isMobile = () => window.innerWidth < 769

/**
 * @param { HTMLElement[] } el
 * @param { string } class
 */
export const toggleClass = (el, className) => {
  const element = !Array.isArray(el) ? [el] : el

  return element.map(e => {
    const hasClass = e.classList.contains(className)

    if (hasClass)
      e.classList.remove(className)
    else
      e.classList.add(className)

    return hasClass
  })
}