import axios from "axios";

const API =
  "https://jobgine-backend.onrender.com/api/pdf";

export const downloadResumePdf =
  async (
    content,
    token
  ) => {

    const response =
      await axios.post(
        `${API}/resume`,
        {
          content,
          fileName:
            "Generated-Resume"
        },
        {
          responseType:
            "blob",

          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    const url =
      window.URL.createObjectURL(
        new Blob([
          response.data
        ])
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "Generated-Resume.pdf";

    link.click();
  };