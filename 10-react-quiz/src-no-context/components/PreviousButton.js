function PreviousButton({ dispatch, index, answer }) {
  console.log(answer);
  if (index > 0)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "prevQuestion" })}
        >
          Previous
        </button>
      </div>
    );
}

export default PreviousButton;
