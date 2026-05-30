import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FRONTEND_DIR = ROOT / "public"
SSR_BRIDGE = FRONTEND_DIR / "ssr-bridge.mjs"


def render_page() -> str:
    if not SSR_BRIDGE.exists():
        return _missing_build_html()

    result = subprocess.run(
        ["node", str(SSR_BRIDGE)],
        cwd=str(FRONTEND_DIR),
        capture_output=True,
        text=True,
        check=False,
    )

    if result.returncode != 0:
        return _error_html()

    return result.stdout


def _missing_build_html() -> str:
    return """<!DOCTYPE html>
<html lang="en">
  <head><meta charset="UTF-8" /><title>Build required</title></head>
  <body>
    <h1>Frontend not built yet</h1>
    <p>Run <code>npm run build</code> in the project root, or <code>npm run dev</code> to build and watch.</p>
  </body>
</html>"""


def _error_html() -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
  <head><meta charset="UTF-8" /><title>SSR error</title></head>
  <body>
    <h1>SSR render failed</h1>
    <pre>SSR render failed</pre>
  </body>
</html>"""
