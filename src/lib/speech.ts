const PREFERRED_SPANISH_LANGS = [
  "es-419",
  "es-ec",
  "es-mx",
  "es-us",
  "es-co",
  "es-es",
];

export function pickBestSpanishVoice(
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | undefined {
  const spanishVoices = voices.filter((v) =>
    v.lang.toLowerCase().startsWith("es"),
  );
  if (spanishVoices.length === 0) return undefined;

  for (const lang of PREFERRED_SPANISH_LANGS) {
    const match = spanishVoices.find((v) => v.lang.toLowerCase() === lang);
    if (match) return match;
  }

  return spanishVoices[0];
}
