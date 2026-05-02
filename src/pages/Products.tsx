import { useOutletContext } from "react-router-dom";
import { Shop } from "@/components/site/Shop";
import { Categories } from "@/components/site/Categories";

export const Products = () => {
  const { query } = useOutletContext<{ query: string }>();

  return (
    <>
      <Categories />
      <Shop query={query} />
    </>
  );
};

export default Products;
