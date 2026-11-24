@echo off
title One Stop Gadgets Server
cd /d "%~dp0"
echo Starting One Stop Gadgets Server on http://localhost:8000...
node server.js
pause
