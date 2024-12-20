import { Models } from "appwrite"
import { useDeleteSavePost, useGetCurrentUser, useLikePost, useSavePost } from "../../lib/react-query/queryAndMutation"
import React, { useEffect, useState } from "react"
import { checkIsLiked } from "../../lib/utils"
import Loader from "./Loader"

type PostStatsProps = {
    post: Models.Document,
    userId: string
}

function PostStats({ post, userId }: PostStatsProps) {
    const likesList = post.likes.map((user: Models.Document) => user.$id)
    
    const [likes, setLikes] = useState<string[]>(likesList)
    const [isSaved, setIsSaved] = useState(false)
    
    const { mutate: likePost } = useLikePost()
    const { mutate: savePost, isPending: isSavingPost } = useSavePost()
    const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavePost()

    const { data: currentUser } = useGetCurrentUser()

    const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post?.$id)

    useEffect(() => {
      setIsSaved(!!savedPostRecord)
    }, [savedPostRecord])
    

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation()

        let likesArray = [...likes]

        const hasLiked = checkIsLiked(likesArray, userId)
        if (hasLiked) {
            likesArray = likesArray.filter((id) => id !== userId)
        } else {
            likesArray.push(userId)
        }

        setLikes(likesArray)
        likePost({ postId: post.$id || '', likesArray })
    }

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation()

        if (savedPostRecord) {
            setIsSaved(false)
            deleteSavedPost(savedPostRecord.$id)
        } else {
            savePost({ postId: post.$id || '', userId })
            setIsSaved(true)
        }
    }

    return (
        <div className="flex justify-between items-center z-20">
            <div className="flex gap-2 mr-5">
                <img
                    src={checkIsLiked(likes, userId)
                        ? "/assets/icons/liked.svg"
                        : "/assets/icons/like.svg"
                    }
                    alt="like"
                    width={20}
                    height={20}
                    onClick={handleLikePost}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>
            
            <div className="flex gap-2">
                {isSavingPost || isDeletingSaved ? <Loader /> : <img
                    src={isSaved
                        ? "/assets/icons/saved.svg"
                        : "/assets/icons/save.svg"
                    }
                    alt="save"
                    width={20}
                    height={20}
                    onClick={handleSavePost}
                    className="cursor-pointer"
                />}
            </div>
        </div>
    )
}

export default PostStats