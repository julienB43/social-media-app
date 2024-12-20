import { useGetPostById } from '../../lib/react-query/queryAndMutation'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/shared/Loader'
import { formatDate } from '../../lib/utils'
import { useUserContext } from '../../context/AuthContext'
import { Button } from '../../components/ui/button'
import PostStats from '../../components/shared/PostStats'

function PostDetails() {
  const { id } = useParams()
  const { user } = useUserContext()
  
  const { data: post, isPending } = useGetPostById(id || '')

  const handleDeletePost = (e: React.MouseEvent) => {
    e.stopPropagation()


  }

  return (
    <div className='post_details-container'>
      {isPending || !post ? <Loader /> : (
        <div className='post_details-card'>
          <img
            src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
            className="post_details-img"
            alt="post"
          />
          <div className="post_details-info">
            <div className='flex-between w-full'>
              <Link to={`/profile/${post.creator.$id}`} className='flex imtems-center gap-3'>
                <img
                  src={post.creator.imageUrl || '/assets/icons/profile-placeholder.svg'}
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />

                <div className="flex flex-col gap-1">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {formatDate(post.$createdAt || '')}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className='flex-center gap-4'>
                {user.id === post.creator.$id ? (
                  <>
                    <Link to={`/update-post/${post.$id}`}>
                      <img
                        src="/assets/icons/edit.svg"
                        width={24}
                        height={24}
                        alt="edit"
                      />
                    </Link>
                    <Button
                      onClick={handleDeletePost}
                      variant="ghost"
                      className='ghost_details-delete_btn'
                    >
                      <img
                        src='/assets/icons/delete.svg'
                        alt='delete'
                        width={24}
                        height={24}
                      />
                    </Button>
                  </>
                ) : (<></>)}
              </div>
            </div>

            <hr className='border w-full border-dark-4/80' />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className='w-full'>
              <PostStats post={post} userId={user.id} />
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default PostDetails