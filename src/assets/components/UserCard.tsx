import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import { UserType } from "../../types";

export default function UserCard({ id, imageUrl, name, username }: UserType): JSX.Element {
  return (
    <article className="w-full flex items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <Link to={"/users/" + id}>
          <ProductImage imageUrl={imageUrl} altText={`user avatar`} />
        </Link>
      </div>
      <div>
        <p className="mt-4 text-sm text-gray-500">@{username}</p>
        <h3 className="mt-1 text-xl font-semibold">{`${name.first} ${name.last}`}</h3>
        <div className="mt-1 flex justify-between items-center">
          <div className="flex items-center gap-1">
          </div>
        </div>
      </div>
    </article>
  )
}