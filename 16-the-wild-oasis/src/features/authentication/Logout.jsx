import styled from "styled-components";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

import { useLogout } from "./useLogout";

const LogoutDiv = styled.div`
  display: flex;
  align-items: center;
`;
function Logout() {
  const { isLoading, logout } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? (
        <LogoutDiv>
          <HiArrowRightOnRectangle /> <span>Logout</span>
        </LogoutDiv>
      ) : (
        <SpinnerMini />
      )}
    </ButtonIcon>
  );
}

export default Logout;
