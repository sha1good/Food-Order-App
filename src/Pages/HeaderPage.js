import HeaderCartButton from "../components/Layout/Header";

const HeaderPage = (props) => {
  return  <HeaderCartButton onClick={props.showCart} /> ;
};

export default HeaderPage;
