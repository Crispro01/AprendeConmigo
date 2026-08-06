export const TEXT_SIZE_STORAGE_KEY = "tamano-texto-v1";

export function textSizeInitScript() {
  return `(function(){try{var s=localStorage.getItem("${TEXT_SIZE_STORAGE_KEY}");if(s==="normal"||s==="large"||s==="xlarge"){document.documentElement.setAttribute("data-text-size",s);}}catch(e){}})();`;
}
