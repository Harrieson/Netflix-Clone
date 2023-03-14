import Navbar from '@/components/Navbar'
import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import Billboard from '@/components/Billboard'
import MovieList from '@/components/MovieList'
import useMovieList from '@/hooks/useMovies'
import useFavourites from '@/hooks/useFavourites'


export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context)

  if(!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
export default function Home() {
  const {data: movies = []} = useMovieList()
  const {data: favourites= []} = useFavourites()
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList  title="Trending Now" data={movies}/>
        <MovieList title="Favourites" data={favourites} />
      </div>
    </>
  )
}
