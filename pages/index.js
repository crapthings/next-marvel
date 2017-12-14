import fetch from 'isomorphic-unfetch'

import { Layout } from '../components'

import { getAuthString } from '../api'

const Index = ({ data: characters }) => {
  console.log(characters)
  return (
    <Layout>
      <h1>hey marvel</h1>
      {characters.map(char => (
        <div key={char.id}>
          <h3>{char.name}</h3>
          <p>{char.description}</p>
          <img src={char.thumbnail.path + '/standard_fantastic.jpg'} alt='' />
        </div>
      ))}
    </Layout>
  )
}

Index.getInitialProps = async () => {
  const api = await fetch(`http://localhost:3000/api/characters`)
  const data = await api.json()
  return {
    data
  }
}

export default Index
