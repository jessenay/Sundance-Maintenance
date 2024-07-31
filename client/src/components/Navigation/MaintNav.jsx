import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FETCH_COMPONENTS_BY_LIFT_ID } from "../../utils/queries";
import "./MaintNav.css";

const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-');

const MaintNav = ({ liftId }) => {
  const { loading, data, error } = useQuery(FETCH_COMPONENTS_BY_LIFT_ID, { variables: { liftId } });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  if (!data || !data.lift || !data.lift.components) return <div>No components found for this lift.</div>;

  const components = data.lift.components;

  return (
    <header className="maintNav">
      <div className="link-container">
        {components.map((component) => {
          const linkPath = component.name === 'Towers'
            ? `/lift/${liftId}/towers` // Path to list all towers
            : `/lift/${liftId}/${slugify(component.name)}/${component._id}`; // Path to specific component details

          return (
            <Link className="maintNav-buttons" to={linkPath} key={component._id}>
              <h1>{component.name}</h1>
            </Link>
          );
        })}
      </div>
    </header>
  );
};

export default MaintNav;
