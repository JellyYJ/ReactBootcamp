import styled, { css } from "styled-components";

// Tagged temporal literal
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.5rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
`;

export default Heading;