import defaultContent from '../content.json'

const STORAGE_KEY = 'lila-site-content'
const CORRUPTED_TEXT_PATTERN = /пїЅ|�|Рђ|Рџ|Рњ|РЅ|Рµ|Рё|Р°|Р»|Рѕ|СЃ|С‚|СЊ|вЂ/

const clone = (value) => JSON.parse(JSON.stringify(value))

export const getContent = async () => {
  if (typeof window === 'undefined') return clone(defaultContent)

  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (!stored) return clone(defaultContent)

  try {
    if (CORRUPTED_TEXT_PATTERN.test(stored)) {
      window.localStorage.removeItem(STORAGE_KEY)
      return clone(defaultContent)
    }

    return {
      ...clone(defaultContent),
      ...JSON.parse(stored),
    }
  } catch (error) {
    console.warn('Cannot parse stored site content', error)
    return clone(defaultContent)
  }
}

export const saveContent = async (content) => {
  const nextContent = clone(content)

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent))
  }

  return nextContent
}

export const resetContent = async () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return clone(defaultContent)
}

export { defaultContent }
