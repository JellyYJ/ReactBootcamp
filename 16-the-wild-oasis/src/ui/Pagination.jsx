import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { PAGESIZE } from "../utils/Constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const curPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const numOfPages = Math.ceil(count / PAGESIZE);
  console.log(numOfPages);

  function previousPage() {
    const prev = curPage === 1 ? curPage : curPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  function nextPage() {
    const next = curPage === numOfPages ? curPage : curPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  // Only contains one page, no need for pagination
  if (numOfPages <= 1) {
    return null;
  }

  return (
    <StyledPagination>
      <P>
        Showing <span>{(curPage - 1) * PAGESIZE + 1} </span>to
        <span> {curPage === numOfPages ? count : curPage + PAGESIZE} </span> of
        <span> {count} </span> results
      </P>

      <Buttons>
        <PaginationButton onClick={previousPage} disabled={curPage === 1}>
          <HiChevronLeft />
          PREVIOUS
        </PaginationButton>

        <PaginationButton onClick={nextPage} disabled={curPage === numOfPages}>
          NEXT
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
