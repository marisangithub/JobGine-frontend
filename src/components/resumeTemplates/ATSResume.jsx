const ATSResume = ({ content }) => {

  const formatContent = () => {
    if (!content) return null;

    const lines = content.split("\n");

    return lines.map((line, index) => {

      const trimmed = line.trim();

      const headings = [
        "CONTACT INFORMATION",
        "PROFESSIONAL SUMMARY",
        "TECHNICAL SKILLS",
        "PROJECTS",
        "WORK EXPERIENCE",
        "EDUCATION",
        "CERTIFICATIONS"
      ];

      // Name (First Line)
      if (
        index === 0 &&
        trimmed.length > 0
      ) {
        return (
      <h1
  key={index}
  className="text-center mb-4"
  style={{
    color: "#111827",
    fontSize: "32px",
    fontWeight: "700"
  }}
>
            {trimmed}
          </h1>
        );
      }

      // Section Headings
      if (
        headings.includes(trimmed)
      ) {
        return (
<h4
  key={index}
  className="mt-4 mb-2"
  style={{
    fontWeight: "700",
    borderBottom: "2px solid #000",
    paddingBottom: "5px"
  }}
>
            {trimmed}
          </h4>
        );
      }

      // Empty Line
      if (!trimmed) {
        return <br key={index} />;
      }

      // Normal Content
      return (
  <p
  key={index}
  style={{
    color: "#111827",
    marginBottom: "6px",
    lineHeight: "1.7"
  }}
>
          {line}
        </p>
      );
    });
  };

  return (
<div
  className="bg-white p-5 shadow rounded"
  style={{
    color: "#111827",
    backgroundColor: "#ffffff"
  }}
>
    {formatContent()}
  </div>
);
};

export default ATSResume;