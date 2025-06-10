import { useNavigate } from "react-router-dom";

export default function Error(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <>
      <button
        type="button"
        className="bg-[#40916C]"
        onClick={() => {
          navigate("/");
        }}
      >
        Go home
      </button>
      <button
        type="button"
        onClick={() => {
          window.location.reload();
        }}
      >
        Refresh
      </button>
    </>
  );
}
