export const timeAgo = date => {
  const diff = new Date().getTime() - date.getTime()
  let time = diff / 1000 / 60 / 60

  return time < 1
    ? Math.round(time * 60) + ' mins ago'
    : Math.round(time) + ' hours ago'
}

export const isMobile = () => window.innerWidth < 767

/**
 * @param { HTMLElement[] } el
 * @param { string } class
 */
export const toggleClass = (el, className, addBool) => {
  const element = !Array.isArray(el) ? [el] : el

  return element.map(e => {
    const hasClass = typeof addBool === 'boolean'
      ? addBool
      : e.classList.contains(className)

    if (hasClass)
      e.classList.remove(className)
    else
      e.classList.add(className)

    return !hasClass
  })
}

export const removeByIndex = (arr, index) =>
  [
    ...arr.slice(0, index),
    ...arr.slice(index + 1)
  ]

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};