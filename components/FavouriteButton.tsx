import axios from "axios";
import React,{useCallback, useMemo} from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourites from "@/hooks/useFavourites";
import {AiOutlinePlus, AiOutlineCheck} from 'react-icons/ai'

interface FavouriteButtonProps {
    movieId: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({movieId}) => {
    const {mutate: mutateFavourites} = useFavourites();

    const {data: currentUser, mutate} = useCurrentUser();

    const isFavourite = useMemo(() => {
        const list = currentUser?.favourites || []

        return list.includes(movieId)
    }, [currentUser, movieId])


    const toogleFavourites = useCallback(async () => {
        let response
        if(isFavourite){
            response = await axios.delete('api/favourite', {data: {movieId}})
        }

        response = await axios.post('api/favourite', {movieId})

        const updatedFavourites = response?.data?.favourites;

        mutate({
        ...currentUser,
        favourites: updatedFavourites
        })

        mutateFavourites()
    }, [movieId, isFavourite, currentUser, mutate, mutateFavourites])

    const Icon = isFavourite? AiOutlineCheck : AiOutlinePlus;
    return (
        <div className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10
                        border-white border-2 rounded-full flex justify-center
                        items-center transition hover:border-neutral-300"
                        onClick={toogleFavourites}
                        
                        >
                            <Icon className="text-white" size={25} />
                        </div>
    )
}

export default FavouriteButton