import { FaChartSimple as tablesIcon } from "react-icons/fa6";
import { FaHome as dashboardIcon } from "react-icons/fa";
import { BsCreditCard2BackFill as billingIcon } from "react-icons/bs";
import { AiFillTool as rtlIcon } from "react-icons/ai";
import { FaUser as profileIcon } from "react-icons/fa";
import { IoDocument as loginIcon } from "react-icons/io5";
import { IoRocketSharp as signUpIcon } from "react-icons/io5";
import { IconType } from "react-icons";
import { RiTodoFill as todoIcon } from "react-icons/ri";
import { BsBookmarkStarFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";

export interface SideMenuItem {
  icon: IconType;
  title: string;
  url: string;
  marked?: IconType;
}

export const sideMenuItems: SideMenuItem[] = [
  {
    icon: dashboardIcon,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    icon: tablesIcon,
    title: "Tables",
    url: "/tables",
    marked: BsBookmarkStarFill,
  },
  {
    icon: billingIcon,
    title: "Billing",
    url: "/billing",
  },
  {
    icon: rtlIcon,
    title: "Form Playground",
    url: "/rtl",
    marked: BsBookmarkStarFill,
  },
  {
    icon: todoIcon,
    title: "To-do List Next",
    url: "/todolistnext",
    marked: BsBookmarkStarFill,
  },
  {
    icon: todoIcon,
    title: "Quizlet mini",
    url: "/quiz",
    marked: BsBookmarkStarFill,
  },
  {
    icon: FaClock,
    title: "Pomodoro",
    url: "/pomodoro",
    marked: BsBookmarkStarFill,
  },
  {
    icon: profileIcon,
    title: "Profile",
    url: "/profile",
  },
  {
    icon: loginIcon,
    title: "Log In",
    url: "/login",
  },
  {
    icon: signUpIcon,
    title: "Sign Up",
    url: "/signup",
  },
];
