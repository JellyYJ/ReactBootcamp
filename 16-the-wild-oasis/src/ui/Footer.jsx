import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: var(--color-gry-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-gry-100);

  grid-column: 1/-1;
`;

function Footer() {
  return <StyledFooter>FOOTER</StyledFooter>;
}

export default Footer;
