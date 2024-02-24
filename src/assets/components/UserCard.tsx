import { Link } from "react-router-dom";
import { UserType } from "../../types";
import UserImage from "./UserImage";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function UserCard(user: UserType): JSX.Element {
  return (
    <article className="w-full flex items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <Link to={"/users/" + user.id}>
          <UserImage isSmall imageUrl={user.imageUrl} altText={`user avatar`} />
        </Link>
      </div>
      <div>
        <p className="mt-4 text-sm text-gray-500">@{user.username || <Skeleton />}</p>
        <h3 className="mt-1 text-xl font-semibold">{`${user.name.first || <Skeleton />} ${user.name.last || <Skeleton />}`}</h3>
        <div className="mt-1 flex justify-between items-center">
          <div className="flex items-center gap-1">
          </div>
        </div>
      </div>
    </article>
  )
}

export function UserCardOnLoad(): JSX.Element {
  return (
    <article className="w-full flex items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <Link to={"/users"}>
          <div className="w-full h-full flex flex-col gap-5 items-center justify-center"><div className="lds-ring h-5 w-5"><div></div><div></div><div></div><div></div></div></div>
        </Link>
      </div>
      <div>
        <p className="mt-4 text-sm text-gray-500">{<Skeleton />}</p>
        <h3 className="mt-1 text-xl font-semibold">{`${<Skeleton />} ${<Skeleton />}`}</h3>
        <div className="mt-1 flex justify-between items-center">
          <div className="flex items-center gap-1">
          </div>
        </div>
      </div>
    </article>
  )
}