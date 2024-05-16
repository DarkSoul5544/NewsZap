import React from 'react';

const UserContext = React.createContext({
  user: null,
  isPremium: false,
});

export default UserContext;