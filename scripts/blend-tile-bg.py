#!/usr/bin/env python3
"""
blend-tile-bg.py — Recolour a single-paving-tile studio photo's background to
the KHADANE variety-page warm-white (#F0EDE6) so slot 5 of the visual-reference
set blends seamlessly into the page, while leaving the tile and its soft drop
shadow intact.

The studio background (and the shadow, which is a darker version of it) shares a
single chromaticity; the tile is a different colour. We detect the background
colour from the image corners, build a soft mask of "pixels that share the
background's chromaticity", and remap that region from the detected background
colour to the target via a per-channel scale (which preserves the shadow
gradient instead of flat-filling it).

Usage:
  python3 scripts/blend-tile-bg.py IN.png OUT.jpg [--mode auto|warm|neutral|chroma]
                                   [--lo L] [--hi H] [--quality Q]

Modes:
  auto    (default) chroma mode — works for coloured tiles (brown/red/green/
          yellow/black) on a neutral studio sweep.
  warm    background = warm (R-B high); tile is neutral/cool grey. Use for grey
          tiles on a beige sweep (e.g. Khadipur, Kandla Grey).
  neutral background = bright & near-neutral (low saturation); tile is
          saturated. Use for coloured tiles on a near-white sweep.

Always eyeball the OUT file afterwards (edge halos, shadow, stray tile pixels).
"""
import argparse
import numpy as np
from PIL import Image

TARGET = np.array([0xF0, 0xED, 0xE6], np.float32)  # #F0EDE6 — page warm-white


def smoothstep(x, lo, hi):
    t = np.clip((x - lo) / (hi - lo), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def detect_bg(a):
    """Median colour of the four corner blocks (the studio sweep)."""
    h, w, _ = a.shape
    k = max(24, int(min(h, w) * 0.05))
    corners = np.concatenate([
        a[:k, :k].reshape(-1, 3), a[:k, -k:].reshape(-1, 3),
        a[-k:, :k].reshape(-1, 3), a[-k:, -k:].reshape(-1, 3),
    ])
    return np.median(corners, axis=0)


def bg_alpha(a, B0, mode, lo, hi):
    """alpha in [0,1]; 1 = treat as background/shadow (recolour), 0 = keep tile."""
    warmth = a[:, :, 0] - a[:, :, 2]
    sat = a.max(2) - a.min(2)
    if mode == "warm":
        return smoothstep(warmth, lo if lo is not None else 4, hi if hi is not None else 12)
    if mode == "neutral":
        return 1 - smoothstep(sat, lo if lo is not None else 12, hi if hi is not None else 30)
    # chroma (auto): distance between a pixel's chromaticity and the bg's
    lum = np.clip(a.mean(2), 1e-3, None)
    chroma = a / lum[:, :, None]
    b0dir = B0 / max(B0.mean(), 1e-3)
    d = np.sqrt(((chroma - b0dir) ** 2).sum(2))
    return 1 - smoothstep(d, lo if lo is not None else 0.045, hi if hi is not None else 0.12)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("src")
    p.add_argument("out")
    p.add_argument("--mode", default="auto", choices=["auto", "chroma", "warm", "neutral"])
    p.add_argument("--lo", type=float, default=None)
    p.add_argument("--hi", type=float, default=None)
    p.add_argument("--quality", type=int, default=92)
    args = p.parse_args()

    a = np.asarray(Image.open(args.src).convert("RGB")).astype(np.float32)
    B0 = detect_bg(a)
    mode = "chroma" if args.mode == "auto" else args.mode
    alpha = bg_alpha(a, B0, mode, args.lo, args.hi)[:, :, None]

    scale = TARGET / np.clip(B0, 1e-3, None)
    shifted = np.clip(a * scale, 0, 255)
    out = np.clip(a * (1 - alpha) + shifted * alpha, 0, 255).astype(np.uint8)

    Image.fromarray(out, "RGB").save(args.out, "JPEG", quality=args.quality)
    o = out.astype(np.float32)
    h, w, _ = out.shape
    print(f"mode={mode} bg={B0.round(1).tolist()} -> {TARGET.tolist()}")
    print(f"  new corner  {o[:40, :40].reshape(-1, 3).mean(0).round(1).tolist()}")
    print(f"  tile centre {o[h//2-30:h//2+30, w//2-30:w//2+30].reshape(-1, 3).mean(0).round(1).tolist()}")
    print(f"  saved {args.out}")


if __name__ == "__main__":
    main()
