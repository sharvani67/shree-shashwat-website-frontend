import React, { useEffect, useState } from 'react';
import ReusableTable from './ReusableTable/ReusableTable';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebase'; // Adjust your Firebase path

const FeedbackTable = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'feedback'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbackData(data);
      } catch (error) {
        console.error("Error fetching feedback data: ", error);
      }
    };

    fetchFeedback();
  }, []);

  const columns = [
    { title: 'Full Name', key: 'fullName' },
    { title: 'Email Address', key: 'emailAddress' },
    { title: 'Phone Number', key: 'phoneNumber' },
    { title: 'Age Group', key: 'ageGroup' },
    { title: 'City', key: 'city' },
    { title: 'Gender', key: 'gender' },
    { title: 'Overall Experience', key: 'overallExperience' },
    { title: 'Additional Comments', key: 'additionalComments' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <ReusableTable
        title="Feedback Responses"
        data={feedbackData}
        columns={columns}
        initialEntriesPerPage={5}
        searchPlaceholder="Search feedback..."
        showSearch={true}
        showEntriesSelector={true}
        showPagination={true}
      />
    </div>
  );
};

export default FeedbackTable;
