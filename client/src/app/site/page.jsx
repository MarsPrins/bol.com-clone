import React from "react";

function page() {
  // welcome page

  return (
    <div className={s.container}>
      <div className={s.content}>
        <span className={s.welcom}>Welcome</span>
        <p className={s.disclaimer}>
          this website is purely for my portfolio, you can't buy things here
          with real money.
        </p>
      </div>
    </div>
  );
}

export default page;
