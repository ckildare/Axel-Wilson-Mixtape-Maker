# Retro Playlist Generator

## Generating the executable

To generate the `cli.exe`, run

```
pyinstaller src/cli.py --add-data "src/.env;."
```

This only needs to be done when you want a new packaged app to distribute.

The executable can then be found in `dist/cli/cli.exe`

## Running during development

Before running the app, you must initialize a "virtual environment" for Python and install dependencies.

```
python3 -m venv .venv
.venv/Scripts/Activate.ps1
pip install -r requirements.txt
```

The script may differ on systems other than Windows.

After that, you may run the program with `python src/main.py`
