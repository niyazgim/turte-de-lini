import ProductImage from "../images/ProductImage";
import { CartProductType, ProductResponseType, ProductType } from "../../../types";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { IconBtn } from "../Btn";

async function addToCard(pid: number) {
  if (localStorage.getItem('cart')) {
    const products = JSON.parse(localStorage.getItem('cart')!)
    if (products.find((e: CartProductType) => e.productId === String(pid))) {
      products.map((product: CartProductType) => {
        if (product.productId == String(pid)) {
          product.quantity = product.quantity + 1;
        }
      });
    } else {
      products.push({ productId: String(pid), quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(products))
  } else {
    const products: CartProductType[] = [
      { productId: String(pid), quantity: 1 }
    ];
    localStorage.setItem('cart', JSON.stringify(products))
  }
}

export default function ProductCard({ id, imageUrl, name, price }: ProductType): JSX.Element {
  return (
    <article className="w-full">
      <Link to={"/catalog/" + id}>
        <ProductImage imageUrl={imageUrl} altText={name} />
      </Link>
      <h3 className="mt-4 text-sm">{name}</h3>
      <div className="mt-1 flex justify-between items-center">
        <p className="text-xl">{price} $</p>
        <menu className="flex items-center">
          <IconBtn>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21L10.55 19.7C8.86667 18.1834 7.475 16.875 6.375 15.775C5.275 14.675 4.4 13.6875 3.75 12.8125C3.1 11.9375 2.64583 11.1334 2.3875 10.4C2.12917 9.66669 2 8.91669 2 8.15002C2 6.58336 2.525 5.27502 3.575 4.22502C4.625 3.17502 5.93333 2.65002 7.5 2.65002C8.36667 2.65002 9.19167 2.83336 9.975 3.20002C10.7583 3.56669 11.4333 4.08336 12 4.75002C12.5667 4.08336 13.2417 3.56669 14.025 3.20002C14.8083 2.83336 15.6333 2.65002 16.5 2.65002C18.0667 2.65002 19.375 3.17502 20.425 4.22502C21.475 5.27502 22 6.58336 22 8.15002C22 8.91669 21.8708 9.66669 21.6125 10.4C21.3542 11.1334 20.9 11.9375 20.25 12.8125C19.6 13.6875 18.725 14.675 17.625 15.775C16.525 16.875 15.1333 18.1834 13.45 19.7L12 21ZM12 18.3C13.6 16.8667 14.9167 15.6375 15.95 14.6125C16.9833 13.5875 17.8 12.6959 18.4 11.9375C19 11.1792 19.4167 10.5042 19.65 9.91252C19.8833 9.32086 20 8.73336 20 8.15002C20 7.15002 19.6667 6.31669 19 5.65002C18.3333 4.98336 17.5 4.65002 16.5 4.65002C15.7167 4.65002 14.9917 4.87086 14.325 5.31252C13.6583 5.75419 13.2 6.31669 12.95 7.00002H11.05C10.8 6.31669 10.3417 5.75419 9.675 5.31252C9.00833 4.87086 8.28333 4.65002 7.5 4.65002C6.5 4.65002 5.66667 4.98336 5 5.65002C4.33333 6.31669 4 7.15002 4 8.15002C4 8.73336 4.11667 9.32086 4.35 9.91252C4.58333 10.5042 5 11.1792 5.6 11.9375C6.2 12.6959 7.01667 13.5875 8.05 14.6125C9.08333 15.6375 10.4 16.8667 12 18.3Z" fill="#F0F0F0" />
            </svg>
          </IconBtn>
          <IconBtn onClick={() => addToCard(id)}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V8C4 7.45 4.19583 6.97917 4.5875 6.5875C4.97917 6.19583 5.45 6 6 6H8C8 4.9 8.39167 3.95833 9.175 3.175C9.95833 2.39167 10.9 2 12 2C13.1 2 14.0417 2.39167 14.825 3.175C15.6083 3.95833 16 4.9 16 6H18C18.55 6 19.0208 6.19583 19.4125 6.5875C19.8042 6.97917 20 7.45 20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM6 20H18V8H16V10C16 10.2833 15.9042 10.5208 15.7125 10.7125C15.5208 10.9042 15.2833 11 15 11C14.7167 11 14.4792 10.9042 14.2875 10.7125C14.0958 10.5208 14 10.2833 14 10V8H10V10C10 10.2833 9.90417 10.5208 9.7125 10.7125C9.52083 10.9042 9.28333 11 9 11C8.71667 11 8.47917 10.9042 8.2875 10.7125C8.09583 10.5208 8 10.2833 8 10V8H6V20ZM10 6H14C14 5.45 13.8042 4.97917 13.4125 4.5875C13.0208 4.19583 12.55 4 12 4C11.45 4 10.9792 4.19583 10.5875 4.5875C10.1958 4.97917 10 5.45 10 6Z" fill="#F0F0F0" />
            </svg>
          </IconBtn>
        </menu>
      </div>
    </article >
  )
}
export function ProductCardOnLoad(): JSX.Element {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <article className="w-full">
        <Skeleton className="w-full aspect-square" />
        <h3 className="mt-4 text-sm"><Skeleton className="w-full h-6" /></h3>
        <div className="mt-1 flex justify-between items-center">
          <p className="text-xl"><Skeleton className="w-16 h-6" /></p>
          <menu className="flex items-center gap-1">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-6 h-6" />
          </menu>
        </div>
      </article>
    </SkeletonTheme>
  )
}

export function ProductSuggestionsCard({ id, imageUrl, name, price }: ProductType): JSX.Element {
  return (
    <div data-id={id} className="py-2 px-2 flex gap-3">
      <Link className="aspect-square w-16" to={`/catalog/${id}`}>
        <ProductImage imageUrl={imageUrl} altText={name} isSmall={true} />
      </Link>
      <div className="w-full flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold">{name}</h3>
          <p className="text-x">{price} $</p>
        </div>
        <menu className="flex gap-1 items-center">
          <IconBtn>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21L10.55 19.7C8.86667 18.1834 7.475 16.875 6.375 15.775C5.275 14.675 4.4 13.6875 3.75 12.8125C3.1 11.9375 2.64583 11.1334 2.3875 10.4C2.12917 9.66669 2 8.91669 2 8.15002C2 6.58336 2.525 5.27502 3.575 4.22502C4.625 3.17502 5.93333 2.65002 7.5 2.65002C8.36667 2.65002 9.19167 2.83336 9.975 3.20002C10.7583 3.56669 11.4333 4.08336 12 4.75002C12.5667 4.08336 13.2417 3.56669 14.025 3.20002C14.8083 2.83336 15.6333 2.65002 16.5 2.65002C18.0667 2.65002 19.375 3.17502 20.425 4.22502C21.475 5.27502 22 6.58336 22 8.15002C22 8.91669 21.8708 9.66669 21.6125 10.4C21.3542 11.1334 20.9 11.9375 20.25 12.8125C19.6 13.6875 18.725 14.675 17.625 15.775C16.525 16.875 15.1333 18.1834 13.45 19.7L12 21ZM12 18.3C13.6 16.8667 14.9167 15.6375 15.95 14.6125C16.9833 13.5875 17.8 12.6959 18.4 11.9375C19 11.1792 19.4167 10.5042 19.65 9.91252C19.8833 9.32086 20 8.73336 20 8.15002C20 7.15002 19.6667 6.31669 19 5.65002C18.3333 4.98336 17.5 4.65002 16.5 4.65002C15.7167 4.65002 14.9917 4.87086 14.325 5.31252C13.6583 5.75419 13.2 6.31669 12.95 7.00002H11.05C10.8 6.31669 10.3417 5.75419 9.675 5.31252C9.00833 4.87086 8.28333 4.65002 7.5 4.65002C6.5 4.65002 5.66667 4.98336 5 5.65002C4.33333 6.31669 4 7.15002 4 8.15002C4 8.73336 4.11667 9.32086 4.35 9.91252C4.58333 10.5042 5 11.1792 5.6 11.9375C6.2 12.6959 7.01667 13.5875 8.05 14.6125C9.08333 15.6375 10.4 16.8667 12 18.3Z" fill="#F0F0F0" />
            </svg>
          </IconBtn>
          <IconBtn>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V8C4 7.45 4.19583 6.97917 4.5875 6.5875C4.97917 6.19583 5.45 6 6 6H8C8 4.9 8.39167 3.95833 9.175 3.175C9.95833 2.39167 10.9 2 12 2C13.1 2 14.0417 2.39167 14.825 3.175C15.6083 3.95833 16 4.9 16 6H18C18.55 6 19.0208 6.19583 19.4125 6.5875C19.8042 6.97917 20 7.45 20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM6 20H18V8H16V10C16 10.2833 15.9042 10.5208 15.7125 10.7125C15.5208 10.9042 15.2833 11 15 11C14.7167 11 14.4792 10.9042 14.2875 10.7125C14.0958 10.5208 14 10.2833 14 10V8H10V10C10 10.2833 9.90417 10.5208 9.7125 10.7125C9.52083 10.9042 9.28333 11 9 11C8.71667 11 8.47917 10.9042 8.2875 10.7125C8.09583 10.5208 8 10.2833 8 10V8H6V20ZM10 6H14C14 5.45 13.8042 4.97917 13.4125 4.5875C13.0208 4.19583 12.55 4 12 4C11.45 4 10.9792 4.19583 10.5875 4.5875C10.1958 4.97917 10 5.45 10 6Z" fill="#F0F0F0" />
            </svg>
          </IconBtn>
        </menu>
      </div>
    </div>
  )
}

interface ProductCartCardProps {
  product: ProductResponseType,
  quantity: number,
}

export function ProductCartCard({ product, quantity }: ProductCartCardProps): JSX.Element {
  return (
    <div data-id={product.id} className="flex gap-3">
      <Link className="aspect-square w-16 relative" to={`/catalog/${product.id}`}>

        <ProductImage imageUrl={product.image} altText={product.title} isSmall={true} />
      </Link>
      <div className="w-full flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold">{product.title.length > 50 ? `${product.title.substring(0, 50)}...` : product.title} </h3>
          <p className="text-x">{product.price} $</p>
        </div>
        <menu className="flex gap-1 items-center">
          <IconBtn>
            <svg className="h-5 w-5 dark:[&>*]:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13V11H19V13H5Z" fill="currentColor" />
            </svg>
          </IconBtn>
          <p>{quantity}</p>
          <IconBtn>
            <svg className="h-5 w-5 dark:[&>*]:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="currentColor" />
            </svg>
          </IconBtn>
        </menu>
      </div>
    </div>
  )
}