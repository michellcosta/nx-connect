@echo off
cd /d "%~dp0"
echo ========================================================
echo       Gerando pacote .ipk do Saimo TV para LG webOS
echo ========================================================
echo [1/2] Compilando e transpilando para Chromium 38 (webOS 3.x+)...
call npm run build
if errorlevel 1 (
  echo.
  echo A compilacao falhou. Veja a mensagem acima.
  pause
  exit /b 1
)
echo.
echo [2/2] Empacotando com ares-package...
npx -p @webosose/ares-cli ares-package ./saimo-lg-webos -o . ^
  -e worker -e dist -e .git -e "*.py" -e __pycache__ -e "*.md" -e empacotar.sh ^
  -e src -e .gitignore
if errorlevel 1 (
  echo.
  echo A geracao do IPK falhou. Veja a mensagem acima.
  pause
  exit /b 1
)
echo.
echo Pacote gerado com sucesso na pasta raiz!
dir /b com.saimo.tv_*.ipk
pause
