import { Item } from "../type";
import { ItemsPanel } from "./ItemsPanel";

export const getItems = async ({
  keyword,
}: {
  keyword: string;
}): Promise<Item[]> => {
  if (typeof keyword === "undefined" || keyword === "") {
    return [
      {
        id: 1,
        name: "Item 1",
      },
      {
        id: 2,
        name: "Item 2",
      },
    ];
  } else if (keyword === "1") {
    return [
      {
        id: 1,
        name: "Item 1",
      },
    ];
  } else {
    return [
      {
        id: 2,
        name: "Item 2",
      },
    ];
  }
};

export default async function ItemsPage({
  searchParams,
}: {
  searchParams: {
    keyword: string;
  };
}) {
  console.log("projects searchParams", searchParams);
  const items = await getItems(searchParams);
  const keyword = searchParams.keyword || "";
  return <ItemsPanel items={items} />;
}
