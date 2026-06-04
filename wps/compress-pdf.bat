@echo off
REM ============================================================
REM   compress-pdf.bat — nén PDF lớn để vừa GitHub Pages (<100 MB)
REM   Yêu cầu: Ghostscript đã cài (https://www.ghostscript.com/releases)
REM
REM   Cách dùng:  kéo-thả 1 file PDF vào .bat này,
REM               file kết quả nằm cùng thư mục, đuôi "-min.pdf"
REM ============================================================

setlocal
set "GSBIN="
for %%G in (gswin64c.exe gswin32c.exe gs.exe) do (
  where %%G >nul 2>&1 && set "GSBIN=%%G" && goto :found
)
:found
if "%GSBIN%"=="" (
  echo [LOI] Khong thay Ghostscript. Tai ve: https://ghostscript.com/releases
  pause & exit /b 1
)

if "%~1"=="" (
  echo Keo-tha 1 file PDF vao .bat nay de nen, hoac chay:
  echo   compress-pdf.bat "duong-dan\file.pdf"
  pause & exit /b 1
)

set "IN=%~1"
set "OUT=%~dpn1-min.pdf"

echo Nen: %IN%  --^>  %OUT%
%GSBIN% -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 ^
   -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -dDetectDuplicateImages ^
   -sOutputFile="%OUT%" "%IN%"

if exist "%OUT%" (
  for %%F in ("%OUT%") do echo Xong: %%~zF byte
) else (
  echo [LOI] Nen that bai.
)
pause
endlocal
