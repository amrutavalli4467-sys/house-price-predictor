@echo off
title ProphetAI - House Price Predictor
echo =======================================================
echo  Starting ProphetAI House Price Predictor...
echo =======================================================

cd /d "%~dp0"

:: Check if Python is available with uvicorn
python -c "import uvicorn, fastapi" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Launching Python FastAPI Model Server...
    start http://localhost:8000
    python -m uvicorn app:app --port 8000 --reload
    goto end
)

:: Check if Node is available
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Launching Node.js Predictor Server...
    start http://localhost:8000
    node server.js
    goto end
)

where agy-node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Launching Antigravity Node Server...
    start http://localhost:8000
    agy-node server.js
    goto end
)

:end
pause
