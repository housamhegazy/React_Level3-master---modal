import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { i18n } = useTranslation();
  return (
    <div className="myfooter">
      <footer className="ali ">
        {i18n.language === "en" && "Designed and developed by Housam Hegazy "}
        {i18n.language === "ar" && <p dir="rtl">تصميم وتطوير حسام حجازي </p>}
        {i18n.language === "fr" && "Conçu et développé par HousamHegazy"}

        <span>
          {" "}
          <i className="fa-solid fa-heart"></i>{" "}
        </span>
      </footer>
    </div>
  );
};

export default Footer;
