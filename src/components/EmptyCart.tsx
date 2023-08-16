import "./ExploreContainer.css";

const EmptyCart: React.FC = () => {
  return (
    <div className="container">
      {/* <strong>{name}</strong> */}
      <p>
       You have no item in your cart
      </p>
    </div>
  );
};

export default EmptyCart;
