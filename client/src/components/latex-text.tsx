import katex from "katex";
import "katex/dist/katex.min.css";

type LatexTextProps = {
  text: string;
  className?: string;
  inline?: boolean;
};

export function LatexText({ text, className = "", inline = true }: LatexTextProps) {
  const renderLatex = (content: string) => {
    const parts: { type: "text" | "latex"; content: string }[] = [];
    let currentIndex = 0;
    
    const regex = /\$([^\$]+)\$/g;
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      if (match.index > currentIndex) {
        parts.push({
          type: "text",
          content: content.slice(currentIndex, match.index),
        });
      }
      
      parts.push({
        type: "latex",
        content: match[1],
      });
      
      currentIndex = match.index + match[0].length;
    }
    
    if (currentIndex < content.length) {
      parts.push({
        type: "text",
        content: content.slice(currentIndex),
      });
    }
    
    return parts;
  };

  const parts = renderLatex(text);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === "text") {
          return <span key={index}>{part.content}</span>;
        } else {
          try {
            const html = katex.renderToString(part.content, {
              throwOnError: false,
              displayMode: !inline,
              macros: {
                "\\norm": "\\lVert#1\\rVert",
                "\\abs": "\\lvert#1\\rvert",
                "\\set": "\\{#1\\}",
                "\\RR": "\\mathbb{R}",
                "\\NN": "\\mathbb{N}",
                "\\ZZ": "\\mathbb{Z}",
                "\\CC": "\\mathbb{C}",
                "\\QQ": "\\mathbb{Q}",
              },
            });
            return (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: html }}
                className="inline-block"
              />
            );
          } catch (error) {
            return <span key={index}>${part.content}$</span>;
          }
        }
      })}
    </span>
  );
}
