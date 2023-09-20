import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error, Root } from "../components";
import {
  Home,
  Collections,
  Categories,
  Bag,
  Checkout,
  Orders,
  OrderId,
  Account,
  SavedItems,
  Profile,
  Shoporders,
  ManageProduct,
  CreateProduct,
  Search,
} from "../pages";
import ProductDetail from "../components/ProductDetail";
import ProtectedRoutes from "./ProtectedRoutes";

export default function Routespath() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "collections",
          element: (
            <ProtectedRoutes>
              <Collections />
            </ProtectedRoutes>
          ),
          children: [
            {
              path: ":collectionName",
              element: (
                <ProtectedRoutes>
                  <Categories />
                </ProtectedRoutes>
              ),
            },
            {
              path: ":collectionName/:slug",
              element: <ProductDetail />,
            },
          ],
        },
        {
          path: "bag",
          element: <Bag />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "account",
          element: (
            <ProtectedRoutes>
              <Account />
            </ProtectedRoutes>
          ),
          children: [
            {
              path: ":username/orders",
              element: <Orders />,
              children: [
                {
                  path: ":orderId",
                  element: <OrderId />,
                },
              ],
            },
            {
              path: ":username/saveditems",
              element: <SavedItems />,
            },
            {
              path: "user-profile/:username",
              element: <Profile />,
            },
            {
              path: "allorders",
              element: <Shoporders />,
            },
            {
              path: "manage-product",
              element: <ManageProduct />,
            },
            {
              path: "add-new-product",
              element: <CreateProduct />,
            },
          ],
        },
        {
          path: "search",
          element: <Search />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
