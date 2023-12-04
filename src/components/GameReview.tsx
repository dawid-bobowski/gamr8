import { FC, useState, KeyboardEvent, Fragment } from 'react';

const GameReview: FC = () => {
  const [reviewText, setReviewText] = useState<string>('');

  const handleAddReview = () => {
    console.log(reviewText);
  }

  const ParseReviewText = (): JSX.Element[] => {
    return reviewText.split('\n').map((line, lineIndex) => (
      line ? (
        <p key={lineIndex} style={{ textAlign: 'justify' }}>
          {line.split('\t').map((tabSegment, tabIndex) => (
            <Fragment key={tabIndex}>
              {tabIndex > 0 ? <span style={{ width: '40px', display: 'inline-block' }}></span> : null}
              <span>{tabSegment}</span>
            </Fragment>
          ))}
        </p>
      ) : <br key={lineIndex} />
    ));
  };

const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
  if (event.key === 'Tab') {
      event.preventDefault();
      const target = event.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // Set textarea value to: text before caret + tab + text after caret
      setReviewText(reviewText.substring(0, start) + "\t" + reviewText.substring(end));

      // Move the caret to the right position (after the inserted tab)
      setTimeout(() => {
          target.selectionStart = target.selectionEnd = start + 1;
      }, 0);
  }
}

  return (
    <>
      <div className='w-100'>
        <h2 className='text-center mb-4'>Write something cool here:</h2>
        <div className='d-flex flex-column align-items-center'>
          <div className='mb-3 w-100'>
            <label className='form-label w-100'>
              {/* Some text if needed */}
              <textarea
                className='form-control w-100'
                id='review-text'
                name='review-text'
                rows={10}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                onKeyDown={handleKeyDown}
                />
            </label>
          </div>
        </div>
      </div>
      {reviewText !== '' && <div className='d-flex flex-column align-items-center w-100'>
        <h2 className='text-center mb-4'>Preview your review ✨</h2>
        <div className='d-flex flex-column align-items-center'>
          {ParseReviewText()}
        </div>
        <button className='btn btn-primary mt-4 w-50' onClick={handleAddReview} disabled={reviewText === ''}>
          Publish
        </button>
      </div>}
    </>
  )
}

export default GameReview;