import React from "react";
import Helmet from "react-helmet";
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title> {title}</title>
      <meat name="description" content={description} />
      <meat name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To React-Shop",
  description: "we sell best product in cheap price",
  keywords: "electronic , buy electronic, cheap electronic",
};

export default Meta;
