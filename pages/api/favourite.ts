import { NextApiRequest, NextApiResponse } from "next";

import { without } from "lodash";
import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method ==='POST'){
            const {currentUser} =await serverAuth(req)

            const {movieId} = req.body

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            })
            if(!existingMovie){
                throw new Error('Invalid ID')
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favourites: {
                        push: movieId
                    }
                }
            })
            return res.status(200).json(user)
        }


        if (req.method === 'DELETE'){
            const {currentUser} = await serverAuth(req)

            const {movieId} = req.body

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            })
            if(!existingMovie){
                throw new Error('Invalid ID')
            }

            const updatedFavouriteIds = without(currentUser.favourites, movieId)

            const updatedUser = prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favourites: updatedFavouriteIds,
                }
            })

            return res.status(200).json(updatedUser)
        }

        return res.status(405).end()

        
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}