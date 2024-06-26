import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer
      className="footer"
    >
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <h4
          style={{
            fontSize: "20px",
            fontFamily: "Poppins",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          &copy; {new Date().getFullYear()} - Sundance Lift Maintenance
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
