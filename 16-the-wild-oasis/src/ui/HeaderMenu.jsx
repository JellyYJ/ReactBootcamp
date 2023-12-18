import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu = styled.div`
  display: flex;
  gap: 0.4rem;
`;
const StyledListItem = styled.li`
  list-style: none;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <StyledListItem>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </StyledListItem>

      <StyledListItem>
        <DarkModeToggle />
      </StyledListItem>

      <StyledListItem>
        <Logout />
      </StyledListItem>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
