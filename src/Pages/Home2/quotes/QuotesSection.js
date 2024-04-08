import quotesData from './quotesData.json'; 
import './Quotes.css'; 

const QuoteCard = ({ quote, image, name, title, years }) => {
  return (
    <div className="quote-card">
      <img src={image} alt={name} className="quote-image"/>
      <div className="quote-author">{name} - {title}</div>
      <div className="quote-text">{quote}</div>
      <div className="quote-years">{years}</div>
    </div>
  );
};

const QuotesSection = () => {
  return (
    <div className='quotessection2'>
      <div className="quotes-section">
        {quotesData.map((data) => (
          <QuoteCard key={data.id} {...data} />
        ))}
      </div>
    </div>
  );
};

export default QuotesSection;
