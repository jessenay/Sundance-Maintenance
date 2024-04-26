import { Link } from "react-router-dom";
import { FETCH_COMPONENTS_BY_LIFT_ID } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const slugify = (text) => {
  return text.toLowerCase().replace(/\s+/g, '-');
};

const MaintNav = ({ liftId }) => {
  console.log("lift Id in MaintNav:", liftId);

  const { loading, data, error } = useQuery(FETCH_COMPONENTS_BY_LIFT_ID, { variables: { liftId } });

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Data:", data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  const components = data.lift?.components || [];

  return (
    <header className="maintNav" style={{ backgroundColor: "black" }}>
      <div className="link-container">
        {components.map((component) => (
          <Link className="maintNav-buttons" to={`/lift/${liftId}/${slugify(component.name)}/${component._id}`} key={component._id}>
            <h1 style={{ fontSize: "20px", fontFamily: "Poppins", fontWeight: 600, textTransform: "uppercase", color: "white" }}>{component.name}</h1>
          </Link>
        ))}
      </div>
    </header>
  );
};


export default MaintNav;
