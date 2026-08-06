"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pickBestSpanishVoice } from "@/lib/speech";

export type SpeechRate = "lento" | "normal";

const RATE_VALUES: Record<SpeechRate, number> = {
  lento: 0.75,
  normal: 1,
};

export function useTextToSpeech() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<SpeechRate>("normal");
  const voiceRef = useRef<SpeechSynthesisVoice | undefined>(undefined);
  const rateRef = useRef<SpeechRate>("normal");
  const stoppedRef = useRef(false);

  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    function loadVoices() {
      voiceRef.current = pickBestSpanishVoice(window.speechSynthesis.getVoices());
    }
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      stoppedRef.current = true;
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback(
    (textos: string[]) => {
      if (!isSupported) return;
      stoppedRef.current = false;
      window.speechSynthesis.cancel();
      const queue = textos.map((t) => t.trim()).filter(Boolean);
      let index = 0;

      function speakNext() {
        // Si mientras tanto se pidió detener la lectura, no seguimos con el
        // siguiente bloque de texto (algunos navegadores igual disparan
        // "onend" del bloque anterior después de cancelar).
        if (stoppedRef.current) return;
        if (index >= queue.length) {
          setIsSpeaking(false);
          setIsPaused(false);
          return;
        }
        const utterance = new SpeechSynthesisUtterance(queue[index]);
        utterance.lang = voiceRef.current?.lang ?? "es-419";
        if (voiceRef.current) utterance.voice = voiceRef.current;
        utterance.rate = RATE_VALUES[rateRef.current];
        utterance.onend = () => {
          if (stoppedRef.current) return;
          index += 1;
          speakNext();
        };
        utterance.onerror = () => {
          if (stoppedRef.current) return;
          setIsSpeaking(false);
          setIsPaused(false);
        };
        window.speechSynthesis.speak(utterance);
      }

      setIsSpeaking(true);
      setIsPaused(false);
      speakNext();
    },
    [isSupported],
  );

  const pause = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, [isSupported]);

  const resume = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    stoppedRef.current = true;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, [isSupported]);

  return {
    isSupported,
    isSpeaking,
    isPaused,
    rate,
    setRate,
    speak,
    pause,
    resume,
    stop,
  };
}
