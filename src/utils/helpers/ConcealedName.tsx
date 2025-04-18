export function ConcealedName({ name }: { name: string }) {
  return (
    <span className="font-sans">
      {name.split(" ").map((word, wordIndex) => {
        // Handle suffixes like Ltd., Inc., etc.
        const suffixMatch = word.match(/^(.+?)(\.|,|$)/);
        const baseWord = suffixMatch ? suffixMatch[1] : word;
        const suffix = suffixMatch ? suffixMatch[2] : "";

        if (baseWord.length === 0) return suffix;

        const firstChar = baseWord[0];
        const concealedLength = Math.max(0, baseWord.length - 1);

        return (
          <span key={wordIndex}>
            <span className="font-medium">{firstChar}</span>
            <span className="opacity-48 text-xs ">
              {Array(concealedLength).fill("x").join("")}
            </span>
            {suffix}
            {wordIndex < name.split(" ").length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}
