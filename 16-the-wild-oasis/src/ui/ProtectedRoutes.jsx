import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();

  // 1. Load the autenticated user.
  const { isLoading, isAuthenticated } = useUser();

  // 3. If there is NO authenticated user, redirect to /login
  // NOTICE! the step2 cannot be above useEffect hook since it is conditioning
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 2. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a user, render the App
  if (isAuthenticated) return children;
}

export default ProtectedRoutes;
