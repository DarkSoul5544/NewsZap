// import React, { useContext , useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import News from './News';
// import UserContext from './UserContext';

// function NewsWrapper({ showFooter, excludePages }) {
//   const location = useLocation();
//   const user = useContext(UserContext);

//   useEffect(() => {
//     if (!excludePages.includes(location.pathname)) {
//       showFooter(true);
//     } else {
//       showFooter(false);
//     }
//   }, [location, showFooter, excludePages]);

//   if (location.pathname === '/premium' &&!user.isPremium) {
//     return <div>Please become a premium member to see the news.</div>;
//   }

//   return <News />;
// }

// export default NewsWrapper;