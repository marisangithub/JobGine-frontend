const ModernResume = ({ content }) => {

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
              fontSize: "36px",
              fontWeight: "800",
              color: "#0d6efd"
            }}
          >
            {trimmed}
          </h1>
        );
      }

      // Headings
      if (
        headings.includes(trimmed)
      ) {
        return (
          <h4
            key={index}
            className="mt-4 mb-2"
            style={{
              fontWeight: "700",
              color: "#0d6efd",
              borderLeft:
                "5px solid #0d6efd",
              paddingLeft: "10px"
            }}
          >
            {trimmed}
          </h4>
        );
      }

      // Empty line
      if (!trimmed) {
        return <br key={index} />;
      }

      // Normal text
      return (
        <p
          key={index}
          style={{
            marginBottom: "8px",
            lineHeight: "1.8",
            color: "#333"
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
        minHeight: "900px"
      }}
    >
      {formatContent()}
    </div>
  );
};

export default ModernResume;