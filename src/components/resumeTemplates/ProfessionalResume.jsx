const ProfessionalResume = ({ content }) => {

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

      // Name
      if (
        index === 0 &&
        trimmed.length > 0
      ) {
        return (
          <h1
            key={index}
            className="text-center mb-3"
            style={{
              fontSize: "34px",
              fontWeight: "700",
              color: "#343a40",
              letterSpacing: "2px"
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
              color: "#343a40",
              borderLeft:
                "5px solid #343a40",
              paddingLeft: "10px"
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

      // Normal Text
      return (
        <p
          key={index}
          style={{
            marginBottom: "8px",
            lineHeight: "1.8",
            color: "#444",
            fontFamily: "Georgia"
          }}
        >
          {line}
        </p>
      );
    });
  };

  return (
    <div
      className="bg-light p-5 border shadow-sm rounded"
      style={{
        minHeight: "900px"
      }}
    >
      {formatContent()}
    </div>
  );
};

export default ProfessionalResume;