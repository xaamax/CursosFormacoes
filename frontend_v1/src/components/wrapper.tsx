import React, { CSSProperties } from "react";

function Wrapper({ children }: { children: React.ReactNode }) {  
    return (
      <div className="wrapper" style={styles.wrapper}>
        <div className="content-wrapper" style={styles.contentWrapper}>
            {children}
        </div>
      </div>
    );
}

const styles: { wrapper: CSSProperties, contentWrapper: CSSProperties } = {
    wrapper: {
        position: "relative",
        minHeight: "100%",
        width: "100%",
        marginRight: "auto",
        marginLeft: "auto"
    },
    contentWrapper: {
        height: "100%"
    } 

};   

export default Wrapper;
