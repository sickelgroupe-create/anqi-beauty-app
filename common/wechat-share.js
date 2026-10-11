const storeTitle = '暨美丽 · 美容用品商城'

function params(query) {
  return Object.entries(query)
    .filter(([, value]) => value !== undefined && value !== null && String(value) !== '')
    .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(String(value)))
    .join('&')
}

function shareDetails(page, screen) {
  const invite = screen?.inviteCode || ''
  if (page === 'product' && screen?.product?.id) {
    return { title: screen.product.name || storeTitle, page: 'product', query: { id: screen.product.id, invite } }
  }
  return { title: storeTitle, page, query: { invite } }
}

export function shareToFriend(page, screen) {
  const details = shareDetails(page, screen)
  const query = params(details.query)
  return { title: details.title, path: '/pages/' + details.page + '/index' + (query ? '?' + query : '') }
}

export function shareToTimeline(page, screen) {
  const details = shareDetails(page, screen)
  return { title: details.title, query: params(details.query) }
}
