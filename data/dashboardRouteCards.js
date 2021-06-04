import { BiRefresh } from "react-icons/bi";
import { BsPeopleFill, BsFillTagFill } from "react-icons/bs";
import { routes } from "../routes";
import { TiWarning } from "react-icons/ti";
import { RiSettings4Line } from "react-icons/ri";
import { AiFillDelete, AiFillDollarCircle } from "react-icons/ai";
import { FaTags, FaMoneyBillAlt } from "react-icons/fa";
import { IoIosBrush } from "react-icons/io";
import { IoLanguage } from "react-icons/io5";
export const DashboardRouteCardData = [
  {
    url: routes["subscriptions"].subMenu["mySubs"],
    heading: "Subscription Groups",
    icon: <BiRefresh />,
    description:
      "View and edit customers, upcoming orders, credit card info and addresses.",
  },
  {
    url: routes["subscriptions"].subMenu["customers"],
    heading: "Customers",
    icon: <BsPeopleFill />,
    description:
      "View and edit customers, upcoming orders, credit card info and addresses.",
  },
  {
    url: routes["reports"].subMenu["FailedTransaction"],
    heading: "Failed Transactions",
    icon: <TiWarning />,
    description:
      "View all recent failed transactions and update credit card info.",
  },
  {
    url: routes["tools"].subMenu["ManageDeletedProds"],
    heading: "Manage Deleted Products",
    icon: <AiFillDelete />,
    description: "Remove or substitute products when they get deleted here.",
  },
  {
    url: routes["tools"].subMenu["ManagePricing"],
    heading: "Update Pricing",
    icon: <AiFillDollarCircle />,
    description: "Globally update prices for products on all subscriptions.",
  },
  {
    url: routes["subscriptions"].subMenu["discCodes"],
    heading: "Discount Codes",
    icon: <FaTags />,
    description: "View all existing discount codes",
  },
  {
    url: routes["subscriptions"].subMenu["discCodes"],
    heading: "Create Discount Code",
    icon: <BsFillTagFill />,
    description: "Create coupons and discount codes to get used at checkout.",
  },
  {
    url: routes["subscriptions"].subMenu["cartMode"],
    heading: "Cart Mode",
    icon: <RiSettings4Line />,
    description: "Select the style of recurring cart you want for your store.",
  },
  {
    url: routes["subscriptions"].subMenu["cartMode"],
    heading: "Cart Mode",
    icon: <BsFillTagFill />,
    description: "Create coupons and discount codes to get used at checkout.",
  },
  {
    url: routes["settings"].subMenu["payment_gateway"],
    heading: "Payment Settings",
    icon: <FaMoneyBillAlt />,
    description: "Select the style of recurring cart you want for your store.",
  },
  {
    url: routes["settings"].subMenu["display_settings"],
    heading: "Display Settings",
    icon: <IoIosBrush />,
    description:
      "Style your recurring widgets, cart widgets and customer admin page.",
  },
  {
    url: routes["settings"].subMenu["lang_settings"],
    heading: "Language Settings",
    icon: <IoLanguage />,
    description: "Change the wording on widgets and customer admin page.",
  },
];
