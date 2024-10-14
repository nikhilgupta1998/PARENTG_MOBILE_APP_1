import React from "react";

function index({ date }: any) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0-indexed month
  const day = ("0" + date.getDate()).slice(-2);

  // Format the date in "yyyy-mm-dd" format
  const formattedDate = `${year}-${month}-${day}`;
  return <div>{formattedDate}</div>;
}

export default index;
