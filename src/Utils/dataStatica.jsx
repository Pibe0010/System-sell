import { v } from "../Styles/variables.jsx";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";

export const DesplegableUser = [
  {
    text: "My profile",
    icono: <v.iconoUser />,
    tipo: "myprofile",
  },
  {
    text: "Settings",
    icono: <v.iconoSettings />,
    tipo: "settings",
  },
  {
    text: "Log out",
    icono: <v.iconoCerrarSesion />,
    tipo: "logout",
  },
];

//data SIDEBAR
export const LinksArray = [
  {
    label: "Home",
    icon: "noto-v1:house",
    to: "/",
  },
  {
    label: "Sell",
    icon: "flat-color-icons:shop",
    to: "/after-sales",
  },
  {
    label: "Kardex",
    icon: "flat-ui:box",
    to: "/kardex",
  },
  {
    label: "Reports",
    icon: "flat-ui:graph",
    to: "/reports",
  },
];
export const SecondarylinksArray = [
  {
    label: "Settings",
    icon: "icon-park:setting-two",
    to: "/settings",
    color: "#CE82FF",
  },
];
//temas
export const TemasData = [
  {
    icono: "🌞",
    descripcion: "light",
  },
  {
    icono: "🌚",
    descripcion: "dark",
  },
];

//data configuracion
export const DataModulosConfiguracion = [
  {
    title: "Products",
    subtitle: "Products registered",
    icono: "https://i.ibb.co/85zJ6yG/caja-del-paquete.png",
    link: "/settings/products",
  },
  {
    title: "Employees",
    subtitle: "Have control of your staff",
    icono: "https://i.ibb.co/5vgZ0fX/hombre.png",
    link: "/settings/users",
  },

  {
    title: "Company",
    subtitle: "Configure your basic options",
    icono: "https://i.ibb.co/x7mHPgm/administracion-de-empresas.png",
    link: "/settings/company",
  },
  {
    title: "Products category",
    subtitle: "Assign categories to your products",
    icono: "https://i.ibb.co/VYbMRLZ/categoria.png",
    link: "/settings/category",
  },
  {
    title: "Products brand",
    subtitle: "Manage your brands",
    icono: "https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png",
    link: "/settings/brand",
  },
];
//tipo usuario
export const TipouserData = [
  {
    descripcion: "employee",
    icono: "🪖",
  },
  {
    descripcion: "admin",
    icono: "👑",
  },
];
//tipodoc
export const TipoDocData = [
  {
    descripcion: "Dni",
    icono: "🪖",
  },
  {
    descripcion: "Libreta electoral",
    icono: "👑",
  },
  {
    descripcion: "Otros",
    icono: "👑",
  },
];
