import React from 'react';

interface Props {
  children: React.ReactNode
}

const Container: React.FC<Props> = (props) => {
  return (
    <div style={{ 
      margin: "auto",
      maxWidth: "70em",
      marginBottom: "100px"
    }}>
      {props.children}
    </div>
  );
};

export default Container;