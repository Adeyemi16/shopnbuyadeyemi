import { AiFillGithub } from "react-icons/ai";
export default function Footer() {
  return (
    <div className="layout-container mt-5 p-3">
      <div className="border-0 border-top border-dark mb-3" />
      <div className="d-flex justify-content-between align-items-center">
        <span>© 2023 ShopNBuy™. All Rights Reserved.</span>
        <a href="https://github.com/Adeyemi16" target="_blank" rel="noreferrer">
          <AiFillGithub size="24px" color="black" />
        </a>
      </div>
    </div>
  );
}