import { useState } from 'react';
import Statistics from './Statistics';
import FeedBackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section';
import Notification from './Notification';
import { Box } from './Box';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedback = e => {
    setFeedback(prevState => {
      return { ...prevState, [e.target.name]: prevState[e.target.name] + 1 };
    });
  };

  const countTotalFeedback = () => {
    const total = feedback.good + feedback.neutral + feedback.bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const positivePercentage =
      Math.round(
        (feedback.good / (feedback.good + feedback.neutral + feedback.bad)) *
          100
      ) + '%';

    return positivePercentage;
  };

  const options = Object.keys(feedback);
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Box p={4} height="100vh">
      <Section title="Please leave feedback">
        <FeedBackOptions options={options} onLeaveFeedback={handleFeedback} />
      </Section>
      <Section title="Statistics">
        {total ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Box>
  );
};
