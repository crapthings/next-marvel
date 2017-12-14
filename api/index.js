import md5 from 'md5-o-matic'

const MARVEL_API_BASE_URL = 'https://gateway.marvel.com/v1/public'
const MARVEL_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY
const MARVEL_PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY

export const getAuthString = ts => {
  const hash = md5(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY)
  return `ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`
}

export const getCharactersAPI = () => {
  const ts = + new Date()
  return `${MARVEL_API_BASE_URL}/characters?${getAuthString(ts)}`
}
