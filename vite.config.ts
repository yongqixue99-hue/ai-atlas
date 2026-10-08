import { defineConfig } from "vite";

// The stylesheets are written for the light theme. Every hex colour is paired
// with a dark counterpart at build time by mirroring its OKLab lightness, so the
// two themes cannot drift apart. Write `light-dark()` by hand to override one.
const linear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const gamma = (v: number) => (v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055);
function darkOf(hex: string) {
  let h = hex.slice(1);
  if (h.length <= 4) h = [...h].map((c) => c + c).join("");
  const [r, g, b] = [0, 2, 4].map((i) => linear(parseInt(h.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = Math.min(0.95, Math.max(0.2, 1.18 - (0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s)));
  const A = (1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s) * 0.9;
  const B = (0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s) * 0.9;
  const l2 = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m2 = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s2 = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const rgb = [
    4.0767416621 * l2 - 3.3077115913 * m2 + 0.2309699292 * s2,
    -1.2684380046 * l2 + 2.6097574011 * m2 - 0.3413193965 * s2,
    -0.0041960863 * l2 - 0.7034186147 * m2 + 1.707614701 * s2,
  ].map((v) => Math.round(Math.min(1, Math.max(0, gamma(v))) * 255).toString(16).padStart(2, "0"));
  return `#${rgb.join("")}${h.slice(6)}`;
}

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: "atlas-dark-theme",
          Declaration(decl: { value: string }) {
            if (!decl.value.includes("#") || /light-dark\(|url\(/.test(decl.value)) return;
            decl.value = decl.value.replace(/#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b/gi, (hex) => `light-dark(${hex}, ${darkOf(hex)})`);
          },
        },
      ],
    },
  },
});
