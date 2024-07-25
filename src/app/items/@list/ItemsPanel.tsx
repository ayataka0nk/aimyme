"use client";
import Link from "next/link";
import { Item } from "../type";
import { searchItems } from "./action";

export const ItemsPanel = ({ items }: { items: Item[] }) => {
  const action = (payload: FormData) => {
    searchItems(payload);
  };
  return (
    <div>
      <form action={action}>
        <input type="text" name="keyword" placeholder="Search" />
      </form>
      <div>
        {items.map((item) => {
          return (
            <Link href={`/items/${item.id}`} key={item.id}>
              <div>{item.name}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
