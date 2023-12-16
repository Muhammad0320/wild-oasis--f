import { styled } from "styled-components";
import { useUSer } from "../features/authentication/useUSer";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SpinnerFullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUSer();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) return navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    <SpinnerFullPage>
      <Spinner />
    </SpinnerFullPage>;
  }

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
